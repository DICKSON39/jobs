import express from 'express';
import { addSkillToJob, getSkillsForJob, removeSkillFromJob } from '../controllers/jobSkillController';

const router = express.Router();

router.post('/jobs/skills',addSkillToJob);

router.get('/jobs/:jobId/skills',getSkillsForJob);

router.delete('/jobs/:jobId/skills/:skillId',removeSkillFromJob)

export default router