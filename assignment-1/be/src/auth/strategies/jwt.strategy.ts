import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { authConfig, guardConfig } from 'config'

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy, guardConfig.JWT) {
  constructor() {
    super({
      jwtFromRequest: (req: any) => {
        if (!req || !req.cookies) return null
        return req.cookies[authConfig.COOKIE_NAME]
      },
      ignoreExpiration: authConfig.JWT_IGNORE_EXPIRATION,
      secretOrKey: authConfig.JWT_SECRET_KEY,
    })
  }

  async validate(user: any) {
    return { ...user }
  }
}
