import express from "express";
import { deleteCV, getallCvs, getCvById, getCvsByUser, updateCV, uploadCv } from "../controllers/cvcontroller";

const router = express.Router();

router.get('/cvs',getallCvs);
router.get("/users/:userId/cvs",getCvsByUser)
router.post("/cvs",uploadCv)
router.put("/cvs/:id",updateCV)
router.delete('/cvs/:id',deleteCV);
router.get('/cvs/:id',getCvById);



export default router;

