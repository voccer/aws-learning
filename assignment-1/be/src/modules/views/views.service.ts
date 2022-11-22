import { Injectable } from '@nestjs/common'
import { CreateViewDto, UpdateViewDto } from './dto'
import { UserEntity } from 'modules/users/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { ViewEntity } from './entities/view.entity'
import { Repository } from 'typeorm'
import { VideoEntity } from 'modules/videos/entities'

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(ViewEntity) private viewsRepository: Repository<ViewEntity>,
    @InjectRepository(VideoEntity) private videosRepository: Repository<VideoEntity>
  ) {}

  async create(createViewDto: CreateViewDto, user: UserEntity): Promise<ViewEntity> {
    const videoId = createViewDto.video_id
    const video = await this.videosRepository.findOneBy({ id: videoId })
    const existedView = await this.viewsRepository.findOneBy({ userId: user.id, videoId })
    if (existedView) {
      existedView.count += 1
      return this.viewsRepository.save(existedView)
    }

    const view = this.viewsRepository.create()
    view.user = user
    view.video = video
    view.count = 1

    return await this.viewsRepository.save(view)
  }

  findAll() {
    return `This action returns all views`
  }

  findOne(id: number) {
    return `This action returns a #${id} View`
  }

  update(id: number, updateViewDto: UpdateViewDto) {
    return `This action updates a #${id} View`
  }

  remove(id: number) {
    return `This action removes a #${id} View`
  }
}
