import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from 'src/schemas/order.schema'

import { CacheModule } from '../cache/cache.module'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), CacheModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
