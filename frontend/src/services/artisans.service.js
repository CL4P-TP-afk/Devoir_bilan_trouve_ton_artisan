import { apiFetch } from "./api";

/**
 * Récupère la liste des artisans mis en avant (home).
 * @returns {Promise<Array>}
 */
export function getFeaturedArtisans() {
  return apiFetch("/artisans/featured");
}

/**
 * Récupère la fiche détaillée d’un artisan
 * @param {number|string} artisanId
 * @returns {Promise<Object>}
 */
export function getArtisanById(artisanId) {
  return apiFetch(`/artisans/${artisanId}`);
}