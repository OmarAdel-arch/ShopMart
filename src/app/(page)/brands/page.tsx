import { BrandDataI } from '@/interface/brand';
import { getUserToken } from '@/lib/auth';
import { getAllBrands } from '@/services/brand.service';
import Image from 'next/image';
import React from 'react'

export default async function Brands() {
    const data: BrandDataI = await getAllBrands()
    const brands = data?.data || [];


    getUserToken()
    return (
        <main>
            <section className='mx-auto max-w-6xl py-25'>
                <h2 className='font-bold text-2xl py-10'>Brands</h2>
                <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
                    {brands?.map((brand) =>
                        <div className=' shadow-md rounded-lg overflow-hidden mt-4' key={brand._id}>
                            <div className=' col-span-1 h-60 relative '>
                                <Image fill src={brand.image} alt={brand.name}></Image>
                            </div>
                            <p className='text-center font-bold text-lg'>{brand.name}</p>
                        </div>
                    )}

                </div>
            </section>
        </main>
    )
}
