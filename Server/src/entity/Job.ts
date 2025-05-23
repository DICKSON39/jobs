import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, OneToMany,
  JoinColumn
} from "typeorm";
import { User } from "./User";

import { Application} from "./Apllication";
import { JobSkill } from "./JobSkill";


@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column()
  company!: string;

  @CreateDateColumn()
  postedAt!: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'recruiterid' }) // lowercase to match PostgreSQL
  recruiter!: User;
  

  @OneToMany(() => JobSkill, (jobSkill) => jobSkill.job)
  skills!: JobSkill[];

  @OneToMany(() => Application, (application) => application.job)
  applications!: Application[];
}
