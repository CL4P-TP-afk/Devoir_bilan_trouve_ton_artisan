/**
 * Configuration principale de l'application Express.
 *
 * Responsabilités :
 * - initialiser Express
 * - configurer les middlewares globaux
 *   - CORS
 *   - parsing JSON
 *   - logs HTTP avec Morgan
 * - exposer les routes de l'API
 * - exposer la documentation Swagger
 * - configurer le gestionnaire global d'erreurs
 *
 * Ce fichier ne démarre pas le serveur.
 * Le démarrage est effectué dans server.js.
 */

import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import categoriesRouter from "./routes/categories.routes.js";
import artisansRouter from "./routes/artisans.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { openapiSpec } from "./docs/openapi.js";

const app = express();

/**
 * Liste des origines autorisées à communiquer avec l'API.
 *
 * En développement :
 * - frontend local Vite
 *
 * En production :
 * - URL publique du frontend (ex: Vercel)
 *
 * La valeur est fournie par la variable d'environnement FRONTEND_URL.
 */
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

/**
 * Configure la politique CORS.
 *
 * Objectif :
 * - autoriser le frontend de l'application à consommer l'API
 * - refuser les origines non prévues en production
 *
 * On autorise aussi les requêtes sans origin explicite
 * (ex: certains outils de test, curl, health checks).
 */
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || origin === allowedOrigin) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy: this origin is not allowed."));
    },
  })
);

/**
 * Permet à Express de parser automatiquement les corps de requêtes JSON.
 * Les données deviennent ensuite accessibles via req.body.
 */
app.use(express.json());

/**
 * Active les logs HTTP.
 *
 * - "dev" en développement : plus lisible pour travailler localement
 * - "combined" en production : plus complet pour un hébergement
 */
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

/**
 * Endpoint de santé.
 *
 * Permet de vérifier rapidement que l'API répond.
 * Très utile après déploiement ou pour les tests de monitoring.
 */
app.get("/health", (req, res) => {
  res.json({ status: "API OK" });
});

/**
 * Routes principales de l'API.
 */
app.use("/api/categories", categoriesRouter);
app.use("/api/artisans", artisansRouter);

/**
 * Documentation Swagger de l'API.
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

/**
 * Gestionnaire global des erreurs.
 * Doit être déclaré après les routes.
 */
app.use(errorHandler);

export default app;