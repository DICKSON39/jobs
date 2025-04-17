import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";
import { Skill } from "./Skill";

@Entity()
export class UserSkill {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.skills)
  user!: User;

  @ManyToOne(() => Skill, skill => skill.userSkills)
  skill!: Skill;

  @Column({ type: "int", nullable: true })
  yearsExperience?: number;
}
