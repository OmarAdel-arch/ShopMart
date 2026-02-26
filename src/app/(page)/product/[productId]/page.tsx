import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductI, productIdType, RelatedProductI } from '@/interface/product';
import { getSpecificProduct } from '@/services/product.services';
import { Heart, Star } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel"
import Image from 'next/image';
import React from 'react'
import AddCartBtn from '@/components/products/addToCartBtn';
import { getSpecificCategory } from '@/services/category.service';

export default async function ProductDetails({ params }: { params: Promise<productIdType> }) {
    const { productId } = await params
    const { data } = await getSpecificProduct(productId)
    const ProductInf: ProductI = data
    const relatedProducts: RelatedProductI = await getSpecificCategory(ProductInf.category._id)
    console.log(relatedProducts);


    return (
        <>
            <main>
                <section className='py-25 mx-auto max-w-6xl'>
                    <Breadcrumb className='font-bold text-sm'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/product">Products</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className='font-bold text-sm'>Product Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className='py-8'>
                        <Card className="relative mx-auto w-full pt-0 rounded-md overflow-hidden grid md:grid-cols-3">
                            <Carousel opts={{
                                align: "start",
                                loop: true,
                            }}>
                                <CarouselContent>
                                    {ProductInf.images.map((img, index) =>
                                        <CarouselItem key={index}>
                                            <div className=' col-span-1 w-full h-100 relative'>
                                                <Image fill src={img} alt={ProductInf.title}></Image>
                                            </div>
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                            </Carousel>
                            <div className='md:col-span-2 flex flex-col justify-center'>
                                <CardHeader>
                                    <CardDescription className=' text-xs'>{ProductInf.brand.name}</CardDescription>
                                    <CardTitle className='font-bold'>{ProductInf.title}</CardTitle>
                                    <CardDescription className=' text-xs'>{ProductInf.category.name}</CardDescription>
                                    <CardDescription className=' text-xs text-black font-medium'>{ProductInf.description}</CardDescription>
                                    <CardContent className='px-0 flex'>
                                        {[0, 1, 2, 3, 4].map((star) => {
                                            const fillstar = star < Math.round(ProductInf.ratingsAverage)

                                            return (
                                                <Star
                                                    key={star}
                                                    className={`size-6 ${fillstar
                                                        ? "text-yellow-500 fill-yellow-500"
                                                        : "text-gray-500 fill-gray-500"
                                                        }`}
                                                />
                                            )
                                        })}
                                        <span className='text-gray-500 text-sm ml-1'>({ProductInf.ratingsAverage})</span>
                                    </CardContent>
                                    <CardContent className='px-0'>
                                        <p className='font-bold text-lg'>EGP {ProductInf.price}.00</p>
                                    </CardContent>
                                </CardHeader>
                                <CardFooter className='flex justify-between gap-3'>
                                    <AddCartBtn prodId={ProductInf._id} />
                                    <Heart className='size-6' />
                                </CardFooter>
                            </div>
                        </Card>
                    </div>
                    <h3 className='text-lg font-bold text-center mb-4'>You might also like</h3>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {relatedProducts.data.map((relatedProduct) =>
                            <div className='flex flex-col items-center gap-2' key={relatedProduct.id}>
                                <div className=''>
                                    <Image width={200} height={200} src={relatedProduct.imageCover} alt={relatedProduct.title}></Image>
                                </div>
                                <p className='font-medium truncate'>{relatedProduct.title}</p>
                                <p className='text-gray-600 text-sm'>EGP{relatedProduct.price}.00</p>
                                <AddCartBtn prodId={relatedProduct._id} />
                            </div>
                        )}

                    </div>
                </section>
            </main>
        </>
    )
}
