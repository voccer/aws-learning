import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class DetectRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    return true
  }
}
