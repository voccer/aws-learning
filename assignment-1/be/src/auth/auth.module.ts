import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { authConfig } from 'config'
import { PassportModule } from '@nestjs/passport'
import { JsonWebTokenStrategy } from './strategies'
import { UsersModule } from 'users/users.module'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: authConfig.JWT_SECRET_KEY,
      signOptions: { expiresIn: authConfig.JWT_EXPIRES_TIME },
    }),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JsonWebTokenStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
