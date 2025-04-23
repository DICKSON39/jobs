import express from 'express';
import { addSkillToJob, getSkillsForJob, removeSkillFromJob } from '../controllers/jobSkillController';

const router = express.Router();

router.post('/job-skills',addSkillToJob);

router.get('/:jobId/',getSkillsForJob);

router.delete('/jobs/:jobId/skills/:skillId',removeSkillFromJob)

export default router

