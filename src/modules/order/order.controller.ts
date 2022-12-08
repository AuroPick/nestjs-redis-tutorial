import { Controller, Get } from '@nestjs/common'

import { CacheService } from '../cache/cache.service'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cacheService: CacheService
  ) {}

  @Get('')
  async getAll() {
    const cache = await this.cacheService.get('orders')

    if (cache) return cache

    const orders = await this.orderService.getAll()

    await this.cacheService.set('orders', orders)

    return orders
  }
}
