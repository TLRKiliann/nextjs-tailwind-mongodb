import mongoose, { Model, Schema } from "mongoose";

export type OrderItemType = {
  name: string;
  quantity: number;
  image: string;
  price: number;
}

export type ShippingAddressType = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export type PaymentResultType = {
  id: string;
  status: string;
  email_address: string;
};

export type OrderType = {
  user: mongoose.Schema.Types.ObjectId;
  orderItems: OrderItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  paymentResult?: PaymentResultType;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
}

const OrderSchema:Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems : [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }
      }
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date }
  },
  {
    timestamps: true,
  }
);

const Order: Model<OrderType> = mongoose.models.Order || mongoose.model<OrderType>('Order', OrderSchema);
export default Order;
