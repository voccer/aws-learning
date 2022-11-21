import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParse from 'cookie-parser'
import { appConfig } from 'config'
import { AppModule } from 'app.module'
import { HttpExceptionFilter } from 'shared/exception-filters'
import { config } from 'aws-sdk'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(cookieParse())
  app.setBaseViewsDir('src/views')
  app.useStaticAssets('src/public')
  app.setViewEngine('ejs')
  app.enableCors()
  const configService = app.get(ConfigService)

  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  })

  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(appConfig.APP_PORT, appConfig.APP_HOST, () => {
    Logger.log(`Nest listening on http://${appConfig.APP_HOST}:${appConfig.APP_PORT}`, 'Bootstrap')
  })
}

bootstrap()
