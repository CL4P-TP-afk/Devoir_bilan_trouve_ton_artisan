import { Router } from "express";
import { listCategories, listArtisansByCategoryId } from "../controllers/categories.controller.js";

const router = Router();

router.get("/", listCategories);

/**
 * GET /api/categories/:id/artisans
 * Liste les artisans d'une catégorie
 */
router.get("/:id/artisans", listArtisansByCategoryId);

export default router;