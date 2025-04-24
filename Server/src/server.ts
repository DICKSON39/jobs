import express from "express";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import morgan from "morgan";
import portfolioRoutes from "./routes/portfolio.routes";
import { Role } from "./entity/Roles";
import authRoutes from "./routes/auth.routes";
import applicationRoutes from "./routes/application.routes";
import skillRoutes from "./routes/skill.routes";
import jobSkillRoutes from "./routes/jobSkill.routes";
import careerPathRoutes from "./routes/careerPath.routes";
import cvRoutes from "./routes/cv.routes";
import jobRoutes from "./routes/job.routes";
import interviewroutes from "./routes/interview.routes";
import userSkillRoutes from "./routes/userskill.routes";
import { createDefaultRoles } from "./seeders/roleSeeder";
import analysisRoutes from "./routes/analysis.routes";
import careerSuggestions from './routes/aiSuggestion.routes'

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
  'http://localhost:4200',
  'http://dicksonndumia.s3-website-us-east-1.amazonaws.com'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// ... your other routes, including app.get('/api/jobs', ...);
app.use(express.json());
app.use(morgan("dev"));

// Log incoming requests (for debugging)
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

// Routes with clear and unique prefixes
app.use("/api/v1/users", userRoutes);                // /users/*
app.use("/api/v1/auth", authRoutes);                 // /auth/*
app.use("/api/v1/applications", applicationRoutes);  // /applications/*
app.use("/api/v1/skills", skillRoutes);              // /skills/*
app.use("/api/v1/job-skills", jobSkillRoutes);       // /job-skills/*
app.use("/api/v1/portfolios", portfolioRoutes);      // /portfolios/*
app.use("/api/v1/career-paths", careerPathRoutes);   // /career-paths/*
app.use("/api/v1/cv", cvRoutes);                     // /cv/*
app.use("/api/v1/interviews", interviewroutes);      // /interviews/*
app.use("/api/v1/user-skills", userSkillRoutes);     // /user-skills/*
app.use("/api", jobRoutes);                  // /jobs/*
app.use("/api/v1/analysis", analysisRoutes);         // /analysis/*
app.use('/api/v1',careerSuggestions)



app.use("/api/v1/analysis", analysisRoutes);
AppDataSource.initialize().then(async () => {
  console.log(`Data source has been initialized`);

  await createDefaultRoles();

  app.listen(3000, '0.0.0.0', () => console.log(`✅✅Port 👌👌👌is running at 3000`));
});
