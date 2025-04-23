import { config } from 'dotenv';
import 'reflect-metadata';
import {DataSource} from 'typeorm';
import { User } from '../entity/User';
import { Application } from '../entity/Apllication';
import { CV } from '../entity/CV';
import { Skill } from '../entity/Skill';
import { Job } from '../entity/Job';
import { Portfolio } from '../entity/Portfolio';
import { Role } from '../entity/Roles';
import { UserSkill } from '../entity/UserSkill';
import { JobSkill } from '../entity/JobSkill';
import { CareerPathRecommendation } from '../entity/CareerPathRecommendation';
import { Interview } from '../entity/Interview';

config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: "database-1.c69ueskes3lz.us-east-1.rds.amazonaws.com",
    port:parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging:false,
    // dropSchema:true,
    ssl: {
        rejectUnauthorized:false
    },
    entities: [User,Application,CV,Skill,Job,Portfolio,Role,UserSkill,JobSkill,CareerPathRecommendation,Interview],
    migrations: []
});

