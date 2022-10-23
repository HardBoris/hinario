import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("hymns")
export class Hymn {
  @PrimaryGeneratedColumn("uuid")
  hymnId?: string;

  @Column({ nullable: true })
  hymnTitle?: string;

  @Column()
  hymnNumber: string;

  @Column()
  hymnUrl: string;

  @Column({ nullable: true })
  hymnAuthor?: string;

  @Column({ nullable: true })
  hymnComposer?: string;

  @Column({ nullable: true })
  originalTitle?: string;
}
