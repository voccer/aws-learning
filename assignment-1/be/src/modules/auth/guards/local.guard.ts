import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
  handleRequest(err: any, user: any, info: Error, context: ExecutionContext) {
    if (err) {
      return {}
    }
    const request = context.switchToHttp().getRequest()
    const body = request.body
    console.log('body: ', body)
    console.log('user: ', user)
    console.log('err: ', err)
    if (Number(body.workspaceId) == user.workspaceId) {
      return user
    }
  }
}
