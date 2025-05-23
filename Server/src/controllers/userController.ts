import express, { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { Role } from '../entity/Roles';
import pool from '../config/db.config';

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);

export class UserController {
  

    async getUsers(req:Request,res:Response) {
        try {
            const user = await userRepository.find({relations: ['role']});
            const withoutPassword = user.map(({password,...user})=> user)
            res.status(200).json(withoutPassword)
        } catch (error:any) {
            res.status(500).json({ error: error.message });
        }
    }

   // Delete a user by ID
   async deleteUser(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params.id); // Get user ID from request params

        // Ensure the user ID is valid
        if (isNaN(userId)) {
             res.status(400).json({ message: 'Invalid user ID' });
             
        }

        // Find the user by ID
        const user = await userRepository.findOne({ where: { id: userId } });
        

        // If user not found, return a 404 response
        if (!user) {
             res.status(404).json({ message: 'User not found' });
             
        }
        

        // Delete the user
        await userRepository.remove(user);

        // Return success response
         res.status(200).json({ message: 'User deleted successfully' });
         
    } catch (error: any) {
        console.error('Error deleting user:', error);
         res.status(500).json({ message: 'Internal Server Error' });
         
    }
}

    

}


export const getUserProfile = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
  
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
  
    try {
        const result = await pool.query(
            `SELECT "id", "name", "email", "role_id", "created_at" FROM "user" WHERE "id" = $1`,
            [userId])
            
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
        return;
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };


 




