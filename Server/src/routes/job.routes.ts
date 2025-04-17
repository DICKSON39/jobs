import express from 'express';
import { addJob } from '../controllers/jobController';

const router = express.Router();

router.post('/job',addJob)

export default router