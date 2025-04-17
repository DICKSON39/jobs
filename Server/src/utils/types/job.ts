// types.ts

import { User } from "./user";
import { Request } from "express";

export interface Job {
  id?: number; // optional for create
  title: string;
  description: string;
  recruiterId: number;

  company: string;
}

export interface JobRequest extends Request {
  user?: User;
}
