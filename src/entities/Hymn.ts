import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("hymns")
export class Hymn {
  @PrimaryColumn()
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
