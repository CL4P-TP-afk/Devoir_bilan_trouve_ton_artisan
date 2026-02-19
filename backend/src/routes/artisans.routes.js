import { Router } from "express";
import { getFeaturedArtisans } from "../controllers/artisans.controller.js";

const router = Router();

/**
 * GET /api/artisans/featured
 * Retourne les artisans mis en avant (homepage)
 */
router.get("/featured", getFeaturedArtisans);

export default router;
