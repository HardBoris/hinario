import { hashSync } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export class initialMig1664924668971 implements MigrationInterface {
  name = "initialMig1664924668971";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`
    );
    await queryRunner.query(`
            INSERT INTO "users" ("email", "isAdmin", "password")
            VALUES ('${process.env.ADMIN_EMAIL}', true, '${hashSync(
      process.env.ADMIN_PASSWORD,
      10
    )}')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
