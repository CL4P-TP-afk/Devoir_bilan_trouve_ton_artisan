import { pool } from "../db/pool.js";

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
    const [rows] = await pool.query(
      `
      SELECT
        a.id,
        a.name,
        a.rating,
        a.city,
        a.about,
        a.email,
        a.website,
        a.image_url,
        a.is_featured,
        s.name AS specialty,
        c.name AS category
      FROM artisans a
      JOIN specialties s ON s.id = a.specialty_id
      JOIN categories c ON c.id = s.category_id
      WHERE a.is_featured = 1
      ORDER BY a.rating DESC, a.name ASC
      LIMIT 3;
      `
    );

    res.json(rows);
  
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
  const artisanId = req.params.id;

    const [rows] = await pool.query(
      `
      SELECT
        a.id,
        a.name,
        a.rating,
        a.city,
        a.about,
        a.email,
        a.website,
        a.image_url,
        a.is_featured,
        s.name AS specialty,
        c.name AS category
      FROM artisans a
      JOIN specialties s ON s.id = a.specialty_id
      JOIN categories c ON c.id = s.category_id
      WHERE a.id = ?
      `,
      [artisanId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Artisan not found" });
    }

    res.json(rows[0]);
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

  if (q.length === 0) {
    return res.json({
      page: 1,
      limit: 25,
      results: 0,
      data: [],
    });
  }

  // 1) Pagination : récupérer page et limit depuis req.query
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
  const offset = (page - 1) * limit;

  // 2) Préparer le LIKE
  const like = `%${q}%`;

  // 3) SQL avec LIMIT/OFFSET
  const [rows] = await pool.query(
    `
    SELECT
      a.id,
      a.name,
      a.rating,
      a.city,
      a.image_url,
      a.is_featured,
      s.name AS specialty,
      c.name AS category
    FROM artisans a
    JOIN specialties s ON s.id = a.specialty_id
    JOIN categories c ON c.id = s.category_id
    WHERE a.name LIKE ?
       OR a.city LIKE ?
       OR s.name LIKE ?
    ORDER BY a.rating DESC, a.name ASC
    LIMIT ? OFFSET ?;
    `,
    [like, like, like, limit, offset]
  );

  // 4) Réponse paginée
  res.json({
    page,
    limit,
    results: rows.length,
    data: rows,
  });
}