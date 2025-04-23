import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Application } from "./Apllication";


@Entity()
export class Interview {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Application)
  @JoinColumn({ name: 'application_id' })
  application!: Application;

  @Column()
  scheduledDate!: Date;

  @Column({ type: "varchar", default: "scheduled" })
  status!: "scheduled" | "completed" | "cancelled";

  @Column("text", { nullable: true })
  notes?: string;
}
