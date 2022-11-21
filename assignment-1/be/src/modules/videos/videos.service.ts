import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateVideoDto } from './dto'
import { VideoEntity } from './entities/video.entity'
import { ValidatorService } from 'shared/services/validator.service'
import { AwsS3Service } from 'shared/services/aws-s3.service'
import { UserEntity } from 'modules/users/entities'

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private videosRepository: Repository<VideoEntity>,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service
  ) {}

  async create(file: Express.Multer.File, user: UserEntity): Promise<VideoEntity> {
    const video = this.videosRepository.create()
    video.user = user

    if (file) {
      const url = await this.awsS3Service.uploadFile(file)
      video.url = url
    }
    console.log('video', video)

    return this.videosRepository.save(video)
  }

  async findAll(): Promise<VideoEntity[]> {
    const videos = await this.videosRepository.find()

    return videos
  }

  async getComments(video: VideoEntity): Promise<any> {
    return video
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
