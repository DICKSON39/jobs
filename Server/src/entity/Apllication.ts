import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn,JoinColumn
} from "typeorm";
import { User } from "./User";
import { Job } from "./Job";

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: "user_id" }) // ✅ snake_case
  user!: User;

  @ManyToOne(() => Job, (job) => job.applications)
  @JoinColumn({ name: "job_id" }) // ✅ snake_case
  job!: Job;

  @Column({ type: "varchar", default: "pending" })
  status!: "pending" | "accepted" | "rejected";

  @Column({ type: "float", nullable: true })
  matchScore?: number;

  @CreateDateColumn()
  appliedAt!: Date;
}
