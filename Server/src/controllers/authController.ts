import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/helpers/generateToken';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity/User';
import { Role } from '../entity/Roles';
import { Request,Response,NextFunction } from 'express';

const authRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);

export class AuthController {
    //Registering an User;=>>
    async RegisterUser(req: Request, res: Response) {
      try {
        const { name, email, password, role_id } = req.body;
  
        const parsedRoleId = parseInt(role_id, 10);
        if (isNaN(parsedRoleId)) {
           res.status(400).json({ message: "Invalid role_id" });
           return
        }
  
        const existingUser = await authRepository.findOneBy({ email });
        if (existingUser) {
           res.status(400).json({ message: "User already exists" });
           return
        }
  
        const role = await roleRepository.findOneBy({ id: parsedRoleId });
        if (!role) {
           res.status(404).json({ message: "Role not Found" });
           return
        }
  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        const newUser = authRepository.create({
          name,
          email,
          password: hashedPassword,
          role,
        });
  
        await authRepository.save(newUser);
        generateToken(res, newUser.id.toString(), newUser.role.id);
  
        // Remove password before sending response
        const { password: _, ...userWithoutPassword } = newUser;
  
         res.status(201).json({ message: "User Created", user: userWithoutPassword });
         return
  
      } catch (error: any) {
         res.status(500).json({ error: error.message });
         return
      }
    }

    // Login User
  // Login User
async LoginUser(req: Request, res: Response) {
   try {
     const { email, password } = req.body;
 
     const user = await authRepository.findOne({
       where: { email },
       relations: ['role'],
     });
 
     if (!user) {
        res.status(404).json({ message: "User not found" });
        return
     }
 
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
        return
     }
 
     // Get the tokens from generateToken
     const { accessToken, refreshToken } = generateToken(res, user.id.toString(), user.role.id);
 
     const { password: _, ...userWithoutPassword } = user;
 
      res.status(200).json({
       message: "Login successful",
       token: accessToken, // 🔥 Send token back explicitly
       user: userWithoutPassword
     });
     return;
   } catch (error: any) {
      res.status(500).json({ error: error.message });

      return;
   }
 }
 

  async logoutUser(req:Request,res:Response) {
   res.cookie("access_token", "", {
      httpOnly:true,
      secure:process.env.NODE_ENV !== "development",
      sameSite: "strict",
      expires:new Date(0) //Expires immediately
   
  });
  


  res.cookie("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      expires: new Date(0) // Expire immediately
  });

  res.status(200).json({ message: "User logged out successfully" });
  }
  


  }
  