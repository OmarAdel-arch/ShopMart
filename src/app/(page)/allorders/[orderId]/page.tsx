"use client"
import { OrderCart } from "@/interface/userorder"
import { useSearchParams } from "next/navigation"
import React from "react"

export default function ReceiptPage() {
    const searchParams = useSearchParams()
    const cartItemsString = searchParams.get("cartItems")
    const cartItems: OrderCart = cartItemsString ? JSON.parse(cartItemsString) : []
    console.log(cartItems);
    const total = cartItems.reduce((accu, p) => p.price + accu, 0)
    console.log(total);

    return (
        <>
            <main className="bg-gray-200">
                <section className="mx-auto max-w-6xl py-25">
                    <h2 className="font-bold text-2xl">Recent Order</h2>
                    <div className="flex justify-between gap-2">
                        <p className="text-gray-600">Product Name</p>
                        <p className="text-gray-600">Product Price</p>
                    </div>
                    <div className="border-b border-gray-400"></div>
                    {cartItems.map((items) => <div className="flex justify-between gap-2" key={items._id}>
                        <p>{items.product.title}</p>
                        <p>EGP{items.price}.00</p>
                    </div>)}
                    <div className="flex justify-between mt-8">
                        <p>TOTAL</p>
                        <p>EGY{total}.00</p>
                    </div>
                </section>
            </main>
        </>
    )
}