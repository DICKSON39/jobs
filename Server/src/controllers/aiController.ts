import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

import { User } from "../entity/User";
import { Application } from "../entity/Apllication";
import { Job } from "../entity/Job";
import { AppDataSource } from "../config/data-source";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const aiPrompt = asyncHandler(async (req: Request, res: Response) => {
  const { question } = req.body;

  try {
    // Fetch all user data from the database
    const allUsers = await AppDataSource.getRepository(User).find({
      relations: ["role", "skills"],
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });

    // Fetch all application data from the database
    const allApplications = await AppDataSource.getRepository(Application).find({
      relations: ["user", "job"],
      select: {
        id: true,
        user: {
          id: true,
          name: true,
          email: true,
        },
        job: {
          id: true,
          title: true,
          description: true,
        },
        status: true,
        matchScore: true,
        appliedAt: true,
      },
    });

    // Fetch all job data from the database
    const allJobs = await AppDataSource.getRepository(Job).find({
      relations: ["recruiter", "skills", "applications"],
      select: {
        id: true,
        title: true,
        description: true,
        company: true,
        postedAt: true,
        recruiter: {
          id: true,
          name: true,
          email: true,
        },skills: {
          id: true,
          skill: { // Access Skill related properties
            id: true,
            name: true, // Assuming `Skill` has a `name` property
          },
        },
        
        applications: {
          id: true,
          user: {
            id: true,
            name: true,
          },
          status: true,
          matchScore: true,
        },
      },
    });

    // Prepare the prompt with the fetched data
    const prompt = `
      I have the following user, job, and application data:

      Users:
      ${JSON.stringify(allUsers, null, 2)}

      Jobs:
      ${JSON.stringify(allJobs, null, 2)}

      Applications:
      ${JSON.stringify(allApplications, null, 2)}

      Here is a question about this data: ${question}

      Please provide a concise answer to the question. If the question asks for information about specific users, jobs, or applications, identify those from the provided data and include their relevant details in your answer. Avoid suggesting deletions or updates.
    `;

    // Call the AI model
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiTextResponse = response.text();

    // Clean the AI's text response
    const cleanedResponse = cleanResponse(aiTextResponse);

    let relevantUsers: User[] = [];
    let relevantJobs: Job[] = [];
    let relevantApplications: Application[] = [];

    // Extraction logic
    const extractionPrompt = `Based on the following user, job, and application data:

    Users:
    ${JSON.stringify(allUsers, null, 2)}

    Jobs:
    ${JSON.stringify(allJobs, null, 2)}

    Applications:
    ${JSON.stringify(allApplications, null, 2)}

    And the AI's answer: "${cleanedResponse}"

    Identify any users, jobs, or applications mentioned in the AI's answer and return their details as a JSON array of user, job, or application objects. If none are mentioned, return an empty array.`;

    const extractionResult = await model.generateContent(extractionPrompt);
    const extractionResponse = await extractionResult.response;
    const extractionText = extractionResponse.text();

    try {
      // Attempt to parse the AI's extracted data
      const extractedData = JSON.parse(extractionText);
      relevantUsers = extractedData.filter((item: any) => item.type === "user");
      relevantJobs = extractedData.filter((item: any) => item.type === "job");
      relevantApplications = extractedData.filter((item: any) => item.type === "application");
    } catch (error) {
      console.error("Error parsing extracted data:", error);
      relevantUsers = [];
      relevantJobs = [];
      relevantApplications = [];
    }

    // Send back the question, the AI's text response, and the relevant users, jobs, and applications
    res.status(200).json({
      question,
      aiResponse: cleanedResponse,
      data: [...relevantUsers, ...relevantJobs, ...relevantApplications],
    });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Failed to process user question" });
  }
});

// Function to clean the response text
const cleanResponse = (text: string) => {
  let cleanedText = text.replace(/[/*]/g, '');
  cleanedText = cleanedText.trim();
  cleanedText = cleanedText.replace(/\n+/g, '\n').replace(/\s+/g, ' ');
  return cleanedText;
};
