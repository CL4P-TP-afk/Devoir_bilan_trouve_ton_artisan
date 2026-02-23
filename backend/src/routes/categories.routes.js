import { Router } from "express";
import { listCategories, listArtisansByCategoryId } from "../controllers/categories.controller.js";
import { catchAsync } from "../middlewares/catchAsync.js";
import { validateIdParam } from "../middlewares/validateIdParam.js";

const router = Router();

router.get("/", catchAsync(listCategories));

/**
 * GET /api/categories/:id/artisans
 * Liste les artisans d'une catégorie
 */
router.get("/:id/artisans", validateIdParam("id"), catchAsync(listArtisansByCategoryId));

export default router;