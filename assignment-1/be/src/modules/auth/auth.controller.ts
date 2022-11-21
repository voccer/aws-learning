import { Body, Controller, Post, UseGuards, Res, Get, Req, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response, Request } from 'express'
import { authConfig } from 'config'
import { AuthService } from './auth.service'
import { AuthenticationGuard } from './guards'
import { UserRegisterDto } from './dto'
import { UsersService } from 'modules/users/users.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private userService: UsersService
  ) {}

  @Get('/login')
  async getLogin(@Res() res: Response) {
    return res.status(HttpStatus.OK).render('auth/login')
  }

  @Post('/login')
  async login(@Body() data: any, @Res() res: Response): Promise<any> {
    const { email, password } = data
    const resp = await this.authService.login(email, password)

    if (resp['error']) {
      console.log('login error::', resp.error)
      return res.status(HttpStatus.NOT_FOUND).json(resp).end()
    }

    const payload = { email: resp.email, sub: resp.id }
    const accessToken = this.jwtService.sign(payload)

    return res.status(HttpStatus.OK).json({ access_token: accessToken }).end()
  }

  @UseGuards(AuthenticationGuard)
  @Get('/logout')
  async logout(@Res() res: Response) {
    // remove cookie
    return res.status(HttpStatus.OK).clearCookie(authConfig.COOKIE_NAME).redirect('login')
  }

  // @UseGuards(AuthenticationGuard)
  @Get('not_found')
  async getNotFound(@Res() res: Response) {
    return res.status(HttpStatus.NOT_FOUND).render('auth/not_found')
  }

  @Get('register')
  async getRegister(@Res() res: Response) {
    return res.status(HttpStatus.OK).render('auth/register')
  }

  @Post('register')
  async userRegister(@Body() userRegisterDto: UserRegisterDto): Promise<any> {
    const user = await this.userService.createUser(userRegisterDto)

    if (user) {
      return {
        id: user.id,
        email: user.email,
      }
    }
  }
}
