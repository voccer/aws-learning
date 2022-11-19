import { join } from 'path'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

import { dbConfig } from 'config'

const migrations_path = join(__dirname, '..', 'migrations')
console.log('mirgrations::', migrations_path)
const configConnection: MysqlConnectionOptions = {
  type: 'mysql',
  database: dbConfig.DB_NAME,
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASS,
  port: dbConfig.DB_PORT,
  host: dbConfig.DB_HOST,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: dbConfig.DB_SYNC,
  dropSchema: dbConfig.DB_DROP_SCHEMA,
  migrations: ['dist/shared/storages/migrations/*.js'], // necessary
}

export default configConnection
