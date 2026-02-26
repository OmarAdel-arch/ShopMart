import { BrandI } from "./brand"
import { CategoryI, SubcategoryI } from "./category"

export interface ProductI {
    sold: number
    images: string[]
    subcategory: SubcategoryI[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: CategoryI
    brand: BrandI
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
}
export interface productIdType {
    productId: string
}

export interface RelatedProductI {
    results: number
    metadata: Metadata
    data: ProductI[]
}

export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
}