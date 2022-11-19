import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common'
import { authConfig } from 'config'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    // console.log(exception)
    // console.log(status)
    if (exception instanceof UnauthorizedException || exception instanceof ForbiddenException) {
      console.log('unauthorized exception')
      return response.clearCookie(authConfig.COOKIE_NAME).redirect('/shared/login')
    }

    // notfound exception
    if (status === 404) {
      return response.redirect('/shared/not-found')
    }
  }
}
