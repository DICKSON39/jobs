import express from 'express';
import { createUserSkill, deleteUserSkill, getAllUserSkills, getSkillsByUser, getUsersBySkill,  getUserSkillsByUserId,  updateUserSkill } from '../controllers/UserSkillController';
const router = express.Router();

router.get('/users/user-skills', getAllUserSkills);
router.get('/user-skills/:userId',getUserSkillsByUserId);
router.post('/user-skills', createUserSkill);
router.put('/user-skills/:id', updateUserSkill);
router.delete('/user-skills/:id', deleteUserSkill);
router.get('/users/:userId/skills', getSkillsByUser);
router.get('/skills/:skillId/users', getUsersBySkill);

export default router;