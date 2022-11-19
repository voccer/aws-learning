import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class users1642066824360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'm_users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'status',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'password',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'firstname',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'lastname',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'firstname_kana',
            type: 'varchar(50)',
            isNullable: false,
          },

          {
            name: 'lastname_kana',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'phone_number',
            type: 'varchar(12)',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar(2000)',
            isNullable: true,
          },
          {
            name: 'workspace_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'int',
            isNullable: false,
            default: 0, // 0: wp-user, 1: wp-admin, 999: sys-admin
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
    await queryRunner.dropTable('m_users')
  }
}
