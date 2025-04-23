import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  roleName!: string;

  @Column()
position!: number;


  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
