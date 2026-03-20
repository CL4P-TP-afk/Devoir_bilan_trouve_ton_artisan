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

/**
 * Port d'écoute du serveur.
 * En production, il est fourni par l'hébergeur.
 * En développement, on utilise 3001 par défaut.
 */
const PORT = process.env.PORT || 3001;

/**
 * Lance l'application après validation de la connexion à la base de données.
 *
 * Le serveur HTTP n'est démarré que si Sequelize parvient à se connecter,
 * afin d'éviter de rendre l'API accessible alors que la base ne l'est pas.
 */
async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    app.listen(PORT, () => {
      console.log(`✅ API server listening on port ${PORT}.`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
}

start();