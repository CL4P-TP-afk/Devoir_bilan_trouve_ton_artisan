/**
 * Retourne la liste des catégories
 * triées par ordre alphabétique.
 */

import { pool } from "../db/pool.js";

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