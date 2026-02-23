import { pool } from "../db/pool.js";

/**
 * Retourne une liste d'artisans mis en avant.
 * Tri : meilleure note d'abord, puis nom.
 * Limite : 3 résultats.
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
 * Retourne la fiche détaillée d’un artisan par son id.
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
 * Recherche sur : nom, ville, spécialité.
 * Paramètre : ?search=xxx
 */
export async function searchArtisans(req, res) {
  const q = (req.query.search || "").toString().trim();

  // Si pas de mot-clé, on renvoie une liste vide (choix simple)
  if (q.length === 0) {
    return res.json([]);
  }
    const like = `%${q}%`;

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
      LIMIT 25;
      `,
      [like, like, like]
    );

    res.json(rows);
}