import { assert } from "node:test";
import pool from "../config/db.config";
import { Job, JobRequest } from "../utils/types/job";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request,Response } from "express";

export const addJob = asyncHandler(async(req:JobRequest,res:Response)=> {
    const{title,description,company,recruiterId} = req.body;
    

    const result = await pool.query(
        "INSERT INTO job (title,description,company,recruiterid) VALUES ($1,$2,$3,$4) RETURNING *",
        [title,description,company,recruiterId]
    );

    const newJob = result.rows[0];

    res.status(201).json({
        message: "Job Created Successfully ",
        job:newJob,
    })

})


export const getAllJobs = asyncHandler(async(req:Request,res:Response)=> {
  console.log("Jobs fetched")
    const result = await pool.query("SELECT * FROM job");
    res.status(200).json(result.rows)
})


export const updateJob = asyncHandler(async (req: Request, res: Response) => {
    const jobId = parseInt(req.params.id);
    const { title, description, company, recruiterId } = req.body;
  
    const result = await pool.query(
      `UPDATE job 
       SET title = $1, description = $2, company = $3, recruiterid = $4 
       WHERE id = $5 
       RETURNING *`,
      [title, description, company, recruiterId, jobId]
    );
  
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }
  
    const updatedJob = result.rows[0];
  
    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  });
  

  export const updateJobTitle = asyncHandler(async (req: Request, res: Response) => {
    const jobId = parseInt(req.params.id);
    const { title } = req.body;
  
    const result = await pool.query(
      `UPDATE job SET title = $1 WHERE id = $2 RETURNING *`,
      [title, jobId]
    );
  
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }
  
    res.status(200).json({
      message: "Title updated successfully",
      job: result.rows[0],
    });
  });
  

export const getJobById = asyncHandler(async(req:Request,res:Response)=> {
  console.log("getJobById hit with ID:", req.params.id);
    const jobId = req.params.id;

    const result = await pool.query("SELECT * FROM job WHERE id = $1", [jobId]);
    if (result.rows.length === 0) {
       res.status(404).json({ message: 'Job not found' });
       return
    }
    res.status(200).json(result.rows[0]); 
    return
})
