import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("hymns")
export class Hymn {
  @PrimaryGeneratedColumn()
  hymnId: string;

  @Column()
  hymnNumber: string;

  @Column({ nullable: true })
  hymnTitle: string;

  @Column({ nullable: true })
  hymnAuthor?: string;

  @Column({ nullable: true })
  hymnComposer?: string;

  @Column({ nullable: true })
  originalTitle?: string;
}
