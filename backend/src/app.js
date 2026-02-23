/**
 * Configuration principale de l'application Express.
 * 
 * - Initialise Express
 * - Configure les middlewares globaux (CORS, JSON)
 * - Déclare les routes API
 * 
 * Ce fichier ne démarre pas le serveur.
 * Il exporte simplement l'application configurée.
 */

import express from "express";
import cors from "cors";
import categoriesRouter from "./routes/categories.routes.js";
import artisansRouter from "./routes/artisans.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express();

// Autorise les requêtes cross-origin (utile pour le frontend React)
app.use(cors());

// Permet de parser les requêtes JSON (req.body)
app.use(express.json());

// Endpoint de santé pour vérifier que l'API répond
app.get("/health", (req, res) => {
  res.json({ status: "API OK" });
});

app.use("/api/categories", categoriesRouter);
app.use("/api/artisans", artisansRouter);

app.use(errorHandler);

export default app;
