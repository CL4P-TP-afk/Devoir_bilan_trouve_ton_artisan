import { pool } from "../db/pool.js";

/**
 * Liste toutes les catégories (tri alphabétique).
 *
 * @route GET /api/categories
 * @returns {Promise<void>}
 */

export async function listCategories(req, res) {
    const [rows] = await pool.query(
      "SELECT id, name FROM categories ORDER BY name ASC"
    );
    res.json(rows);
}

/**
 * Retourne la liste des artisans appartenant à une catégorie donnée.
 *
 * L'identifiant de la catégorie est transmis via le paramètre d'URL `:id`.
 * La fonction vérifie d'abord que la catégorie existe,
 * puis retourne les artisans associés à cette catégorie.
 *
 * Exemple :
 * GET /api/categories/1/artisans
 *
 * @route GET /api/categories/:id/artisans
 * @param {import("express").Request} req
 * @param {number} req.params.id Identifiant de la catégorie
 * @param {import("express").Response} res
 * @returns {Promise<void>} Objet contenant la catégorie et la liste de ses artisans
 *
 * @throws {404} Si la catégorie n'existe pas
 */
export async function listArtisansByCategoryId(req, res) {
  const categoryId = req.params.id;

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
}