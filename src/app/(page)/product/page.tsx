import AddCartBtn from '@/components/products/addToCartBtn';
import AddWlBtn from '@/components/products/addToWlBtn';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductI } from '@/interface/product';
import { getAllProduct } from '@/services/product.services';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Product() {
    const { data } = await getAllProduct()
    console.log(data);

    const products: ProductI[] = data

    return (
        <main>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 py-25 mx-auto max-w-6xl'>
                {products.map((prod) =>
                    <React.Fragment key={prod.id}>

                        <Card className="relative mx-auto w-full max-w-sm pt-0 rounded-md overflow-hidden">
                            <Link href={`/product/${prod.id}`}>
                                <div className=' col-span-1 w-full h-100 relative'>
                                    <Image fill src={prod.imageCover} alt={prod.title}></Image>
                                </div>
                                <CardHeader>
                                    <CardDescription className=' text-xs'>{prod.brand.name}</CardDescription>
                                    <CardTitle className='font-bold truncate'>{prod.title}</CardTitle>
                                    <CardDescription className=' text-xs'>{prod.category.name}</CardDescription>
                                    <CardContent className='px-0 flex'>
                                        {[0, 1, 2, 3, 4].map((star) => {
                                            const fillstar = star < Math.round(prod.ratingsAverage)

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
                                        <span className='text-gray-500 text-sm ml-1'>({prod.ratingsQuantity})</span>
                                    </CardContent>
                                    <CardContent className='px-0'>
                                        <p className='font-bold text-lg'>EGP {prod.price}.00</p>
                                    </CardContent>
                                </CardHeader>
                            </Link>
                            <CardFooter className='flex justify-between gap-3'>
                                <AddCartBtn prodId={prod._id} />
                                <AddWlBtn prodId={prod._id} />

                            </CardFooter>
                        </Card>

                    </React.Fragment>
                )}
            </section>
        </main>
    )
}
