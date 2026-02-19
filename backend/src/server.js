/**
 * Point d'entrée du serveur.
 * 
 * - Charge les variables d'environnement
 * - Vérifie la connexion à la base de données
 * - Lance l'écoute du serveur Express
 */

import app from "./app.js";
import "dotenv/config";
import { pool } from "./db/pool.js";

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    // Test de connexion à la base de données au démarrage
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL connected");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
