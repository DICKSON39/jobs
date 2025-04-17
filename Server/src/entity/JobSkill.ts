import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Job } from "./Job";
import { Skill } from "./Skill";

@Entity()
export class JobSkill {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Job, (job) => job.skills)
  job!: Job;

  @ManyToOne(() => Skill, (skill) => skill.jobSkills)
  skill!: Skill;
}
