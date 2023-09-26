import {
  UnauthorizedException,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'

export class VerifyAccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest()
    if (!request.headers['authorization']) {
      throw new UnauthorizedException('Unauthorized')
    }
    const accessToken = request.headers['authorization']?.replace('Bearer ', '')
    if (accessToken.length !== 187) {
      throw new UnauthorizedException('Token invalid')
    }
    const userId = JSON.parse(
      JSON.stringify(Buffer.from(accessToken, 'base64').toString()),
    )
    function tokenId(arg: string) {
      let obj = ''
      let a = 0
      for (let i = 0; i < arg.length; i++) {
        if (arg[i] == '{') {
          a += 1
        }
        if (a == 2 && arg[i] !== '}') {
          obj += arg[i]
        }
        if (a == 2 && arg[i] == '}') {
          obj += '}'
          return obj
        }
      }
      return obj
    }
    const newObj = tokenId(userId)
    let jsonToken = null
    try {
      jsonToken = JSON.parse(newObj)
    } catch (error) {
      throw new UnauthorizedException('Token invalid')
    }
    const dateExp = new Date(jsonToken.exp).toUTCString()
    const dateNow = new Date().toUTCString()

    if (dateNow > dateExp) {
      throw new UnauthorizedException('token expired')
    }
    request.body.user_id = jsonToken.id
    return next.handle()
  }
}
