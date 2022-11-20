import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { isNil } from 'lodash'

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  private getNumber(key: string): number {
    const value = this.get(key)

    try {
      return Number(value)
    } catch {
      throw new Error(key + ' environment variable is not a number')
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key)

    try {
      return Boolean(JSON.parse(value))
    } catch {
      throw new Error(key + ' env var is not a boolean')
    }
  }

  private getString(key: string): string {
    const value = this.get(key)

    return value.replace(/\\n/g, '\n')
  }

  get awsS3Config() {
    return {
      bucketRegion: this.getString('AWS_S3_BUCKET_REGION'),
      bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
      bucketName: this.getString('AWS_S3_BUCKET_NAME'),
    }
  }

  get authConfig() {
    return {
      privateKey: this.getString('JWT_PRIVATE_KEY'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
    }
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    }
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key)

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set') // probably we should call process.exit() too to avoid locking the service
    }

    return value
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ]
    const migrations = [__dirname + '/../../database/migrations/*{.ts,.js}']

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      dropSchema: true,
      type: 'postgres',
      name: 'default',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      migrationsRun: true,
      logging: true,
    }
  }
}
