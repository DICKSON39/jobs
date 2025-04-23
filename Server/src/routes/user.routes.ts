import { Router } from "express";
import {  getUserProfile, UserController } from "../controllers/userController";


const router= Router();

const userController = new UserController()


router.get("/user",userController.getUsers)
router.delete("/users/:id",userController.deleteUser)
router.get('/users/:userId',getUserProfile)


  
export default router;

