import { Router } from "express";
import { getFeaturedArtisans, getArtisanById, searchArtisans } from "../controllers/artisans.controller.js";
import { catchAsync } from "../middlewares/catchAsync.js";

const router = Router();

/**
 * GET /api/artisans/featured
 * Retourne les artisans mis en avant (homepage)
 */
router.get("/featured", catchAsync(getFeaturedArtisans));
/**
 * GET /api/artisans?search=...
 * Recherche des artisans (nom, ville, spécialité)
 */
router.get("/", catchAsync(searchArtisans));
/**
 * GET /api/artisans/:id
 * Retourne la fiche détaillée d’un artisan
 */
router.get("/:id", catchAsync(getArtisanById));

export default router;
