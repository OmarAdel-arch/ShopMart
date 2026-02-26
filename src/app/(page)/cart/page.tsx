"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { clearCart, getLogUserCart } from '@/app/_actions/cart.action';
import CartItem from '@/components/cart/cart-item';
import { cartDataI, cartI, cartProductI } from '@/interface/cart';
import { Trash2 } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link'
import { cartContext } from '@/providers/cart-provider';
import { Paymant } from '@/components/cart/paymant';

export default function Cart() {
    const [isLoading, setIsLoading] = useState(true)
    const { handleCart } = useContext(cartContext)
    const [products, setproducts] = useState<cartProductI[] | []>([])
    const [cart, setCart] = useState<cartI | null>(null)
    const [cartData, setCartData] = useState<cartDataI | null>(null)
    const [cartId, setCArtId] = useState<string>("")
    const { noOfCartItems } = useContext(cartContext)
    async function getUserCart() {
        try {
            const data: cartI = await getLogUserCart()
            setproducts(data.data.products)
            setCart(data)
            setCartData(data.data)
            setCArtId(data.cartId)
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }
    async function clearUserCart() {
        try {
            const data = await clearCart()
            setproducts([])
            handleCart()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserCart()
    }, [])
    if (isLoading) {
        return <>
            <div className='h-screen flex justify-center items-center'>
                <Spinner className="size-8" /> Loading....
            </div>
        </>
    }
    if (products.length == 0) {
        return <>
            <div className='h-screen flex justify-center items-center'>
                Cart is Empty, Go <Link href='/product' className='text-blue-400'>Shop Now!</Link>
            </div>
        </>
    }
    return (
        <main>
            <section className='container mx-auto max-w-6xl py-25 px-5'>
                <h2 className='font-bold text-2xl mb-2'>Shopping Cart</h2>
                <p className='text-gray-600 text-sm font-medium'>{cart?.numOfCartItems} items in your cart</p>
                <div className='md:grid md:grid-cols-3 md:gap-4 mt-3'>
                    <div className='md:col-span-2'>
                        {products.map((prod) => <CartItem key={prod._id} setproducts={setproducts} product={prod} />)}

                    </div>
                    <div>
                        <div className='shadow-md md:shadow-lg rounded-lg overflow-hidden p-3 h-fit mb-4'>
                            <h3 className='font-bold text-lg mb-3'>Order Summart</h3>
                            <div className='flex justify-between  mb-1.5'>
                                <p className='text-sm'>subtotal ({noOfCartItems}items)</p>
                                <p className='text-sm'>EGP {cartData?.totalCartPrice}.00</p>
                            </div>
                            <div className='flex justify-between mb-1.5'>
                                <p className='text-sm'>Shipping</p>
                                <p className='text-md text-green-500'>Free</p>
                            </div>
                            <hr />
                            <div className='flex justify-between  mt-1 mb-2.5'>
                                <p className='font-bold text-lg'>Tottle</p>
                                <p className='text-md font-normal'>EGP {cartData?.totalCartPrice}.00</p>
                            </div>
                            <Paymant cartId={cartId} />

                        </div>
                        <div className='flex justify-end'>
                            <Button onClick={clearUserCart} variant="outline" className='text-red-500'><Trash2 />Clear Cart</Button>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}
