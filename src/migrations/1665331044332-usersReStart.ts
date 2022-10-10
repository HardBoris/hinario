import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export class usersReStart1665331044332 implements MigrationInterface {
  name = "usersReStart1665331044332";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "userCategory" character varying NOT NULL DEFAULT 'basic', "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`
    );
    await queryRunner.query(`
                INSERT INTO "users" ("email", "userCategory", "password")
                VALUES ('${process.env.OWNER_EMAIL}', 'owner', '${hashSync(
      process.env.OWNER_PASSWORD,
      10
    )}')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
