import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import investmentRoutes from "../modules/investment/investment.route.js";
import chatbotRoutes from "../modules/chatbot/chatbot.route.js";
import userRoutes from "../modules/user/user.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/investment", investmentRoutes);
router.use("/chatbot", chatbotRoutes);
router.use("/user", userRoutes);

export default router;