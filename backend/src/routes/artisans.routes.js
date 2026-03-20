/**
 * Routes liées aux artisans.
 *
 * Ce module définit les endpoints REST permettant
 * de consulter, rechercher et contacter un artisan.
 */
import { Router } from "express";
import {
  getFeaturedArtisans,
  getArtisanById,
  searchArtisans,
  sendContactMessage,
} from "../controllers/artisans.controller.js";
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
 * - validateIdParam : vérifie que l'identifiant est un entier positif
 * - catchAsync : capture les erreurs async
 */
router.get("/:id", validateIdParam("id"), catchAsync(getArtisanById));

/**
 * Route : POST /api/artisans/:id/contact
 *
 * Permet d'envoyer un message à propos d'un artisan précis.
 *
 * Middlewares :
 * - validateIdParam : vérifie que l'identifiant transmis est valide
 * - catchAsync : transmet les erreurs async au gestionnaire global
 */
router.post("/:id/contact", validateIdParam("id"), catchAsync(sendContactMessage));

export default router;