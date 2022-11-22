import { Controller, Post, Body, Req, UseGuards, Res } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { AuthenticationGuard } from 'modules/auth/guards'
import { Request, Response } from 'express'
import { UserEntity } from 'modules/users/entities'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('')
  @UseGuards(AuthenticationGuard)
  async create(@Req() req: Request, @Body() createCommentDto: CreateCommentDto, @Res() res: Response) {
    const user = <UserEntity>req.user

    const comment = await this.commentsService.create(createCommentDto, user)

    return res.status(200).json(comment).end()
  }
}
