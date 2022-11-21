import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { authConfig, guardConfig } from 'config'
import { AuthService } from '../auth.service'
import { Request } from 'express'

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, guardConfig.JWT) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: (req: Request) => {
        if (req && req.query && req.query?.token) {
          return req.query.token
        }
      },
      ignoreExpiration: authConfig.JWT_IGNORE_EXPIRATION,
      secretOrKey: authConfig.JWT_SECRET_KEY,
    })
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
