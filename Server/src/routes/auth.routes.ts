import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

const authController = new AuthController();

router.post("/register",authController.RegisterUser)
router.post("/login",authController.LoginUser);
router.post("/logout",authController.logoutUser)
export default router;

