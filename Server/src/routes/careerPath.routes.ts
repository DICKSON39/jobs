import express from 'express'
import { createRecommendation, deleteRecommendations, getRecommendationById, getRecommendations, getRecommendationsByUser, updateRecommendation } from '../controllers/careerPathController';

const router = express.Router();


router.get('/recommendations',getRecommendations);
router.get('/recommendations/:id',getRecommendationById);
router.post('/recommendations',createRecommendation);
router.put('/recommendations/:id',updateRecommendation);
router.delete('/recommendations/:id',deleteRecommendations);
router.get('/users/:userId/recommendations',getRecommendationsByUser)

export default router;