import express from 'express'
import { createInterview, deleteInterView, getAllInterviews, getInterviewById, getInterviewsByApplication, updateInterview } from '../controllers/Interviewcontroller';


const router = express.Router();

// router.get('/interviews', getAllInterviews);
router.get("/interviews",getAllInterviews)
router.get('/interviews/:id', getInterviewById);
router.post('/interviews', createInterview);
router.put('/interviews/:id', updateInterview);
router.delete('/interviews/:id', deleteInterView);
router.get('/applications/:applicationId/interviews',getInterviewsByApplication);

export default router;