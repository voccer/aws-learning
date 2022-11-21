import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateVideoDto, UpdateVideoDto } from './dto'
import { VideoEntity } from './entities/video.entity'

@Injectable()
export class VideosService {
  constructor(@InjectRepository(VideoEntity) private videosRepository: Repository<VideoEntity>) {}

  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video'
  }

  async findAll(): Promise<VideoEntity[]> {
    const videos = await this.videosRepository.find()

    return videos
  }

  findOne(id: number) {
    return `This action returns a #${id} video`
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`
  }

  remove(id: number) {
    return `This action removes a #${id} video`
  }
}
