import { assert } from "node:test";
import pool from "../config/db.config";
import { Job, JobRequest } from "../utils/types/job";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request,Response } from "express";

export const addJob = asyncHandler(async(req:JobRequest,res:Response)=> {
    const{title,description,company,recruiterId} = req.body;

    const result = await pool.query(
        "INSERT INTO job (title,description,company,recruiterId) VALUES ($1,$2,$3,$4) RETURNING *",
        [title,description,company,recruiterId]
    );

    const newJob = result.rows[0];

    res.status(201).json({
        message: "Job Created Successfully ",
        job:newJob,
    })

})


export const getAllJobs = asyncHandler(async(req:Request,res:Response)=> {
    const result = await pool.query("SELECT * FROM jobs");
    res.status(200).json(result.rows)
})


export  const updateJob = asyncHandler(async(req:Request,res:Response)=> {
    const jobId = parseInt(req.params.id);
    const{title,description,company,recruiterId} = req.body;

    const result = await pool.query(
        "UPDATE jobs SET title=$1,description=$2,company=$3,"
    )
    
})

