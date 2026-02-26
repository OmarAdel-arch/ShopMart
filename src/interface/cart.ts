import { ProductI } from "./product"

export interface cartI {
    status: string
    numOfCartItems: number
    cartId: string
    data: cartDataI
}

export interface cartDataI {
    _id: string
    cartOwner: string
    products: cartProductI[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface cartProductI {
    count: number
    _id: string
    product: ProductI
    price: number
}
export interface CartContextI {
    noOfCartItems: number,
    handleCart: () => void,
    isLoading: boolean
}