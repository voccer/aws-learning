import { DataSource } from 'typeorm'
import { dbConfig } from 'config'

export const dataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.DB_HOST,
  port: dbConfig.DB_PORT,
  username: dbConfig.DB_USERNAME,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity.js'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
})
