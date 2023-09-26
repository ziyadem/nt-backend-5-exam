import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import {
  ProductCreateRequest,
  ProductDeleteRequest,
  ProductGetAllResponse,
  ProductGetOneRequest,
  ProductGetOneResponse,
  ProductUpdateRequest,
} from './interfaces'
import { ProductCommand } from '../enums'

@Injectable()
export class ProductService {
  readonly #_client: ClientTCP
  readonly #_timeout: number

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('market.host'),
      port: config.getOrThrow<number>('market.port'),
    })

    this.#_timeout = config.getOrThrow<number>('market.timeout')
  }

  async productGetAll(): Promise<ProductGetAllResponse[]> {
    return this.#_send<ProductGetAllResponse[], any>(
      ProductCommand.PRODUCT_GETALL,
      {
        data: null,
      },
    )
  }

  async productGetOne(
    payload: ProductGetOneRequest,
  ): Promise<ProductGetOneResponse[]> {
    return this.#_send<ProductGetOneResponse[], ProductGetOneRequest>(
      ProductCommand.PRODUCT_GETONE,
      payload,
    )
  }

  async productCreate(payload: ProductCreateRequest): Promise<null> {
    return this.#_send<null, ProductCreateRequest>(
      ProductCommand.PRODUCT_CREATE,
      payload,
    )
  }

  async productUpdate(payload: ProductUpdateRequest): Promise<null> {
    return this.#_send<any, ProductUpdateRequest>(
      ProductCommand.PRODUCT_UPDATE,
      payload,
    )
  }

  async productDelete(payload: ProductDeleteRequest): Promise<null> {
    return this.#_send<null, ProductDeleteRequest>(
      ProductCommand.PRODUCT_DELETE,
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
