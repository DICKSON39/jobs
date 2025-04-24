import jwt from 'jsonwebtoken';
import pool from '../../config/db.config';
import { UserRequest } from '../../utils/types/user';
import { asyncHandler } from '../asyncHandler';
import { Request, Response, NextFunction } from "express";
export const protect = asyncHandler(async(req:UserRequest,res:Response,next:NextFunction)=> {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
}

if (!token && req.cookies?.access_token) {
    token = req.cookies.access_token;
}

if (!token) {
    console.error(" No token found");
    return res.status(401).json({ message: "Not authorized, no token" });
}

try {
    //console.log("🔹 Token received:", token);

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; roleId: number };

    //console.log("✅ Token decoded:", decoded);

    const userQuery = await pool.query(
        `SELECT user.id, user.name, user.email, user.role_id, ur.role_name
         FROM user 
         JOIN user_role ur ON user.role_id = ur.role_id 
         WHERE user.user_id = $1`,
        [decoded.userId]
    );
    

    if (userQuery.rows.length === 0) {
        return res.status(401).json({ message: "User not found" });
    }

    req.user = userQuery.rows[0];
    next();
} catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ message: "Not authorized, token failed" });
}
});