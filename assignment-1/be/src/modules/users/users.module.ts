import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { JsonWebTokenStrategy } from 'modules/auth/strategies'
import { UserEntity } from './entities/users.entity'
import { AuthService } from 'modules/auth/auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, JsonWebTokenStrategy, AuthService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
