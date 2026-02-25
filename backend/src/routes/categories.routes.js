/**
 * Routes liées aux catégories d'artisans.
 *
 * Permet de récupérer la liste des catégories
 * ainsi que les artisans associés.
 */
import { Router } from "express";
import { listCategories, listArtisansByCategoryId } from "../controllers/categories.controller.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";

const router = Router();

/**
 * Route : GET /api/categories
 *
 * Retourne la liste de toutes les catégories d'artisans.
 *
 * Middleware :
 * - catchAsync : gestion centralisée des erreurs async.
 */
router.get("/", catchAsync(listCategories));

/**
 * Route : GET /api/categories/:id/artisans
 *
 * Retourne la liste des artisans appartenant à une catégorie.
 *
 * Middlewares :
 * - validateIdParam : validation de l'identifiant de catégorie
 * - catchAsync : gestion des erreurs async
 */
router.get("/:id/artisans", validateIdParam("id"), catchAsync(listArtisansByCategoryId));

export default router;