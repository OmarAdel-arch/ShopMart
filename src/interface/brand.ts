export interface BrandI {
    _id: string
    name: string
    slug: string
    image: string
}
// export type BrandsI = BrandInfI[]

export interface BrandInfI {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
}
export interface BrandDataI {
    results: number
    metadata: BrandMetadata
    data: BrandInfI[]
}

export interface BrandMetadata {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
}
