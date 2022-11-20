import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AppDataSource } from "../data-source";
// import hymnal100 from "../hinario/hymnal100.json"

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

  inserta = async () =>
    await AppDataSource.createQueryBuilder()
      .insert()
      .into("hymns")
      .values([
        { hymnId: "prueba", hymnNumber: "456", hymnTitle: "titulo de prueba" },
      ])
      .execute();
}
