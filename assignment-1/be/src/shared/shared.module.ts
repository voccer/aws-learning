import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SharedController } from './shared.controller'
import { SharedService } from './shared.service'
import { JwtModule } from '@nestjs/jwt'
import { authConfig } from 'config'
import { PassportModule } from '@nestjs/passport'
import { JsonWebTokenStrategy } from './auth'
import { UsersService } from 'users/users.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: authConfig.JWT_SECRET_KEY,
      signOptions: { expiresIn: authConfig.JWT_EXPIRES_TIME },
    }),
    TypeOrmModule.forFeature([]),
  ],
  providers: [SharedService, JsonWebTokenStrategy, UsersService],
  controllers: [SharedController],
  exports: [],
})
export class SharedModule {}
