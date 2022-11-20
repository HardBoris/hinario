import { Entity, PrimaryColumn, Column } from "typeorm";
import { AppDataSource } from "../data-source";
// import hymnal100 from "../hinario/hymnal100.json"

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
