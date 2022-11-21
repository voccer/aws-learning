import { Module } from '@nestjs/common'
import { ViewsService } from './views.service'
import { ViewsController } from './views.controller'

@Module({
  controllers: [ViewsController],
  providers: [ViewsService],
})
export class ViewsModule {}
