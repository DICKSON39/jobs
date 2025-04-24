import pool from "../config/db.config";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request,Response,NextFunction, application } from "express";
import { UserRequest } from "../utils/types/user";
import { User } from "../entity/User";

export const Application = asyncHandler(async(req:UserRequest,res:Response,next:NextFunction)=> {
//    if (!req.user) {
//     res.status(401).json({message: "Not authorized!"})
//     return
//    }

   const {userId }= req.body;
   const {jobId} = req.params;

   
  if (!userId || !jobId) {
    return res.status(400).json({ message: "Missing userId or jobId" });
  }

   const result = await pool.query("INSERT INTO application (user_id,job_id) VALUES($1,$2) RETURNING*",[userId,jobId]);

   const application = result.rows[0];
   res.status(201).json({
    message: "Application submitted succesfully",
    application,
   })
   return


})


export const getApplication = asyncHandler(async (req: Request, res: Response) => {
  const result = await pool.query(`
      SELECT 
          application.id,
          application.status,
          "application"."appliedAt",
          "user".name AS user_name,
          "user".email AS user_email,
          job.title AS job_title
      FROM application
      JOIN "user" ON application.user_id = "user".id
      JOIN job ON application.job_id = job.id
      ORDER BY application.id ASC
  `)

  res.status(200).json({
      message: "Applications Available",
      applications: result.rows
  })
  return;
})

export const getApplicationsByUserId = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const parsedUserId = parseInt(userId, 10);
  if (isNaN(parsedUserId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  try {
    const result = await pool.query(
      "SELECT * FROM application WHERE user_id = $1",
      [parsedUserId]
    );
    

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
