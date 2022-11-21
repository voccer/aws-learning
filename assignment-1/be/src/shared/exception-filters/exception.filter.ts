import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { authConfig } from 'config'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    // console.log(exception)
    // console.log(status)
    if (exception instanceof UnauthorizedException || exception instanceof ForbiddenException) {
      console.log('unauthorized exception')
      return response.clearCookie(authConfig.COOKIE_NAME).redirect('/auth/login')
    }

    if (exception instanceof NotFoundException) {
      console.log('not found exception::', request.method, request.url)
      return response.status(exception.getStatus()).render('auth/not_found')
    }
  }
}
