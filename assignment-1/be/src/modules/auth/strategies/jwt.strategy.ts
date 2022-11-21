import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { authConfig, guardConfig } from 'config'
import { AuthService } from '../auth.service'

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy, guardConfig.JWT) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
