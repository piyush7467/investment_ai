import { Router } from "express";
import investmentController from "./investment.controller.js";
import { protect, authOptional } from "../../middleware/authMiddleware.js";

const router = Router();

router.post(
    "/analyze",
    authOptional,
    investmentController.analyze
);

router.get(
    "/history",
    protect,
    investmentController.getHistory
);

export default router;