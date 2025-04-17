import {Request,Response} from 'express';
import pool from '../config/db.config';
import { asyncHandler } from '../middlewares/asyncHandler';


export const getAllPortfolio = asyncHandler(async(req:Request,res:Response)=> {
    const result = await pool.query("SELECT * FROM portfolio")
    res.status(200).json(result.rows);
})


export const getAllPortfolioById = asyncHandler(async(req:Request,res:Response)=> {
    const portfolioId = parseInt(req.params.id);
    if (isNaN(portfolioId)) {
       res.status(400).json({ error: 'Invalid portfolio ID' });
       return;
    }

    const result = await pool.query ('SELECT * FROM portfolio WHERE id = $1', [portfolioId]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Portfolio not found' });
    }
})


export const createPortFolio = asyncHandler(async(req:Request,res:Response)=> {
    const { title, description, projectUrl, userId } = req.body;
  if (!title || !description || !projectUrl || !userId) {
     res.status(400).json({ error: 'Missing required fields' });
     return;
  }
  const result = await pool.query(
    'INSERT INTO portfolio (title, description, projectUrl, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, projectUrl, userId]
  );
  res.status(201).json(result.rows[0]);
})

export const updatePortfolio = asyncHandler(async(req:Request,res:Response)=> {
    const portfolioId = parseInt(req.params.id);
    const { title, description, projectUrl, userId } = req.body;
    if (isNaN(portfolioId)) {
       res.status(400).json({ error: 'Invalid portfolio ID' });
       return
    }
    if (!title || !description || !projectUrl || !userId) {
       res.status(400).json({ error: 'Missing required fields' });
       return
    }

    const result = await pool.query(
        'UPDATE portfolio SET title = $1, description = $2, projectUrl = $3, user_id = $4 WHERE id = $5 RETURNING *',
        [title, description, projectUrl, userId, portfolioId]
      );
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
        return;
      } else {
        res.status(404).json({ message: 'Portfolio not found' });
        return;
      }
})

export const deletePortfolio = asyncHandler(async(req:Request,res:Response)=> {
    const portfolioId = parseInt(req.params.id);
  if (isNaN(portfolioId)) {
     res.status(400).json({ error: 'Invalid portfolio ID' });
     return;
  }

  const result = await pool.query('DELETE FROM portfolio WHERE id = $1 RETURNING id', [portfolioId]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: `Portfolio with ID ${portfolioId} deleted successfully` });
    } else {
      res.status(404).json({ message: 'Portfolio not found' });
    }
})


export const getAllPortfolioByUser = asyncHandler(async(req:Request,res:Response)=> {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
       res.status(400).json({ error: 'Invalid user ID' });
       return;
    }

    const result = await pool.query('SELECT * FROM portfolio WHERE user_id = $1', [userId]);
    res.status(200).json(result.rows);
})
