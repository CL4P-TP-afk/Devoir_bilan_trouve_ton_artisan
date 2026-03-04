import { apiFetch } from "./api";

/**
 * Récupère la liste des artisans mis en avant (home).
 * @returns {Promise<Array>}
 */
export function getFeaturedArtisans() {
  return apiFetch("/artisans/featured");
}