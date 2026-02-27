/**
 * Point d'entrée du serveur API.
 *
 * Responsabilités :
 * - charger les variables d'environnement
 * - vérifier la connexion à la base de données via Sequelize
 * - démarrer le serveur Express
 *
 * Si la connexion à la base échoue, le serveur ne démarre pas
 * afin d'éviter une API partiellement fonctionnelle.
 */

import "dotenv/config";
import app from "./app.js";
import { sequelize } from "./models/index.js";

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Sequelize connected");
    app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Sequelize connection error:", err);
    process.exit(1);
  }
}

start();