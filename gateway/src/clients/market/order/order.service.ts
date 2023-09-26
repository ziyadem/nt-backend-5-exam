import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { OrderCommand } from '../enums'
import { ProductGetOneResponse } from '../product'
import {
  OrderCreateRequest,
  OrderDeleteRequest,
  OrderGetOneRequest,
} from './interfaces'

@Injectable()
export class OrderService {
  readonly #_client: ClientTCP
  readonly #_timeout: number

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('market.host'),
      port: config.getOrThrow<number>('market.port'),
    })

    this.#_timeout = config.getOrThrow<number>('market.timeout')
  }

  async orderGetAll() {
    return this.#_send<any, any>(OrderCommand.ORDER_GETALL, {
      data: null,
    })
  }

  async orderGetUser(
    payload: OrderGetOneRequest,
  ): Promise<ProductGetOneResponse[]> {
    return this.#_send<ProductGetOneResponse[], OrderGetOneRequest>(
      OrderCommand.ORDER_GETONE,
      payload,
    )
  }

  async orderCreate(payload: OrderCreateRequest): Promise<null> {
    return this.#_send<null, OrderCreateRequest>(
      OrderCommand.ORDER_CREATE,
      payload,
    )
  }

  async orderDelete(payload: OrderDeleteRequest): Promise<null> {
    return this.#_send<null, OrderDeleteRequest>(
      OrderCommand.ORDER_DELETE,
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
