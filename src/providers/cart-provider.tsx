"use client"

import { getLogUserCart } from '@/app/_actions/cart.action'
import { CartContextI, cartI } from '@/interface/cart'
import React, { createContext, useEffect, useState } from 'react'



export const cartContext = createContext<CartContextI>({
    noOfCartItems: 0,
    handleCart: () => { },
    isLoading: false
})
export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [noOfCartItems, setNoOfCartItems] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    async function handleCart() {
        try {
            setIsLoading(true)
            const data: cartI = await getLogUserCart()
            const total = data.data.products.reduce((accu, prod) => prod.count + accu, 0)
            setNoOfCartItems(total)
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleCart()
    }, [])
    return (
        <cartContext.Provider value={{ noOfCartItems, handleCart, isLoading }}>
            {children}
        </cartContext.Provider>
    )
}
