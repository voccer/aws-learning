import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'modules/users/users.service'
import { guardConfig } from 'config'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, guardConfig.LOCAL) {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password)

    if (!user) {
      console.log('user not found')
      throw new UnauthorizedException('Unvalite your email or your password')
    }

    return user
  }
}
