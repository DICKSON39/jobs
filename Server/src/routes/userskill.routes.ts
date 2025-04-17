import express from 'express';
import { createUserSkill, deleteUserSkill, getAllUserSkills, getSkillsByUser, getUsersBySkill, getUserSkillById, updateUserSkill } from '../controllers/UserSkillController';
const router = express.Router();

router.get('/user-skills', getAllUserSkills);
router.get('/user-skills/:id', getUserSkillById);
router.post('/user-skills', createUserSkill);
router.put('/user-skills/:id', updateUserSkill);
router.delete('/user-skills/:id', deleteUserSkill);
router.get('/users/:userId/skills', getSkillsByUser);
router.get('/skills/:skillId/users', getUsersBySkill);

export default router;