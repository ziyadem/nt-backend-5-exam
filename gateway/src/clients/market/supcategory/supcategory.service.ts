import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import {
  SupCategoryGetAllResponse,
  SupCategoryGetOneRequest,
  SupCategoryCreateRequest,
  SupCategoryUpdateRequest,
  SupCategoryDeleteRequest,
} from './interfaces'
import { SupCategoryCommand } from '../enums'

@Injectable()
export class SupCategoryService {
  readonly #_client: ClientTCP
  readonly #_timeout: number

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('market.host'),
      port: config.getOrThrow<number>('market.port'),
    })

    this.#_timeout = config.getOrThrow<number>('market.timeout')
  }

  async supcategoryGetAll() {
    return this.#_send<SupCategoryGetAllResponse, any>(
      SupCategoryCommand.SUPCATEGORY_GETALL,
      { data: null },
    )
  }

  async supcategoryGetOne(payload: SupCategoryGetOneRequest): Promise<any> {
    return this.#_send<any, SupCategoryGetOneRequest>(
      SupCategoryCommand.SUPCATEGORY_GETONE,
      payload,
    )
  }

  async supcategoryCreate(payload: SupCategoryCreateRequest): Promise<null> {
    return this.#_send<null, SupCategoryCreateRequest>(
      SupCategoryCommand.SUPCATEGORY_CREATE,
      payload,
    )
  }

  async supcategoryUpdate(payload: SupCategoryUpdateRequest): Promise<null> {
    return this.#_send<null, SupCategoryUpdateRequest>(
      SupCategoryCommand.SUPCATEGORY_UPDATE,
      payload,
    )
  }

  async supcategoryDelete(payload: SupCategoryDeleteRequest): Promise<null> {
    return this.#_send<null, SupCategoryDeleteRequest>(
      SupCategoryCommand.SUPCATEGORY_DELETE,
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
    console.log(pattern, payload)
    try {
      return await firstValueFrom(
        this.#_client
          .send<TResponse, TRequest>(pattern, payload)
          .pipe(timeout(this.#_timeout)),
      )
    } catch (error: unknown) {
      console.log(error, 'error')
      throw new InternalServerErrorException(error)
    }
  }
}
