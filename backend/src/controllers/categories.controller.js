import { pool } from "../db/pool.js";

/**
 * Retourne la liste des catégories
 * triées par ordre alphabétique.
 */

export async function listCategories(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT id, name FROM categories ORDER BY name ASC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
}

/**
 * Retourne les artisans appartenant à une catégorie donnée.
 * La catégorie est identifiée par son id.
 */
export async function listArtisansByCategoryId(req, res) {
  const categoryId = Number(req.params.id);

  // Validation simple : id doit être un entier positif
  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    return res.status(400).json({ error: "Invalid category id" });
  }

  try {
    // vérifier que la catégorie existe
    const [catRows] = await pool.query(
      "SELECT id, name FROM categories WHERE id = ?",
      [categoryId]
    );

    if (catRows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

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
        s.id AS specialty_id,
        s.name AS specialty,
        c.id AS category_id,
        c.name AS category
      FROM artisans a
      JOIN specialties s ON s.id = a.specialty_id
      JOIN categories c ON c.id = s.category_id
      WHERE c.id = ?
      ORDER BY a.rating DESC, a.name ASC;
      `,
      [categoryId]
    );

    // Réponse avec un petit contexte utile au front
    res.json({
      category: catRows[0],
      artisans: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}