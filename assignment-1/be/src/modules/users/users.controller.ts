import { Controller, UseGuards, Request, Res, Get } from '@nestjs/common'
import { Response } from 'express'

import { AuthenticationGuard } from 'modules/auth/guards'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticationGuard)
  @Get('/me')
  async me(@Request() req: any, @Res() res: Response) {
    const user = req.user
    return res.status(200).render('users/me', { user })
  }

  @UseGuards(AuthenticationGuard)
  @Get('/home')
  async getHome(@Request() req: any, @Res() res: Response) {
    res.redirect('me')
  }
}
