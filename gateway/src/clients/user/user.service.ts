import {
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { UserCommand } from './enums'
import type {
  RestoreRequest,
  RestoreResponse,
  SignInRequest,
  SignInResponse,
  SignOutRequest,
  SignUpRequest,
  SignUpResponse,
  UserDeleteRequest,
} from './interfaces'

@Injectable()
export class UserService {
  readonly #_client: ClientTCP
  readonly #_timeout: number

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('user.host'),
      port: config.getOrThrow<number>('user.port'),
    })

    this.#_timeout = config.getOrThrow<number>('user.timeout')
  }

  async signUp(payload: SignUpRequest): Promise<SignUpResponse> {
    return this.#_send<SignUpResponse, SignUpRequest>(
      UserCommand.AUTH_SIGN_UP,
      payload,
    )
  }

  async signIn(payload: SignInRequest): Promise<SignInResponse> {
    return this.#_send<SignInResponse, SignInRequest>(
      UserCommand.AUTH_SIGN_IN,
      payload,
    )
  }

  async restore(payload: RestoreRequest): Promise<RestoreResponse> {
    return this.#_send<RestoreResponse, RestoreRequest>(
      UserCommand.AUTH_RESTORE,
      payload,
    )
  }

  async signOut(payload: SignOutRequest): Promise<null> {
    return this.#_send<null, SignOutRequest>(UserCommand.AUTH_SIGN_OUT, payload)
  }

  async userDelete(payload: UserDeleteRequest): Promise<null> {
    return this.#_send<null, UserDeleteRequest>(
      UserCommand.AUTH_DELETE,
      payload,
    )
  }

  async #_connect(): Promise<void> {
    await this.#_client.connect()
  }

  #_disConnect(): void {
    this.#_client.close()
  }

  async #_send<TResponse, TRequest>(
    pattern: string,
    payload: TRequest,
  ): Promise<TResponse> {
    try {
      return await firstValueFrom(
        this.#_client
          .send<TResponse, TRequest>(pattern, payload)
          .pipe(timeout(this.#_timeout)),
      )
    } catch (error: any) {
      if (error.name) {
        throw new HttpException(error.response, error.status)
      }
      throw new InternalServerErrorException(error)
    }
  }
}
