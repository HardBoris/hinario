import { MigrationInterface, QueryRunner } from "typeorm";

export class hymnsTable1665334672992 implements MigrationInterface {
    name = 'hymnsTable1665334672992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hymns" ("hymnId" uuid NOT NULL DEFAULT uuid_generate_v4(), "hymnTitle" character varying NOT NULL, "hymnNumber" character varying NOT NULL, "hymnUrl" character varying NOT NULL, CONSTRAINT "PK_4d11347e7f582a8d6b12cbdd397" PRIMARY KEY ("hymnId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hymns"`);
    }

}
