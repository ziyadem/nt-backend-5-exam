import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { marketConfig, userConfig } from '@config'
import { MarketGatewayModule, UserGatewayModule } from '@module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [userConfig, marketConfig],
      isGlobal: true,
    }),
    UserGatewayModule,
    MarketGatewayModule,
  ],
})
export class App {}
