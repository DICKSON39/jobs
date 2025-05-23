import pool from "../config/db.config";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request, Response } from "express";


export const getAllUserSkills = asyncHandler(async (req: Request, res: Response) => {
  const result = await pool.query(`
    SELECT 
      u.id AS "userId", 
      u.name AS "userName", 
      s.name AS "skillName", 
      us."yearsExperience"
    FROM user_skill us
    JOIN skill s ON us."skillId" = s.id
    JOIN "user" u ON us."userId" = u.id
  `);
  res.status(200).json(result.rows);
  return;
});




export const getUserSkillsByUserId = asyncHandler(async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  const result = await pool.query(
    `SELECT us.id, us."yearsExperience", s.name AS skillName
     FROM user_skill us
     JOIN skill s ON us."skillId" = s.id
     WHERE us."userId" = $1`,
    [userId]
  );
  

  res.status(200).json(result.rows);
});


export const  createUserSkill= asyncHandler( async(req:Request, res:Response)=> {
    const { userId, skillId, yearsExperience } = req.body;
    if (!userId || !skillId) {
       res.status(400).json({ error: 'User ID and Skill ID are required' });
       return
    }
    
      const result = await pool.query(
        'INSERT INTO user_skill ("userId", "skillId", "yearsExperience") VALUES ($1, $2, $3) RETURNING *',
        [userId, skillId, yearsExperience]
      );
      res.status(201).json(result.rows[0]);
      return
   
  }
)

export const updateUserSkill=asyncHandler(async(req:Request, res:Response)=> {
    const id = parseInt(req.params.id);
    const { userId, skillId, yearsExperience } = req.body;
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid UserSkill ID' });
      return
    
    }
    if (!userId || !skillId) {
      res.status(400).json({ error: 'User ID and Skill ID are required' });
      return
    
    }
  
      const result = await pool.query(
        'UPDATE user_skill SET "userId"=$1, "skillId"=$2, "yearsExperience"=$3 WHERE id = $4 RETURNING *',
        [userId, skillId, yearsExperience, id]
      );
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'UserSkill not found' });
      }
    
  })
  
 export const deleteUserSkill=asyncHandler(async(req, res) =>{
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
       res.status(400).json({ error: 'Invalid UserSkill ID' });
       return
       
    }
    
      const result = await pool.query('DELETE FROM user_skill WHERE id = $1 RETURNING id', [id]);
      if (result.rows.length > 0) {
        res.status(200).json({ message: `UserSkill with ID ${id} deleted successfully` });
      } else {
        res.status(404).json({ message: 'UserSkill not found' });
      }
    
  });
  
  export const getSkillsByUser=asyncHandler( async(req:Request, res:Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid User ID' });
      return
    }
    
      const result = await pool.query(
        `SELECT us.id, us."yearsExperience", s.name AS skillName
        FROM user_skill us
        JOIN skill s ON us."skillId" = s.id
        WHERE us."userId" = $1`
      ,
        [userId]
      );
      res.status(200).json(result.rows);
    
  })
  
  export  const getUsersBySkill=asyncHandler(async(req:Request, res:Response)=> {
    const skillId = parseInt(req.params.skillId);
    if (isNaN(skillId)) {
      res.status(400).json({ error: 'Invalid Skill ID' });
      return
    }
    
      const result = await pool.query(
        `SELECT us.id, u.id AS user_id, /* Add user details you need */ u. AS user_name, us.years_experience
         FROM user_skill us
         JOIN "user" u ON us.user_id = u.id
         WHERE us.skill_id = $1`,
        [skillId]
      );
      res.status(200).json(result.rows);
      return;
    
  });
    
  