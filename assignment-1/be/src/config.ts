import * as dotenv from 'dotenv'
dotenv.config()

export const appConfig = {
  APP_HOST: process.env.APP_HOST || '0.0.0.0',
  APP_PORT: +process.env.APP_PORT || 5000,
  APP_SERVER_URL: process.env.APP_SERVER_URL || 'http://0.0.0.0:5000',

  HASH_SALT_ROUNDS: +process.env.HASH_SALT_ROUNDS || 10,
}

export const dbConfig = {
  DB_TYPE: process.env.DB_TYPE || 'postgres',
  DB_HOST: process.env.DB_HOST || '172.24.0.2',
  DB_DATABASE: process.env.DB_DATABASE || 'video-store',
  DB_PORT: +process.env.DB_PORT || 5432,
  DB_USERNAME: process.env.DB_USERNAME || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_SYNC: process.env.DB_SYNC === 'true' || process.env.DB_SYNC === 'True' || false,
  DB_DROP_SCHEMA: process.env.DB_DROP_SCHEMA === 'true' || process.env.DB_DROP_SCHEMA === 'True' || false,
}

export const authConfig = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: process.env.JWT_EXPIRES_TIME,
  JWT_IGNORE_EXPIRATION: process.env.JWT_IGNORE_EXPIRATION.toLowerCase() == 'true' || false,
  HASH_SALT_ROUNDS: appConfig.HASH_SALT_ROUNDS,
  COOKIE_NAME: process.env.COOKIE_NAME,
  COOKIE_EXPIRES_TIME: +process.env.COOKIE_EXPIRES_TIME,
}

export const guardConfig = {
  JWT: 'jwt',
  LOCAL: 'local',
}
