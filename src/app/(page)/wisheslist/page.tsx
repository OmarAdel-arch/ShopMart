import React from 'react'
import Image from 'next/image';
import { getLogUserWishlist } from '@/app/_actions/wishlist.action';
import { WishlistI } from '@/interface/wishlist';
import WishlistItemActions from '@/components/wishlist/WishlistItemActions';
import Link from 'next/link';
import { PackageOpen } from 'lucide-react';

export default async function wisheslist() {
    const data: WishlistI = await getLogUserWishlist()
    const prods = data.data
    if (prods.length == 0) {
        return <>
            <div className='h-screen flex flex-col justify-center items-center'>
                <div className='text-gray-600'><PackageOpen size={100} /></div>
                <p>no item in your wishlist </p>
            </div>
        </>
    }


    return (
        <>
            <main>
                <section className='mx-auto max-w-6xl py-25'>
                    <h2 className='font-bold text-2xl pt-10 text-center'>Wishlist</h2>
                    <p className='text-gray-500 text-center pt-3 pb-7'>Your favorite item all in one place</p>
                    <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
                        {prods.map((prod) => <React.Fragment key={prod.id}>
                            <div className=' shadow-md rounded-lg overflow-hidden mt-4 p-4'>
                                <div className=' col-span-1 h-[200px] relative'>
                                    <Image fill src={prod.imageCover} alt={prod.title}></Image>
                                </div>
                                <p className='text-center font-bold text-lg'>{prod.title}</p>
                                <p className='text-center font-bold text-lg'>EGP {prod.price}.00</p>
                                <div className=' flex justify-center gap-4'>
                                    <WishlistItemActions productId={prod.id} />

                                </div>
                            </div>
                        </React.Fragment>)}
                    </div>
                </section>
            </main>
        </>
    )
}
