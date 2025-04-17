import { error } from 'console';
import pool from '../config/db.config'
import { asyncHandler } from '../middlewares/asyncHandler';
import { Request,Response } from 'express';

export const getallCvs = asyncHandler(async(req:Request,res:Response)=> {
    const id = parseInt(req.params.id);
  if (isNaN(id)) {
     res.status(400).json({ error: 'Invalid CV ID' });
     return;
  }

  const result = await pool.query('SELECT * FROM cv WHERE id = $1', [id]);
  if (result.rows.length > 0) {
    res.status(200).json(result.rows[0]);
    return
  } else {
    res.status(404).json({ message: 'CV not found' });
    return
  }
})

export const uploadCv = asyncHandler(async(req:Request,res:Response)=> {
    const { userId, file_url, extracted_text } = req.body;
  if (!userId || !file_url) {
     res.status(400).json({ error: 'User ID and file URL are required' });
     return;
  }

  const result = await pool.query(
    'INSERT INTO cv (user_id, file_url, extracted_text) VALUES ($1, $2, $3) RETURNING *',
    [userId, file_url, extracted_text]
  );
  res.status(201).json(result.rows[0]);
  return;
})

export const getCvById = asyncHandler(async(req:Request,res:Response)=> {
    const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid CV ID' });
  }

  const result = await pool.query('SELECT * FROM cv WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'CV not found' });
    }
})



export const updateCV = asyncHandler(async(req:Request,res:Response)=> {
    const id = parseInt(req.params.id);
  const { userId, file_url, extracted_text } = req.body;
  if (isNaN(id)) {
     res.status(400).json({ error: 'Invalid CV ID' });
     return
  }
  if (!userId || !file_url) {
     res.status(400).json({ error: 'User ID and file URL are required' });
     return
  }

  const result = await pool.query(
    'UPDATE cv SET user_id = $1, file_url = $2, extracted_text = $3 WHERE id = $4 RETURNING *',
    [userId, file_url, extracted_text, id]
  );
  if (result.rows.length > 0) {
    res.status(200).json(result.rows[0]);
  } else {
    res.status(404).json({ message: 'CV not found' });
  }
})

export const deleteCV = asyncHandler(async(req:Request,res:Response)=> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
       res.status(400).json({ error: 'Invalid CV ID' });
       return
    }

    const result = await pool.query('DELETE FROM cv WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: `CV with ID ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: 'CV not found' });
    }
})

export const getCvsByUser = asyncHandler(async(req:Request,res:Response)=>{
    const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
     res.status(400).json({ error: 'Invalid User ID' });
     return;
  }

  const result = await pool.query('SELECT * FROM cv WHERE user_id = $1', [userId]);
  res.status(200).json(result.rows);
})


