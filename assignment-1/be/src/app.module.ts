import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from 'modules/auth/auth.module'
import { UsersModule } from 'modules/users/users.module'
import { AppConfigService } from 'shared/services/app-config.service'
import { SharedModule } from 'shared/shared.module'
import { VideosModule } from 'modules/videos/videos.module'
import { ViewsModule } from 'modules/views/views.module'
import { CommentsModule } from 'modules/comments/comments.module'
import { LikesModule } from './modules/likes/likes.module'

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
    VideosModule,
    ViewsModule,
    CommentsModule,
    LikesModule,
  ],
  providers: [],
})
export class AppModule {}
