import { cartProductI } from "./cart"
import { ProductI } from "./product"

export type Root = UserOrderI[]
export interface UserOrderI {
    shippingAddress?: ShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: User
    cartItems: cartProductI[]
    createdAt: string
    updatedAt: string
    id: number
    __v: number
    paidAt?: string
}

export interface ShippingAddress {
    details: string
    city: string
    phone?: string
    postalCode?: string
}

export interface User {
    _id: string
    name: string
    email: string
    phone: string
}
export type OrderCart = cartProductI[]
