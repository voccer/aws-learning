import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { guardConfig } from 'config'

@Injectable()
export class AuthenticationGuard extends AuthGuard(guardConfig.JWT) {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err: any, user: any, info: Error, context: ExecutionContext) {
    if (info || err) {
      const req = context.switchToHttp().getRequest()

      console.log(`can not authenticate with request::${req.path}, redirect to login page`)

      throw new UnauthorizedException(info?.message || err?.message)
    }

    return user
  }
}
