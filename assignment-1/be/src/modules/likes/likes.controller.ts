import { Controller, Post, Body, Param, Delete, UseGuards, Req, Res } from '@nestjs/common'
import { LikesService } from './likes.service'
import { CreateLikeDto } from './dto/create-like.dto'
import { AuthenticationGuard } from 'modules/auth/guards'
import { Request, Response } from 'express'
import { UserEntity } from 'modules/users/entities'
import { DeleteLikeDto } from './dto/delete-like.dto'

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async create(@Body() createLikeDto: CreateLikeDto, @Req() req: Request, @Res() res: Response) {
    const user = <UserEntity>req.user

    const like = await this.likesService.create(createLikeDto, user)

    return res.status(201).json(like).end()
  }

  @Delete()
  @UseGuards(AuthenticationGuard)
  async remove(@Res() res: Response, @Req() req: Request, @Body() deleteLikeDto: DeleteLikeDto) {
    const user = <UserEntity>req.user

    const resp = await this.likesService.remove(deleteLikeDto, user)

    return res.status(204).json(resp).end()
  }
}
