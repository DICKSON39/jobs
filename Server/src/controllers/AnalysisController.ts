import pool from '../config/db.config'
import { Response,Request,NextFunction } from 'express'
import { asyncHandler } from '../middlewares/asyncHandler'


export const getDashboardStats = asyncHandler(async(req:Request,res:Response)=> {
    console.log("📊 Dashboard stats endpoint hit!");
    const jobsResult = await pool.query("SELECT COUNT(*) AS total_jobs FROM job;")
    const applicationsResult = await pool.query("SELECT COUNT(*) AS total_applications FROM application")
    const usersResult = await pool.query('SELECT COUNT(*) FROM public.user');
    const skillsResult = await pool.query('SELECT COUNT(*) FROM skill');

    res.json({
        totalJobs: parseInt(jobsResult.rows[0].total_jobs),
        totalApplications: parseInt(applicationsResult.rows[0].total_applications),
        totalUsers: parseInt(usersResult.rows[0].count),
        totalSkills: parseInt(skillsResult.rows[0].count),
      });
      
    return;
})

