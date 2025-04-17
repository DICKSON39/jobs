import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Job } from "./Job";

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.applications)
  user!: User;

  @ManyToOne(() => Job, (job) => job.applications)
  job!: Job;

  @Column({ type: "varchar", default: "pending" })
  status!: "pending" | "accepted" | "rejected";

  @Column({ type: "float", nullable: true })
  matchScore?: number;

  @CreateDateColumn()
  appliedAt!: Date;
}
