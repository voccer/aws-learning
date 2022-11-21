import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { JWTStrategy } from 'modules/auth/strategies'
import { UserEntity } from './entities/user.entity'
import { AuthService } from 'modules/auth/auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, JWTStrategy, AuthService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
