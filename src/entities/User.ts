import { compare } from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.password);
  };
}
