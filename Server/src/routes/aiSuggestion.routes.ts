import express from 'express';
import { suggestCareerPaths } from '../controllers/AiSuggestions';

const router = express.Router()


console.log("✅✅✅pin point my g")

router.post('/career-suggestions',suggestCareerPaths)

export default router;