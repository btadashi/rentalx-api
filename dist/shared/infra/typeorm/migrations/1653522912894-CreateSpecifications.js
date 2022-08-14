"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecifications1653522912894 = void 0;

var _typeorm = require("typeorm");

/** Importamos Table de dentro de typeorm */
class CreateSpecifications1653522912894 {
  async up(queryRunner) {
    /** Chamamos o método createTable, onde damos um new Table, que recebe
     * um objeto com as informações da nossa tabela */
    await queryRunner.createTable(new _typeorm.Table({
      name: 'specifications',
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
    /** Para desfazer o método up, damos um dropTable na
     * tabela specifications
     */
    await queryRunner.dropTable('specifications');
  }

}

exports.CreateSpecifications1653522912894 = CreateSpecifications1653522912894;