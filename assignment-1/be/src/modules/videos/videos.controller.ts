import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common'
import { VideosService } from './videos.service'
import { CreateVideoDto } from './dto'
import { Response } from 'express'

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto)
  }

  @Get('/')
  async index(@Res() res: Response) {
    const videos = await this.videosService.findAll()
    return res.status(200).render('videos/index', { videos })
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return this.videosService.findOne(+id)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.videosService.remove(+id)
  }
}
