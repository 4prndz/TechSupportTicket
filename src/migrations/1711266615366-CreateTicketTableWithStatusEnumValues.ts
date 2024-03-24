import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTicketTableWithStatusEnumValues1711266615366 implements MigrationInterface {
    name = 'CreateTicketTableWithStatusEnumValues1711266615366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tickets_status_enum" AS ENUM('CLOSE', 'OPEN')`);
        await queryRunner.query(`CREATE TYPE "public"."tickets_priority_enum" AS ENUM('HIGH', 'MEDIUM', 'LOW')`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."tickets_status_enum" NOT NULL DEFAULT 'OPEN', "priority" "public"."tickets_priority_enum" NOT NULL DEFAULT 'LOW', "deadLine" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_status_enum"`);
    }

}
