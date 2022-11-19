import { AuthGuard } from '@nestjs/passport'
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { guardConfig } from 'config'

@Injectable()
export class AuthenticationGuard extends AuthGuard(guardConfig.JWT) implements CanActivate {
  handleRequest(err: any, user: any, info: Error, context: ExecutionContext) {
    // console.log('err: ', err)
    // console.log('user: ', user)
    // console.log('info: ', info)
    // console.log('req::', req.)
    if (info) {
      const req = context.switchToHttp().getRequest()

      console.log(`can not authenticate with request::${req.path}, redirect to login with message::${info.message}`)

      throw new UnauthorizedException(info.message)
    }
    return user
  }
}
