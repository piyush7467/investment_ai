import { Router } from "express";
import userController from "./user.controller.js";
import { protect } from "../../middleware/authMiddleware.js";
import { upload } from "../../middleware/multer.middleware.js";

const router = Router();

router.put(
    "/profile",
    protect,
    upload.single("avatar"),
    userController.updateProfile
);

export default router;
