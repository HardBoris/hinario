import { MigrationInterface, QueryRunner } from "typeorm";

export class hymnsTableAltered1668707436907 implements MigrationInterface {
    name = 'hymnsTableAltered1668707436907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hymns" DROP COLUMN "hymnUrl"`);
        await queryRunner.query(`ALTER TABLE "hymns" DROP CONSTRAINT "PK_4d11347e7f582a8d6b12cbdd397"`);
        await queryRunner.query(`ALTER TABLE "hymns" DROP COLUMN "hymnId"`);
        await queryRunner.query(`ALTER TABLE "hymns" ADD "hymnId" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hymns" ADD CONSTRAINT "PK_4d11347e7f582a8d6b12cbdd397" PRIMARY KEY ("hymnId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hymns" DROP CONSTRAINT "PK_4d11347e7f582a8d6b12cbdd397"`);
        await queryRunner.query(`ALTER TABLE "hymns" DROP COLUMN "hymnId"`);
        await queryRunner.query(`ALTER TABLE "hymns" ADD "hymnId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "hymns" ADD CONSTRAINT "PK_4d11347e7f582a8d6b12cbdd397" PRIMARY KEY ("hymnId")`);
        await queryRunner.query(`ALTER TABLE "hymns" ADD "hymnUrl" character varying NOT NULL`);
    }

}
