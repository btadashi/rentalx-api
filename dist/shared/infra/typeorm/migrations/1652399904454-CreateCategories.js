"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategories1652399904454 = void 0;

var _typeorm = require("typeorm");

/* eslint-disable class-methods-use-this */

/* eslint-disable import/prefer-default-export */

/** Importamos Table de dentro de typeorm */
class CreateCategories1652399904454 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'categories',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('categories');
  }

}

exports.CreateCategories1652399904454 = CreateCategories1652399904454;