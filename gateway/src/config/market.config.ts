import { registerAs } from '@nestjs/config'

declare interface MarketServiceOptions {
  host: string
  port: number
  timeout: number
}

export const marketConfig = registerAs<MarketServiceOptions>(
  'market',
  (): MarketServiceOptions => ({
    host: process.env.MARKET_SERVICE_HOST,
    port: process.env.MARKET_SERVICE_PORT
      ? parseInt(process.env.MARKET_SERVICE_PORT, 10)
      : undefined,
    timeout: process.env.MARKET_SERVICE_TIMEOUT
      ? parseInt(process.env.MARKET_SERVICE_TIMEOUT, 10)
      : undefined,
  }),
)
