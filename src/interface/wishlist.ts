import { ProductI } from "./product"

export interface WishlistI {
    status: string
    count: number
    data: ProductI[]
}
export interface WishlistContextI {
    numOfWishlist: number,
    handleWishlist: () => void,
    isLoadingW: boolean
}