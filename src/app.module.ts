import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OrderModule } from './modules/order/order.module'

@Module({
  imports: [MongooseModule.forRoot('MONGODB_URI'), OrderModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
