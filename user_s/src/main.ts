import type { TcpOptions } from '@nestjs/microservices'
import { App } from './app'
import { appConfig } from './config'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common'
import { AllExceptionFilter } from '@filters'

setImmediate(async (): Promise<void> => {
  const app = await NestFactory.createMicroservice<TcpOptions>(App, {
    transport: Transport.TCP,
    options: appConfig.options,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  )
  app.useGlobalFilters(new AllExceptionFilter())

  await app.listen()
})
