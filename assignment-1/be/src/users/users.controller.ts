import { Controller, UseGuards, Request, Res, Get } from '@nestjs/common'
import { Response } from 'express'

import { AuthenticationGuard, DetectRoleGuard } from 'auth/guards'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(DetectRoleGuard)
  @UseGuards(AuthenticationGuard)
  @Get('/me')
  async getHome(@Request() req: any, @Res() res: Response) {
    // console.log('getHome::', req.user)
    const user = req.user
    return res.redirect('profile/' + user.id)
  }
}
