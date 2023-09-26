import { Module } from '@nestjs/common'
import { UserModule } from '@clients'
import { UserController } from './user.controller'

@Module({
  imports: [UserModule],
  controllers: [UserController],
})
export class UserGatewayModule {}
