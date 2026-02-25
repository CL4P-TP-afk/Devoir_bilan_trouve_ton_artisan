/**
 * Routes liées aux artisans.
 *
 * Ce module définit les endpoints REST permettant
 * de consulter et rechercher les artisans.
 */
import { Router } from "express";
import { getFeaturedArtisans, getArtisanById, searchArtisans } from "../controllers/artisans.controller.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";

const router = Router();

/**
 * Route : GET /api/artisans/featured
 *
 * Retourne une sélection d'artisans mis en avant pour la page d'accueil.
 * Le nombre d'artisans retournés est limité côté serveur.
 *
 * Middleware :
 * - catchAsync : capture les erreurs async et les transmet au errorHandler.
 */
router.get("/featured", catchAsync(getFeaturedArtisans));

/**
 * Route : GET /api/artisans
 *
 * Permet de rechercher des artisans via un mot-clé.
 * Le mot-clé est passé via le paramètre de requête `search`.
 *
 * Exemple :
 * /api/artisans?search=plombier
 *
 * Middleware :
 * - catchAsync : gestion centralisée des erreurs async.
 */
router.get("/", catchAsync(searchArtisans));

/**
 * Route : GET /api/artisans/:id
 *
 * Retourne la fiche détaillée d'un artisan.
 *
 * Middlewares :
 * - validateIdParam : vérifie que l'identifiant est un entier positif.
 * - catchAsync : capture les erreurs async.
 */
router.get("/:id", validateIdParam("id"), catchAsync(getArtisanById));

export default router;
