import { Router } from "express";
import { UserController } from "../controllers/userController";

const router= Router();

const userController = new UserController()


router.get("/user",userController.getUsers)
router.delete("/user/:id",userController.deleteUser)

export default router;