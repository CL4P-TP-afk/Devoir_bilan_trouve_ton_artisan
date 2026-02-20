import { Router } from "express";
import { getFeaturedArtisans, getArtisanById } from "../controllers/artisans.controller.js";

const router = Router();

/**
 * GET /api/artisans/featured
 * Retourne les artisans mis en avant (homepage)
 */
router.get("/featured", getFeaturedArtisans);
/**
 * GET /api/artisans/:id
 * Retourne la fiche détaillée d’un artisan
 */
router.get("/:id", getArtisanById);
export default router;
