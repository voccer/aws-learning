import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class workspaces1642067727930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'm_workspaces',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'created_by',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'updated_by',
            type: 'int',
            isNullable: true,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('m_workspaces')
  }
}
