/**
 * URL de base de l'API.
 *
 * - En développement : http://localhost:3001/api
 * - En production : défini via VITE_API_URL (ex: Render)
 *
 * On supprime le slash final pour éviter les doublons "//"
 */
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001/api")
  .replace(/\/$/, "");

/**
 * Fonction utilitaire centralisée pour appeler l'API.
 *
 * Avantages :
 * - évite de répéter fetch partout
 * - gestion centralisée des erreurs
 * - normalisation des endpoints
 *
 * @param {string} endpoint - ex: "/artisans/featured"
 * @param {RequestInit} [options] - options fetch (method, headers, body…)
 * @returns {Promise<any>} JSON si disponible
 */
export async function apiFetch(endpoint, options = {}) {
  // Normalise l'endpoint (assure qu'il commence par "/")
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  const res = await fetch(`${API_URL}${normalizedEndpoint}`, options);

  // Gestion des erreurs HTTP
  if (!res.ok) {
    let message = `API error (${res.status})`;

    try {
      const contentType = res.headers.get("content-type") || "";

      // Si la réponse est du JSON, on tente de récupérer un message backend
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (data?.error) message = data.error;
      } else {
        // Sinon on récupère le texte brut (utile en prod)
        const text = await res.text();
        if (text) message = text;
      }
    } catch {
      // Ignore les erreurs de parsing
    }

    throw new Error(message);
  }

  // Si la réponse est JSON → on retourne le JSON
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  // Sinon (ex: 204 No Content)
  return null;
}