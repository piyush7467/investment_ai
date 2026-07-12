import { Router } from "express";
import chatbotController from "./chatbot.controller.js";
import { authOptional } from "../../middleware/authMiddleware.js";

const router = Router();

router.post(
    "/message",
    authOptional,
    chatbotController.chat
);

export default router;
