import { Module } from '@nestjs/common'
import { VideosService } from './videos.service'
import { VideosController } from './videos.controller'
import { VideoEntity } from './entities/video.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
