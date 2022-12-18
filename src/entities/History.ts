import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("history")
export class History {
  @PrimaryGeneratedColumn("uuid")
  histId: string;

  @Column()
  hymnId: string;

  @Column({ default: false })
  isFavorite: boolean;

  @CreateDateColumn()
  playedAt: Date;

  @OneToOne(() => User, (user) => user.history)
  @JoinColumn()
  user: User;
}
