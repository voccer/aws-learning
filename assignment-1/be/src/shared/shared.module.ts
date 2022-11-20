import { Module } from '@nestjs/common'
import { AppConfigService } from 'shared/services/app-config.service'

@Module({
  imports: [],
  providers: [AppConfigService],
  controllers: [],
  exports: [AppConfigService],
})
export class SharedModule {}
