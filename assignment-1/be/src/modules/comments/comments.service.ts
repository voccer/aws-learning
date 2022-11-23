import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { AwsDynamoDBService } from 'shared/services/aws-dynamodb.service'
import { UserEntity } from 'modules/users/entities'
import { GeneratorService } from 'shared/services/generator.service'
import { ItemList } from 'aws-sdk/clients/dynamodb'

@Injectable()
export class CommentsService {
  constructor(private awsDynamoDBService: AwsDynamoDBService, private generatorService: GeneratorService) {}

  async create(createCommentDto: CreateCommentDto, user: UserEntity) {
    const parentId = createCommentDto.parent_id
    const content = createCommentDto.content
    const videoId = createCommentDto.video_id

    const uuid = this.generatorService.uuid()

    const pk = `${videoId}`
    let sk = undefined

    if (parentId !== '') {
      // this is reply
      sk = `reply#${parentId}#${uuid}`
    } else {
      sk = `config#${uuid}`
    }

    const data = {
      pk,
      sk,
      content,
      id: uuid,
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      liked_cnt: 0,
    }
    const id = await this.awsDynamoDBService.upsert('comments', data)

    return id
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`
  }

  async findByVideoId(videoId: string): Promise<ItemList> {
    const keyConditionExpression = 'pk = :pk'
    const expressionAttributeValues = {
      ':pk': videoId,
    }
    const result = await this.awsDynamoDBService.query('comments', keyConditionExpression, expressionAttributeValues)

    return result
  }
}
