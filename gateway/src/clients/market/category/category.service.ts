import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { CategoryCommand } from '../enums'
import {
  CategoryCreateRequest,
  CategoryDeleteRequest,
  CategoryGetAllResponse,
  CategoryGetOneRequest,
  CategoryGetOneResponse,
  CategoryUpdateRequest,
} from './interfaces'

@Injectable()
export class CategoryService {
  readonly #_client: ClientTCP
  readonly #_timeout: number

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('market.host'),
      port: config.getOrThrow<number>('market.port'),
    })

    this.#_timeout = config.getOrThrow<number>('market.timeout')
  }

  async categoryGetAll(): Promise<CategoryGetAllResponse[]> {
    return this.#_send<CategoryGetAllResponse[], any>(
      CategoryCommand.CATEGORY_GETALL,
      {
        data: null,
      },
    )
  }

  async categoryGetOne(
    payload: CategoryGetOneRequest,
  ): Promise<CategoryGetOneResponse> {
    return this.#_send<CategoryGetOneResponse, CategoryGetOneRequest>(
      CategoryCommand.CATEGORY_GETONE,
      payload,
    )
  }

  async categoryCreate(payload: CategoryCreateRequest): Promise<null> {
    return this.#_send<null, CategoryCreateRequest>(
      CategoryCommand.CATEGORY_CREATE,
      payload,
    )
  }

  async categoryUpdate(payload: CategoryUpdateRequest): Promise<null> {
    return this.#_send<any, CategoryUpdateRequest>(
      CategoryCommand.CATEGORY_UPDATE,
      payload,
    )
  }

  async categoryDelete(payload: CategoryDeleteRequest): Promise<null> {
    return this.#_send<null, CategoryDeleteRequest>(
      CategoryCommand.CATEGORY_DELETE,
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
