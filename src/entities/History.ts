import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity("history")
export class History {
  @PrimaryGeneratedColumn("uuid")
  histId?: string;

  @Column()
  hymnId: string;

  @Column({ default: false })
  isFavorite: boolean;

  @CreateDateColumn()
  playedAt: Date;

  @ManyToOne(() => User, (user) => user.history)
  user: User;
}
