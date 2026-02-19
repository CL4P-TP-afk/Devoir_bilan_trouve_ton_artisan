import { pool } from "../db/pool.js";

/**
 * Retourne une liste d'artisans mis en avant.
 * Tri : meilleure note d'abord, puis nom.
 * Limite : 3 résultats.
 */
export async function getFeaturedArtisans(req, res) {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
