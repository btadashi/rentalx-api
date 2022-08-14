"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteUsername1654131428080 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeleteUsername1654131428080 {
  async up(queryRunner) {
    await queryRunner.dropColumn('users', 'username');
  }

  async down(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'username',
      type: 'varchar'
    }));
  }

}

exports.AlterUserDeleteUsername1654131428080 = AlterUserDeleteUsername1654131428080;