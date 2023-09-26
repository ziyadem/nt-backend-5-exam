import { registerAs } from '@nestjs/config'

declare interface DatabaseConfigOptions {
  url?: string
}

export const dbConfig = registerAs<DatabaseConfigOptions>(
  'db',
  (): DatabaseConfigOptions => ({
    url:
      process.env.DATABASE_URL ??
      'postgresql://postgres:postgres@127.0.0.1:5432/nestjs_many_to_many?=schema=public',
  }),
)
