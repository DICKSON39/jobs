import express from "express";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import morgan from "morgan";
import portfolioRoutes from './routes/portfolio.routes'
import { Role } from "./entity/Roles";
import authRoutes from "./routes/auth.routes";
import applicationRoutes from './routes/application.routes'
import skillRoutes from "./routes/skill.routes";
import jobSkillRoutes from './routes/jobSkill.routes'
import careerPathRoutes from './routes/careerPath.routes'
import cvRoutes from './routes/cv.routes';
import jobRoutes from './routes/job.routes'
import interviewroutes from './routes/interview.routes'
import userSkillRoutes from './routes/userskill.routes'
import { createDefaultRoles } from "./seeders/roleSeeder";

dotenv.config();
const app = express();
const PORT = 3000;


app.use(cors({
  origin:"http://localhost:4200",
  credentials:true,
  methods: ["GET","POST","PUT","DELETE","PATCH"],
  
}));
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1",applicationRoutes);
app.use("/api/v1",skillRoutes);
app.use("/api",jobSkillRoutes);;
app.use("/api",portfolioRoutes);
app.use('/api/v1',careerPathRoutes);
app.use('/api/v1',cvRoutes);
app.use('/api',interviewroutes)
app.use('/api', userSkillRoutes);
app.use('/api',jobRoutes);
AppDataSource.initialize().then(async () => {
  console.log(`Data source has been initialized`);

  await createDefaultRoles();
  
  
 app.listen(PORT,() =>
   console.log(`✅✅Port is running at ${PORT}`)

)
 
});

