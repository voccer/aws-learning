import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'video-store',
  entities: ['src/**/model/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
})
