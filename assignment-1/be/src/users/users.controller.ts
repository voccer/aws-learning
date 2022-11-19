import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  Get,
  Render,
  Param,
  Put,
  HttpStatus,
  Delete,
} from '@nestjs/common'
import { Response } from 'express'

import { AuthenticationGuard, DetectRoleGuard, AuthorGuard } from 'shared/auth'

import { UsersService } from './users.service'

const root = 'users/:role'

@Controller(root)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(DetectRoleGuard)
  @UseGuards(AuthenticationGuard)
  @Get('/home')
  async getHome(@Request() req: any, @Res() res: Response) {
    // console.log('getHome::', req.user)
    const user = req.user
    return res.redirect('profile/' + user.id)
  }
}
