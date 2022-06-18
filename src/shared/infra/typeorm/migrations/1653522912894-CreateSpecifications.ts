/** Importamos Table de dentro de typeorm */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSpecifications1653522912894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /** Chamamos o método createTable, onde damos um new Table, que recebe
     * um objeto com as informações da nossa tabela */
    await queryRunner.createTable(
      new Table({
        name: 'specifications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /** Para desfazer o método up, damos um dropTable na
     * tabela specifications
     */
    await queryRunner.dropTable('specifications');
  }
}
