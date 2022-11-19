import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest()

    // const id = request.params.id
    // if (request.user.id == id) {
    //   return true
    // }

    return true
  }
}
