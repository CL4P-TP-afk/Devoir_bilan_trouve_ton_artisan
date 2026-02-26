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
 * Recherche des artisans par mot-clé.
 *
 * La recherche s'effectue sur plusieurs champs :
 * - nom de l'artisan
 * - ville
 * - spécialité
 *
 * Le mot-clé est transmis via le paramètre de requête `search`.
 * Exemple :
 * GET /api/artisans?search=boul
 *
 * @route GET /api/artisans
 * @param {import("express").Request} req
 * @param {string} [req.query.search] Mot-clé de recherche (optionnel)
 * @param {import("express").Response} res
 * @returns {Promise<void>} Liste d'artisans correspondant à la recherche
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