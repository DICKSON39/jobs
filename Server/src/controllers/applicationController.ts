import pool from "../config/db.config";
import { asyncHandler } from "../middlewares/asyncHandler";
import { Request,Response,NextFunction, application } from "express";
import { UserRequest } from "../utils/types/user";
import { User } from "../entity/User";

export const Application = asyncHandler(async(req:UserRequest,res:Response,next:NextFunction)=> {
   if (!req.user) {
    res.status(401).json({message: "Not authorized!"})
    return
   }

   const {userId} = req.body
   const {jobId} = req.params

   const result = await pool.query("INSERT INTO application (user_id) VALUES($1) RETURNING*",[userId,jobId]);

   const application = result.rows[0];
   res.status(201).json({
    message: "Application submitted succesfully",
    application,
   })
   return


})

export const getApplication = asyncHandler(async(req:Request,res:Response)=> {
    // if (!req.user) {
    //     res.status(401).json({message: "Not authorized!"})
    //    }
    const result = await pool.query("SELECT * FROM application ORDER BY id ASC")     
    res.status(200).json({
        message: "Applications Available",
        applications: result.rows[0]
    })
    return
})

