import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { VideosService } from './videos.service'
import { CreateVideoDto, UpdateVideoDto } from './dto'

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto)
  }

  @Get('/')
  async index() {
    return this.videosService.findAll()
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return this.videosService.findOne(+id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.videosService.remove(+id)
  }
}
