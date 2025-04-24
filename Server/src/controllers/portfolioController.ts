import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import { Application } from "../entity/Apllication";
import { Job } from "../entity/Job";
import { Skill } from "../entity/Skill";
import { UserSkill } from "../entity/UserSkill";
import { JobSkill } from "../entity/JobSkill";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const aiPrompt = asyncHandler(async (req: Request, res: Response) => {
  const { question } = req.body;

  try {
    const [users, applications, jobs, skills, userSkills, jobSkills] = await Promise.all([
      AppDataSource.getRepository(User).find({ relations: ["role", "skills"] }),
      AppDataSource.getRepository(Application).find({ relations: ["user", "job"] }),
      AppDataSource.getRepository(Job).find({ relations: ["recruiter", "skills", "applications"] }),
      AppDataSource.getRepository(Skill).find({ relations: ["userSkills", "jobSkills"] }),
      AppDataSource.getRepository(UserSkill).find({ relations: ["user", "skill"] }),
      AppDataSource.getRepository(JobSkill).find({ relations: ["job", "skill"] }),
    ]);

    const prompt = `
I have the following data:

Users:
${JSON.stringify(users, null, 2)}

Skills:
${JSON.stringify(skills, null, 2)}

User Skills:
${JSON.stringify(userSkills, null, 2)}

Job Skills:
${JSON.stringify(jobSkills, null, 2)}

Jobs:
${JSON.stringify(jobs, null, 2)}

Applications:
${JSON.stringify(applications, null, 2)}

Question: "${question}"

Using this data, suggest a career path for the user if asked. Consider skills and experience (from UserSkill) to match them with appropriate JobSkill requirements. Return clear, structured advice.
    `;

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiTextResponse = response.text();

    res.status(200).json({
      question,
      aiResponse: cleanResponse(aiTextResponse),
    });

  } catch (error) {
    console.error("AI Prompt Error:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

const cleanResponse = (text: string) => {
  return text.replace(/[/*]/g, '').trim().replace(/\n+/g, '\n').replace(/\s+/g, ' ');
};
