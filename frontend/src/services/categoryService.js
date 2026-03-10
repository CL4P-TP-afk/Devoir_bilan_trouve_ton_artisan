import { apiFetch } from "./api";

/**
 * Récupère la liste des catégories
 * @returns {Promise<Array>}
 */
export function getCategories() {
  return apiFetch("/categories");
}

/**
 * Récupère une catégorie et la liste de ses artisans.
 * @param {number|string} categoryId
 * @returns {Promise<{ category: Object, artisans: Array }>}
 */
export function getArtisansByCategoryId(categoryId) {
  return apiFetch(`/categories/${categoryId}/artisans`);
}