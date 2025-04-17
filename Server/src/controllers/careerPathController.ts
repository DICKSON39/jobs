import pool from "../config/db.config";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request,Response } from "express";

export const getRecommendations = asyncHandler(async(req:Request,res:Response)=> {
    const result = await pool.query('SELECT * FROM career_path_recommendation');
    res.status(200).json(result.rows[0]);

})

export const getRecommendationById = asyncHandler(async(req:Request,res:Response) => {
    const id = parseInt(req.params.id);
  if (isNaN(id)) {
     res.status(400).json({ error: 'Invalid ID' });
     return;
  }

  const result = await pool.query('SELECT * FROM career_path_recommendation WHERE id = $1', [id]);
    if (result.rows.length) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Recommendation not found' });
    }
})

export const createRecommendation = asyncHandler(async(req:Request,res:Response)=>{
    const { userId, recommendation } = req.body;
  if (!userId || !recommendation) {
     res.status(400).json({ error: 'Missing required fields' });
     return;
  }

  const result = await pool.query(
    'INSERT INTO career_path_recommendation (user_id, recommendation) VALUES ($1, $2) RETURNING *',
    [userId, recommendation]
  );
  res.status(201).json(result.rows[0]);
})

export const updateRecommendation = asyncHandler(async(req:Request,res:Response)=> {
    const id = parseInt(req.params.id);
    const { userId, recommendation } = req.body;
    if (isNaN(id)) {
       res.status(400).json({ error: 'Invalid ID' });
       return;
    }
    if (!userId || !recommendation) {
         res.status(400).json({error: "Missing required fields"});
         return
    }
    const result = await pool.query(
        'UPDATE career_path_recommendation SET user_id = $1, recommendation = $2 WHERE id = $3 RETURNING *',
        [userId, recommendation, id]
      );
      if (result.rows.length) {
        res.status(200).json(result.rows[0]);
        return
      } else {
        res.status(404).json({ message: 'Recommendation not found' });
        return
      }
})

export const deleteRecommendations = asyncHandler(async(req:Request,res:Response)=> {
    const id = parseInt(req.params.id);
  if (isNaN(id)) {
     res.status(400).json({ error: 'Invalid ID' });
     return;

  }
  const result = await pool.query('DELETE FROM career_path_recommendation WHERE id = $1 RETURNING id', [id]);
  if (result.rows.length) {
    res.status(200).json({ message: `Recommendation ${id} deleted` });
    return;
  } else {
    res.status(404).json({ message: 'Recommendation not found' });
    return;
  }

})

export const getRecommendationsByUser = asyncHandler(async(req:Request,res:Response)=>{
    const userId = parseInt(req.params.userId);
     if (isNaN(userId)) {
         res.status(400).json({ error: 'Invalid User ID' });
         return
    }

    const result = await pool.query('SELECT * FROM career_path_recommendation WHERE user_id = $1', [userId]);
    res.status(200).json(result.rows);
})
