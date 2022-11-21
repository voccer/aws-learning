import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class views20221121123124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'views',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'video_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'viewer_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'count',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
          },
        ],
      })
    )

    await queryRunner.createIndex(
      'views',
      new TableIndex({
        name: 'index_views_on_viewer_id',
        columnNames: ['viewer_id'],
      })
    )

    await queryRunner.createIndex(
      'views',
      new TableIndex({
        name: 'index_views_on_video_id',
        columnNames: ['video_id'],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('views')
  }
}
