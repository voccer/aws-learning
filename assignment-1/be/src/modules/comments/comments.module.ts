import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { AwsDynamoDBService } from 'shared/services/aws-dynamodb.service'
import { GeneratorService } from 'shared/services/generator.service'

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, AwsDynamoDBService, GeneratorService],
})
export class CommentsModule {}
