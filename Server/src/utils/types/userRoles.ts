import { Request } from "express";
export interface UserRole {
    id:number;
    roleName:string;
    
}

export interface RoleRequest extends Request {
    user?: {
        id:string;
        name:string;
        email:string;
        role_id:string;
        roleName:string;
       
    }
}
