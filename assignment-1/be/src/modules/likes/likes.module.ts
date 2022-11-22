import { Module } from '@nestjs/common'
import { LikesService } from './likes.service'
import { LikesController } from './likes.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LikeEntity } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
