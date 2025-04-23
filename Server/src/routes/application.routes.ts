import express from 'express';
import { Application, getApplication, getApplicationsByUserId } from '../controllers/applicationController';
import { protect } from '../middlewares/auth/protect';

const router = express.Router();

router.post("/applications/:jobId", Application);
router.get("/applications",getApplication);
router.get('/applications/user/:userId',getApplicationsByUserId)

export default router;