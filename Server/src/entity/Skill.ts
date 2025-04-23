import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { UserSkill } from "./UserSkill";
import { JobSkill } from "./JobSkill";


@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => UserSkill, userSkill => userSkill.skill)
  userSkills!: UserSkill[];

  @OneToMany(() => JobSkill, jobSkill => jobSkill.skill)
  jobSkills!: JobSkill[];
}
