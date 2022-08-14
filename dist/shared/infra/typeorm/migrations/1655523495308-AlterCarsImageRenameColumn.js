"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterCarsImageRenameColumn1655523495308 = void 0;

class AlterCarsImageRenameColumn1655523495308 {
  async up(queryRunner) {
    await queryRunner.renameColumn("cars_image", "image_car", "image_name");
  }

  async down(queryRunner) {
    await queryRunner.renameColumn("cars_image", "image_name", "image_car");
  }

}

exports.AlterCarsImageRenameColumn1655523495308 = AlterCarsImageRenameColumn1655523495308;