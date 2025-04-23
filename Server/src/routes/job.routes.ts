import express from 'express';
import { addJob, getAllJobs, getJobById } from '../controllers/jobController';
import { getAllPortfolio } from '../controllers/portfolioController';
import { protect } from '../middlewares/auth/protect';

const router = express.Router();

router.post('/job',addJob);
router.get('/jobs',getAllJobs);
router.get('/job/:id',getJobById);


export default router

