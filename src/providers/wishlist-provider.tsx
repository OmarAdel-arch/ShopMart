"use client"
import { getLogUserWishlist } from '@/app/_actions/wishlist.action'
import { cartI } from '@/interface/cart'
import { WishlistContextI, WishlistI } from '@/interface/wishlist'
import React, { createContext, useEffect, useState } from 'react'

export const wishlistContext = createContext<WishlistContextI>({
    numOfWishlist: 0,
    handleWishlist: () => { },
    isLoadingW: false
})
export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
    const [numOfWishlist, setNumOfWishlist] = useState(0)
    const [isLoadingW, setIsLoadingW] = useState(false)
    async function handleWishlist() {
        try {
            setIsLoadingW(true)
            const data: WishlistI = await getLogUserWishlist()
            const total = data.count
            setNumOfWishlist(total)
        } catch (error) {
            console.log(error);

        } finally {
            setIsLoadingW(false)
        }
    }

    useEffect(() => {
        handleWishlist()
    }, [])
    return (
        <wishlistContext.Provider value={{ numOfWishlist, handleWishlist, isLoadingW }}>
            {children}
        </wishlistContext.Provider>
    )
}