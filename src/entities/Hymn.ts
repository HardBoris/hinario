import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("hymns")
export class Hymn {
  @PrimaryGeneratedColumn("uuid")
  hymnId?: string;

  @Column()
  hymnTitle: string;

  @Column()
  hymnNumber: string;

  @Column()
  hymnUrl: string;
}
