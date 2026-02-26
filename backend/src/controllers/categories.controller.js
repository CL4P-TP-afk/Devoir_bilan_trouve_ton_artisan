import { Category, Artisan, Specialty } from "../models/index.js";

/**
 * Liste toutes les catégories (tri alphabétique).
 *
 * @route GET /api/categories
 * @returns {Promise<void>}
 */

export async function listCategories(req, res) {
  const rows = await Category.findAll({
    attributes: ["id", "name"],
    order: [["name", "ASC"]],
  });

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
  const categoryId = req.params.id; // validé

  const category = await Category.findByPk(categoryId, {
    attributes: ["id", "name"],
  });

  if (!category) return res.status(404).json({ error: "Category not found" });

  const artisans = await Artisan.findAll({
    include: [
      {
        model: Specialty,
        as: "specialty",
        attributes: ["name", "category_id"],
        where: { category_id: categoryId },
        required: true,
      },
    ],
    order: [["rating", "DESC"], ["name", "ASC"]],
  });

  res.json({
    category,
    artisans: artisans.map((a) => ({
      id: a.id,
      name: a.name,
      rating: Number(a.rating),
      city: a.city,
      image_url: a.image_url,
      specialty: a.specialty?.name,
    })),
  });
}