import express from 'express'
import { createPortFolio, deletePortfolio, getAllPortfolio, getAllPortfolioById, getAllPortfolioByUser, updatePortfolio } from '../controllers/portfolioController';


const router = express.Router();

// GET all portfolios
router.get('/portfolios', getAllPortfolio);

// GET a specific portfolio by ID
router.get('/portfolios/:id', getAllPortfolioById);

// POST a new portfolio
router.post('/portfolios', createPortFolio);

// PUT (update) an existing portfolio
router.put('/portfolios/:id', updatePortfolio);

// DELETE a portfolio
router.delete('/portfolios/:id',deletePortfolio );

// GET portfolios for a specific user
router.get('/users/:userId/portfolios', getAllPortfolioByUser);


export default router;