import { MigrationInterface, QueryRunner } from "typeorm";

export class NovaEntidadeCarro1759020633926 implements MigrationInterface {
    name = 'NovaEntidadeCarro1759020633926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carros" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "placa" character varying(7) NOT NULL, "modelo" character varying(100) NOT NULL, "marca" character varying(100) NOT NULL, "ano" integer NOT NULL, "chassi" character varying(17) NOT NULL, "renavam" character varying(11) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba7be410cab15cfd6475fda1b9d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "carros"`);
    }

}
