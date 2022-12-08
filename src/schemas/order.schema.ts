import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: String })
  address: string

  @Prop({ type: String })
  name: string

  @Prop({ type: Number })
  type: number
}

export type OrderDocument = Order & Document

export const OrderSchema = SchemaFactory.createForClass(Order)
