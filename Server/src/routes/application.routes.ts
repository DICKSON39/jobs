import express from 'express';
import { Application, getApplication } from '../controllers/applicationController';

const router = express.Router();

router.post("/applications",Application);
router.get("/applications",getApplication);

export default router;