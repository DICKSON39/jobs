// entities/User.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Application } from "./Apllication";
import { Portfolio } from "./Portfolio";
import { CV } from "./CV";
import { Role } from "./Roles";
import { UserSkill } from "./UserSkill";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Application, (application) => application.user)
  applications!: Application[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios!: Portfolio[];

  @OneToMany(() => CV, (cv) => cv.user)
  cvs!: CV[];

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
skills!: UserSkill[];

}
