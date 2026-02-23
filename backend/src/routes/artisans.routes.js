import { Router } from "express";
import { getFeaturedArtisans, getArtisanById, searchArtisans } from "../controllers/artisans.controller.js";

const router = Router();

/**
 * GET /api/artisans/featured
 * Retourne les artisans mis en avant (homepage)
 */
router.get("/featured", getFeaturedArtisans);
/**
 * GET /api/artisans?search=...
 * Recherche des artisans (nom, ville, spécialité)
 */
router.get("/", searchArtisans);
/**
 * GET /api/artisans/:id
 * Retourne la fiche détaillée d’un artisan
 */
router.get("/:id", getArtisanById);
export default router;
