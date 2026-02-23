export function errorHandler(err, req, res, next) {
  console.error("❌ API Error:", err);

  // Erreurs de connexion DB
  if (err?.code === "ECONNREFUSED") {
    return res.status(503).json({ error: "Database unavailable" });
  }

  // Erreurs MySQL (mysql2)
  if (err?.code) {
    return res.status(500).json({ error: "Database error" });
  }

  return res.status(500).json({ error: "Internal server error" });
}