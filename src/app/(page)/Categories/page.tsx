import { categoriesI } from '@/interface/category';
import { getAllcategories } from '@/services/category.service';
import Image from 'next/image';
import React from 'react'

export default async function categories() {
    const { data } = await getAllcategories()
    const categories: categoriesI[] = data
    console.log(categories);
    return (
        <main>
            <section className='mx-auto max-w-6xl py-25'>
                <h2 className='font-bold text-2xl py-10'>Brands</h2>
                <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
                    {categories.map((cats) =>
                        <div className=' shadow-md rounded-lg overflow-hidden mt-4' key={cats._id}>
                            <div className=' col-span-1 h-60 relative '>
                                <Image fill src={cats.image} alt={cats.name}></Image>
                            </div>
                            <p className='text-center font-bold text-lg'>{cats.name}</p>
                        </div>
                    )}

                </div>
                <div className=" text-red-500 hidden">
                    test
                </div>
            </section>
        </main>
    )
}
