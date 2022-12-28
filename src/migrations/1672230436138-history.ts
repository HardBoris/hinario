import { MigrationInterface, QueryRunner } from "typeorm";

export class history1672230436138 implements MigrationInterface {
  name = "history1672230436138";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "history" ("histId" uuid NOT NULL DEFAULT uuid_generate_v4(), "hymnId" character varying NOT NULL, "isFavorite" boolean NOT NULL DEFAULT false, "playedAt" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, CONSTRAINT "PK_2f2319ead338c353565df4d1475" PRIMARY KEY ("histId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "userName" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "history" ADD CONSTRAINT "FK_d7a3045a54c116c024c54ffc035" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "history" DROP CONSTRAINT "FK_d7a3045a54c116c024c54ffc035"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
    await queryRunner.query(`DROP TABLE "history"`);
  }
}
