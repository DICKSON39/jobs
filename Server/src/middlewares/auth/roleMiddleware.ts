import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../asyncHandler";
import { RoleRequest } from "../../utils/types/userRoles";


export const roleGuard = (allowedRoles:string[]) => 
    asyncHandler<void,RoleRequest>(async(req:RoleRequest,res:Response,next:NextFunction)=> {
    if(!req.user || !allowedRoles.includes(req.user.roleName)) {
        res.status(403).json({ message: "Access denied: Insufficient permissions" });
            return;
    }
    next();
});


export const ADMIN = roleGuard(['ADMIN']);
export const JOBSEEKER = roleGuard(['JOB_SEEKER']);
export const RECRUITER = roleGuard(["RECRUITER"]);



