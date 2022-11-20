import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from 'auth/auth.module'
import { UsersModule } from 'users/users.module'
import { AppConfigService } from 'shared/services/app-config.service'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (appConfigService: AppConfigService) => appConfigService.postgresConfig,
      inject: [AppConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
