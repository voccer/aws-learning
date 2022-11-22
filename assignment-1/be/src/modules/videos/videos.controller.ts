import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Res,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common'
import { VideosService } from './videos.service'
import { Response, Request } from 'express'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { AuthenticationGuard } from 'modules/auth/guards'
import { UserEntity } from 'modules/users/entities'

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('/')
  @UseInterceptors(AnyFilesInterceptor())
  @UseGuards(AuthenticationGuard)
  async create(@Req() req: Request, @UploadedFiles() file: Express.Multer.File) {
    const user = <UserEntity>req.user
    const resp = await this.videosService.create(file[0], user)
    return resp
  }

  @Get('/')
  @UseGuards(AuthenticationGuard)
  async index(@Res() res: Response) {
    const videos = await this.videosService.findAll()
    return res.status(200).render('videos/index', { videos })
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  async show(@Req() req: Request, @Param('id') id: string, @Res() res: Response) {
    const user = <UserEntity>req.user
    const video = await this.videosService.findOneById(+id)
    const comments = await this.videosService.getComments(video)
    const views = await this.videosService.getViews(video)
    let viewTotal = 0
    views.forEach((view) => {
      viewTotal += view.count
    })

    return res.status(200).render('videos/id', { video, user, comments, viewTotal })
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  async remove(@Param('id') id: string) {
    return this.videosService.remove(+id)
  }
}
