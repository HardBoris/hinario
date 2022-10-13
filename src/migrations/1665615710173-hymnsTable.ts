import { MigrationInterface, QueryRunner } from "typeorm";

export class hymnsTable1665615710173 implements MigrationInterface {
    name = 'hymnsTable1665615710173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hymns" ("hymnId" uuid NOT NULL DEFAULT uuid_generate_v4(), "hymnTitle" character varying NOT NULL, "hymnNumber" character varying NOT NULL, "hymnUrl" character varying NOT NULL, "hymnAuthor" character varying, "hymnComposer" character varying, "originalTitle" character varying, CONSTRAINT "PK_4d11347e7f582a8d6b12cbdd397" PRIMARY KEY ("hymnId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hymns"`);
    }

}
