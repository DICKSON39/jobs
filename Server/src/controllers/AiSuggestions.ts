import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { User } from "../entity/User";
import { UserSkill } from "../entity/UserSkill";
import { AppDataSource } from "../config/data-source";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const suggestCareerPaths = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.body;

    try {
      // Fetch user and their skills
      const user = await AppDataSource.getRepository(User).findOne({
        where: { id: userId },
        relations: ["skills", "skills.skill"],
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const skillSummary = user.skills.map((us: UserSkill) => ({
        name: us.skill.name,
        yearsExperience: us.yearsExperience ?? 0,
      }));

      const prompt = `
        I have a user with the following skills and experience:

        ${JSON.stringify(skillSummary, null, 2)}

        Based on this, suggest 3-5 suitable career paths for them.
        Format your response as a JSON array of string career suggestions only.
      `;

      const model = genAI.getGenerativeModel({
        model: "models/gemini-1.5-flash",
      });
      const result = await model.generateContent(prompt);
      const rawText = result.response.text();

      console.log("🔍 RAW GEMINI RESPONSE:", rawText);

      const cleanedText = cleanAIResponse(rawText);
      console.log("🧼 CLEANED FOR PARSING:", cleanedText);

      let suggestions: string[] = [];

      try {
        suggestions = JSON.parse(cleanedText);

        // Optional: Validate that it's an array of strings
        if (
          !Array.isArray(suggestions) ||
          !suggestions.every((item) => typeof item === "string")
        ) {
          throw new Error("Parsed result is not an array of strings");
        }
      } catch (parseError: any) {
        console.error("❌ JSON parse failed:", parseError.message);
        res.status(200).json({
          query: skillSummary, // Representing the 'question' as the user's skills
          aiResponse: rawText,
          data: [],
          warning: "AI response could not be parsed. No suggestions available.",
        });
        return;
      }

      res.status(200).json({
        query: skillSummary, // Representing the 'question' as the user's skills
        aiResponse: rawText,
        data: suggestions.map(suggestion => ({ type: "career_suggestion", suggestion })),
      });
      return
    } catch (err: any) {
      console.error("🔥 Error generating suggestions:", err.message);
      return res
        .status(500)
        .json({
          error: "Failed to generate career suggestions",
          details: err.message,
        });
    }
  }
);

// Helper to clean and extract only the JSON array from Gemini response
const cleanAIResponse = (text: string): string => {
    let cleanedText = text.replace(/```(json)?\n?/g, ''); // Remove ``` and optional "json" and newline
    cleanedText = cleanedText.replace(/```/g, '');       // Remove any remaining ```
    cleanedText = cleanedText.replace(/[/*]/g, '');
    cleanedText = cleanedText.trim();
    cleanedText = cleanedText.replace(/\n+/g, '\n').replace(/\s+/g, ' ');
    return cleanedText;
  };
  