/**
 * Controllers "artisans".
 *
 * Contient la logique métier des endpoints liés aux artisans.
 * L'accès aux données se fait via Sequelize (models + associations).
 *
 * Note : rating est stocké en DECIMAL en base.
 * Sequelize le renvoie souvent sous forme de string, d'où l'usage de Number(...).
 * 
 * Remarque :
 * on conserve le format JSON attendu par le frontend,
 * même si les données sont récupérées via ORM.
 */

import { Artisan, Specialty, Category } from "../models/index.js";
import { Op } from "sequelize";


/**
 * Retourne jusqu'à 3 artisans "mis en avant" pour la page d'accueil.
 * Tri : meilleure note d'abord, puis nom.
 * 
 * @route GET /api/artisans/featured
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
export async function getFeaturedArtisans(req, res) {
  const rows = await Artisan.findAll({
    where: { is_featured: true },
    limit: 3,
    order: [["rating", "DESC"], ["name", "ASC"]],
    include: [
      {
        model: Specialty,
        as: "specialty",
        attributes: ["name"],
        include: [{ model: Category, as: "category", attributes: ["name"] }],
      },
    ],
  });

  res.json(
    rows.map((a) => ({
      id: a.id,
      name: a.name,
      rating: Number(a.rating),
      city: a.city,
      image_url: a.image_url,
      is_featured: a.is_featured ? 1 : 0,
      specialty: a.specialty?.name,
      category: a.specialty?.category?.name,
    }))
  );
}

/**
 * Retourne la fiche détaillée d’un artisan (par id).
 *
 * @route GET /api/artisans/:id
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 *
 * @throws {404} Artisan introuvable
 */
export async function getArtisanById(req, res) {
  const artisanId = req.params.id; // déjà validé par validateIdParam

  const a = await Artisan.findByPk(artisanId, {
    include: [
      {
        model: Specialty,
        as: "specialty",
        attributes: ["name"],
        include: [{ model: Category, as: "category", attributes: ["name"] }],
      },
    ],
  });

  if (!a) return res.status(404).json({ error: "Artisan not found" });

  res.json({
    id: a.id,
    name: a.name,
    rating: Number(a.rating),
    city: a.city,
    about: a.about,
    email: a.email,
    website: a.website,
    image_url: a.image_url,
    is_featured: a.is_featured ? 1 : 0,
    specialty: a.specialty?.name,
    category: a.specialty?.category?.name,
  });
}

/**
 * Recherche des artisans par mot-clé avec pagination.
 *
 * La recherche s'effectue sur plusieurs champs :
 * - nom de l'artisan
 * - ville
 * - spécialité
 *
 * Paramètres de requête (query) :
 * - search : mot-clé (optionnel)
 * - page : numéro de page (défaut : 1)
 * - limit : taille de page (défaut : 25, maximum : 100)
 *
 * Exemples :
 * GET /api/artisans?search=boul
 * GET /api/artisans?search=boul&page=2&limit=10
 *
 * @route GET /api/artisans
 * @param {import("express").Request} req
 * @param {string} [req.query.search]
 * @param {number} [req.query.page]
 * @param {number} [req.query.limit]
 * @param {import("express").Response} res
 * @returns {Promise<void>} Réponse JSON : { page, limit, results, data }
 */
export async function searchArtisans(req, res) {
  const q = (req.query.search || "").toString().trim();

  if (!q) {
    return res.json({ page: 1, limit: 25, results: 0, data: [] });
  }

  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
  const offset = (page - 1) * limit;

  const like = `%${q}%`;

  const rows = await Artisan.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: like } },
        { city: { [Op.like]: like } },
        { "$specialty.name$": { [Op.like]: like } },
      ],
    },
    include: [
      {
        model: Specialty,
        as: "specialty",
        attributes: ["name", "category_id"],
        include: [{ model: Category, as: "category", attributes: ["name"] }],
      },
    ],
    order: [["rating", "DESC"], ["name", "ASC"]],
    limit,
    offset,
    subQuery: false,
  });

  res.json({
    page,
    limit,
    results: rows.length,
    data: rows.map((a) => ({
      id: a.id,
      name: a.name,
      rating: Number(a.rating),
      city: a.city,
      image_url: a.image_url,
      is_featured: a.is_featured ? 1 : 0,
      specialty: a.specialty?.name,
      category: a.specialty?.category?.name,
    })),
  });
}

/**
 * Envoie un message de contact à un artisan via l'API Mailtrap.
 *
 * @route POST /api/artisans/:id/contact
 */
export async function sendContactMessage(req, res) {
  const artisanId = req.params.id;
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Tous les champs sont requis",
    });
  }

  const artisan = await Artisan.findByPk(artisanId);

  if (!artisan) {
    return res.status(404).json({
      error: "Artisan introuvable",
    });
  }

  /**
   * Construction du contenu du message.
   *
   * Le formulaire est envoyé à l'adresse définie dans l'environnement.
   * L'email de l'utilisateur est placé dans "reply_to" pour permettre
   * une réponse directe depuis le client mail.
   */
  const payload = {
    from: {
      email: process.env.MAIL_FROM_EMAIL,
      name: process.env.MAIL_FROM_NAME,
    },
    to: [
      {
        email: process.env.MAIL_TO,
      },
    ],
    subject: `Message pour ${artisan.name}`,
    text: `
Nom : ${name}
Email : ${email}

Artisan concerné : ${artisan.name}

Message :
${message}
    `,
    reply_to: {
      email,
      name,
    },
    category: "contact-form",
  };

  /**
   * Envoi via l'API HTTP Mailtrap.
   *
   * Cette approche évite les limitations SMTP de l'hébergement gratuit
   * et reste adaptée à un environnement de démonstration ou de test.
   */
  const response = await fetch("https://send.api.mailtrap.io/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("❌ Mailtrap API error:", errorText);

    return res.status(503).json({
      error: "Le service de contact est momentanément indisponible. Veuillez réessayer plus tard.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Message envoyé avec succès",
  });
}