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

/**
 * Envoie un message à un artisan depuis le formulaire de contact.
 * @param {number|string} artisanId
 * @param {{name: string, email: string, message: string}} payload
 * @returns {Promise<Object>}
 */
export function sendContactMessage(artisanId, payload) {
  return apiFetch(`/artisans/${artisanId}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
