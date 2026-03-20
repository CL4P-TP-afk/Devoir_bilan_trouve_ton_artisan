/**
 * Middleware global de gestion des erreurs.
 *
 * Responsabilités :
 * - centraliser les erreurs backend
 * - éviter d'exposer des détails internes sensibles
 * - renvoyer des réponses cohérentes au frontend
 *
 * Types d'erreurs gérées :
 * - connexion base indisponible → 503
 * - erreurs Sequelize / DB → 500
 * - fallback → 500 générique
 */

export function errorHandler(err, req, res, next) {
  console.error("❌ API Error:", err);

  /**
   * Base de données inaccessible (ex: MySQL arrêté)
   */
  if (err?.code === "ECONNREFUSED") {
    return res.status(503).json({
      error: "Database unavailable",
    });
  }

  /**
   * Erreurs liées à Sequelize ou au driver MySQL
   */
  if (err?.code || err?.name?.includes("Sequelize")) {
    return res.status(500).json({
      error: "Database error",
    });
  }

  /**
   * Fallback générique
   */
  return res.status(500).json({
    error: "Internal server error",
  });
}