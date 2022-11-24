import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateVideoDto } from './dto'
import { VideoEntity } from './entities/video.entity'
import { ValidatorService } from 'shared/services/validator.service'
import { AwsS3Service } from 'shared/services/aws-s3.service'
import { UserEntity } from 'modules/users/entities'
import { ViewEntity } from 'modules/views/entities/view.entity'
import { LikeEntity } from 'modules/likes/entities'
import { LikesService } from 'modules/likes/likes.service'
import { CommentsService } from 'modules/comments/comments.service'
import { CommentEntity } from 'modules/comments/entities'
import { AttributeMap, AttributeValue } from 'aws-sdk/clients/dynamodb'

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private videosRepository: Repository<VideoEntity>,
    @InjectRepository(ViewEntity)
    private viewsRepository: Repository<ViewEntity>,
    @InjectRepository(LikeEntity)
    private likesRepository: Repository<LikeEntity>,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service,
    private likesService: LikesService,
    private commentsService: CommentsService
  ) {}

  async create(file: Express.Multer.File, user: UserEntity): Promise<VideoEntity> {
    const video = this.videosRepository.create()
    video.user = user

    if (file) {
      const url = await this.awsS3Service.uploadFile(file)
      video.url = url
    }

    return this.videosRepository.save(video)
  }

  async findAll(): Promise<VideoEntity[]> {
    const videos = await this.videosRepository.find()

    return videos
  }

  async getViews(video: VideoEntity): Promise<ViewEntity[]> {
    return await this.viewsRepository.find({ where: { videoId: video.id } })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getComments(video: VideoEntity, user: UserEntity): Promise<any> {
    const userId = user.id
    const comments = await this.commentsService.findByVideoId(video.id.toString())

    return [
      {
        id: 1,
        content: "I'm a comment",
        likedCount: 1,
        isLiked: await this.likesService.checkIsLiked('1', userId),
        created_at: 1669272976488,
        children: [],
      },
      {
        id: 2,
        content: "I'm a comment 2",
        likedCount: 2,
        isLiked: await this.likesService.checkIsLiked('2', userId),
        created_at: 1669272996488,
        children: [
          {
            id: 4,
            content: "I'm a reply comment",
            likedCount: 4,
            isLiked: await this.likesService.checkIsLiked('4', userId),
            children: [
              {
                id: 6,
                content: "I'm a reply of reply comment",
                likedCount: 1,
                isLiked: await this.likesService.checkIsLiked('6', userId),
                created_at: 1669272986488,
                children: [],
              },
            ],
          },
          {
            id: 5,
            content: "I'm a reply comment2",
            likedCount: 1,
            isLiked: await this.likesService.checkIsLiked('5', userId),
            created_at: 1669272996489,
            children: [],
          },
        ],
      },
      {
        id: 3,
        content: "I'm a comment 3",
        likedCount: 3,
        isLiked: await this.likesService.checkIsLiked('3', userId),
        created_at: 1669272986488,
        children: [],
      },
    ]
  }

  async findOneById(id: number): Promise<VideoEntity> | null {
    const video = await this.videosRepository.findOneBy({ id })

    return video
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`
  }

  remove(id: number) {
    return `This action removes a #${id} video`
  }
}
