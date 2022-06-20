import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCarsImageRenameColumn1655523495308 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      "cars_image",
      "image_car",
      "image_name"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      "cars_image",
      "image_name",
      "image_car"
    );
  }

}
