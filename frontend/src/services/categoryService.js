import { apiFetch } from "./api";

/**
 * Récupère la liste des catégories
 * @returns {Promise<Array>}
 */
export function getCategories() {
  return apiFetch("/categories");
}