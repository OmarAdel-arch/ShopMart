"use client";
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { deleteWishlistItem } from '@/app/_actions/wishlist.action';
import { redirect, useRouter } from "next/navigation";
import { cartContext } from '@/providers/cart-provider';
import { addToCart } from '@/app/_actions/cart.action';
import { toast } from 'sonner'
import { wishlistContext } from '@/providers/wishlist-provider';
export default function WishlistItemActions({ productId }: { productId: string }) {
    const { handleWishlist } = useContext(wishlistContext)
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const { handleCart } = useContext(cartContext)
    async function deleteproduct(id: string) {
        try {
            const data = await deleteWishlistItem(id)
            toast.success("Removed from Wishlist", { position: "bottom-right" })
            handleWishlist()
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove product.", { position: "bottom-right" })

        } finally {
            router.refresh();
        }
    }
    async function addproductToCart(id: string) {
        try {
            setIsLoading(true)
            const response = await addToCart(productId)
            console.log(response);
            if (response.status == "success") {
                toast.success(response.message, { position: "bottom-right" })
            }
            deleteproduct(id)
            handleCart()
        } catch (error: any) {
            console.log(error);
            toast.error(error.message, { position: "bottom-right" })
            redirect("/login")

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Button onClick={() => { deleteproduct(productId) }} variant="outline" className='px-5'>Remove</Button>
            <Button onClick={() => { addproductToCart(productId) }} className='px-10'>Add to Cart</Button>
        </>
    )
}
