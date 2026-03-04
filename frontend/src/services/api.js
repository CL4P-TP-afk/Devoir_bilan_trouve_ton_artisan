const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

/**
 * Effectue un appel HTTP vers l'API et renvoie le JSON.
 * Centralise la gestion des erreurs pour éviter de répéter du fetch partout.
 *
 * @param {string} endpoint ex: "/artisans/featured"
 * @param {RequestInit} [options]
 */
export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, options);

  if (!res.ok) {
    // On essaie de récupérer un message backend si présent
    let message = `API error (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return res.json();
}