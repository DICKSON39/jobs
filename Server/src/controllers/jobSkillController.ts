import { Request, Response } from "express";
import pool from "../config/db.config";
import { asyncHandler } from "../middlewares/asyncHandler";
import { error } from "console";

export const addSkillToJob = asyncHandler(
  async (req: Request, res: Response) => {
    const jobId = parseInt(req.body.jobId);
    const skillId = parseInt(req.body.skillId);

    //console.log(`Received jobId: ${jobId}, skillId: ${skillId}`);

    if (isNaN(jobId) || isNaN(skillId)) {
      res.status(400).json({ error: "Invalid Job ID or Skill ID" });
      return;
    }
    

    const checkResult = await pool.query(
      'SELECT * FROM job_skill WHERE "jobId" = $1 AND "skillId" = $2',
      [jobId, skillId]
    );

    if (checkResult.rows.length > 0) {
      res
        .status(409)
        .json({ message: "Skill already associated with this job" });
        return;
    }
   

    const result = pool.query(
      'INSERT INTO job_skill ("jobId", "skillId") VALUES ($1, $2) RETURNING *',
  [jobId, skillId]
    );
    res.status(201).json((await result).rows[0]);
    return;
  }
);

export const getSkillsForJob = asyncHandler(async(req:Request,res:Response)=> {
    const jobId = parseInt(req.params.jobId)
    if (isNaN(jobId)) {
         res.status(400).json({ error: 'Invalid job ID' });
         return;
      }
      const result = await pool.query(
        `SELECT s.id AS skill_id, s.name AS skill_name 
         FROM job_skill js 
         JOIN skill s ON js."skillId" = s.id 
         WHERE js."jobId" = $1`,
        [jobId]
      );
      
      res.status(200).json(result.rows);
      return;

      

})


export const removeSkillFromJob = asyncHandler(async(req:Request,res:Response)=> {
    const jobId = parseInt(req.params.jobId);
    const skillId = parseInt(req.params.skillId);
  
    if (isNaN(jobId) || isNaN(skillId)) {
       res.status(400).json({ error: 'Invalid job ID or skill ID' });
       return;
    }
    const result = await pool.query('DELETE FROM job_skill WHERE job_id = $1 AND skill_id = $2 RETURNING job_id, skill_id',
      [jobId, skillId]);
      if (result.rows.length > 0) {
        res.status(200).json({ message: `Skill ${skillId} removed from job ${jobId}` });
      } else {
        res.status(404).json({ message: 'Association not found' });
      }

});

