import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { AwsDynamoDBService } from 'shared/services/aws-dynamodb.service'
import { UserEntity } from 'modules/users/entities'
import { GeneratorService } from 'shared/services/generator.service'

@Injectable()
export class CommentsService {
  constructor(private awsDynamoDBService: AwsDynamoDBService, private generatorService: GeneratorService) {}

  async create(createCommentDto: CreateCommentDto, user: UserEntity) {
    const parentId = createCommentDto.parent_id
    const content = createCommentDto.content
    const videoId = createCommentDto.video_id

    const uuid = this.generatorService.uuid()

    const pk = `${user.id}`
    let sk = undefined

    if (parentId !== '') {
      // this is reply
      sk = `reply#${uuid}#${parentId}`
    } else {
      sk = `config#${uuid}`
    }

    const data = {
      pk,
      sk,
      content,
    }
    const id = await this.awsDynamoDBService.upsert('comments', data)

    return id
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`
  }
}
