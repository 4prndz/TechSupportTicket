import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTicketTable1711264217710 implements MigrationInterface {
    name = 'CreateTicketTable1711264217710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tickets_status_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TYPE "public"."tickets_priority_enum" AS ENUM('HIGH', 'MEDIUM', 'LOW')`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."tickets_status_enum" NOT NULL DEFAULT '1', "priority" "public"."tickets_priority_enum" NOT NULL DEFAULT 'LOW', "deadLine" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_status_enum"`);
    }

}
