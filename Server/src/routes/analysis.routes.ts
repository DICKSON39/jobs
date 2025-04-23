import express from 'express';
import { getDashboardStats } from '../controllers/AnalysisController';
import { aiPrompt } from '../controllers/aiController';

const router = express.Router();


console.log("✅ Analysis router loaded");

router.get('/dashboard-stats',getDashboardStats)
router.post('/ask',aiPrompt)
router.get('/test', (req, res) => {
    res.json({ msg: "Test route working!" });
  });
  

export default router