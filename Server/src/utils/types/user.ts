import { Request } from "express";


export interface User {
    id:number;
    name:string;
    email:string;
    password:string;
    created_at?:Date;
    role_id:number;
}

export interface UserRequest extends Request {
    user?: User
}