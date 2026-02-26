"use client"
import { Heart } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { addToWishlist } from '@/app/_actions/wishlist.action'
import { toast } from 'sonner'
import { wishlistContext } from '@/providers/wishlist-provider'

export default function AddWlBtn({ prodId }: { prodId: string }) {
    const { handleWishlist } = useContext(wishlistContext)
    // const [isLoading, setIsLoading] = useState(false)
    async function addproductToWishlist(productId: string) {
        try {
            const response = await addToWishlist(productId)
            console.log(response);
            if (response.status == "success") {
                toast.success(response.message, { position: "bottom-right" })
            }
            handleWishlist()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Button variant="ghost" className='hover:bg-white cursor-pointer' onClick={() => {
                addproductToWishlist(prodId)
            }}>
                <Heart className='size-6' />
            </Button>
        </>
    )
}
