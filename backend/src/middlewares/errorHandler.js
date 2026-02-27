/**
 * errorHandler
 *
 * Middleware global de gestion des erreurs (à déclarer après les routes).
 * Centralise la réponse JSON en cas d'erreur non gérée.
 *
 * - 503 : base de données indisponible (ex: serveur MySQL arrêté)
 * - 500 : erreur interne / erreur DB générique
 *
 * @param {any} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function errorHandler(err, req, res, next) {
  console.error("❌ API Error:", err);

  // Erreur typique quand MySQL/MariaDB est arrêté ou inaccessible
  if (err?.code === "ECONNREFUSED") {
    return res.status(503).json({ error: "Database unavailable" });
  }

  // Sequelize / driver peuvent exposer un `code` ou un nom d'erreur
  // On renvoie un message générique côté client (évite d'exposer des détails internes).
  if (err?.code || err?.name?.includes("Sequelize")) {
    return res.status(500).json({ error: "Database error" });
  }

  return res.status(500).json({ error: "Internal server error" });
}