import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { AuthenticationGuard } from 'modules/auth/guards'
import { Request } from 'express'
import { UserEntity } from 'modules/users/entities'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('')
  @UseGuards(AuthenticationGuard)
  async create(@Req() req: Request, @Body() createCommentDto: CreateCommentDto) {
    const user = <UserEntity>req.user

    const comment = await this.commentsService.create(createCommentDto, user)

    return comment
  }
}
