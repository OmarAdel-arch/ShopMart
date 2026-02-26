"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { addToCart } from '@/app/_actions/cart.action'
import { Spinner } from '../ui/spinner'
import { toast } from 'sonner'
import { cartContext } from '@/providers/cart-provider'
import { redirect } from 'next/navigation'


export default function AddCartBtn({ prodId }: { prodId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const { handleCart } = useContext(cartContext)

    async function addproductToCart(productId: string) {
        try {
            setIsLoading(true)
            const response = await addToCart(productId)
            console.log(response);
            if (response.status == "success") {
                toast.success(response.message, { position: "bottom-right" })
            }
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
            <Button className="grow rounded-xl" disabled={isLoading} onClick={() => {
                addproductToCart(prodId)
            }}>{isLoading ? <Spinner /> : <>Add to cart <ShoppingCart className='size-6' /></>}
            </Button>
        </>
    )
}
