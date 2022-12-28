import { compare } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";
import { History } from "./History";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId?: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: "basic" })
  userCategory: string;

  @Column()
  password: string;

  @Column()
  userName?: string;

  @OneToMany(() => History, (history) => history.user, { lazy: true })
  history: History;

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.password);
  };
}
