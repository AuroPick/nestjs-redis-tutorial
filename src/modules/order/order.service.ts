import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Order, OrderDocument } from 'src/schemas/order.schema'

Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>) {}

  getAll() {
    return this.orderModel.find({}, null, { lean: true })
  }
}
