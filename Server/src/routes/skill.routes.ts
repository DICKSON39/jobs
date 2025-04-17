import express from 'express';
import { createSkill, deleteSkill, getAllSkills, getSkillById, updateSkill } from '../controllers/SkillController';

const router = express.Router();


//Get all skills
router.get("/skills",getAllSkills);

// GET a specific skill by ID
router.get('/skills/:id',getSkillById);


// POST a new skill
router.post('/skill',createSkill);

//PUT (update) an existing skill
router.put('/skills/:id',updateSkill);


//DELETE a skill

router.delete('/skills/:id',deleteSkill);

export default router;