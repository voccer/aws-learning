import { Module } from '@nestjs/common'
import { ViewsService } from './views.service'
import { ViewsController } from './views.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ViewEntity } from './entities/view.entity'
import { VideoEntity } from 'modules/videos/entities/video.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ViewEntity, VideoEntity])],
  controllers: [ViewsController],
  providers: [ViewsService],
})
export class ViewsModule {}
