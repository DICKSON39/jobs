// entities/CV.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class CV {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.cvs)
  user!: User;

  @Column()
  file_url!: string;

  @Column({ type: "text", nullable: true })
  extracted_text!: string;

  @CreateDateColumn()
  uploaded_at!: Date;
}
