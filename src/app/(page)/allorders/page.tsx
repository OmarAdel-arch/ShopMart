"use client"
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getUserOrder } from '@/services/userorder.service'
import { Root } from '@/interface/userorder'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Star } from 'lucide-react'
import Link from 'next/link'

export default function AllOrders() {
    const [searchTerm, setSearchTerm] = useState("")
    const { data: session } = useSession()
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!session?.user?.id) return

        setLoading(true)
        setError(null)
        getUserOrder(session.user.id)
            .then(data => setOrders(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [session])
    const userOrder: Root = orders
    const filteredOrders = userOrder.filter((order) =>
        order.cartItems.some((item) =>
            item.product.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
    )


    return (
        <>
            <main className='bg-gray-200'>
                <section className='mx-auto max-w-6xl py-25'>
                    <div className='grid grid-cols-2 md:grid-cols-4 py-7'>
                        <h2 className='font-bold text-2xl'>Past Order</h2>
                        <div className='md:col-span-3'>
                            <Field orientation="horizontal">
                                <Input type="search" placeholder="Search..." className='bg-white' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                <Button>Search</Button>
                            </Field>
                        </div>
                    </div>
                    {filteredOrders.map((order) =>
                        <div className='md:grid md:grid-cols-6 md:gap-3 bg-white mb-10 p-5' key={order._id}>
                            <div className='flex justify-center'>
                                <Image width={200} height={200} src={order.cartItems[0].product.imageCover} alt={order.cartItems[0].product.title}></Image>
                            </div>
                            <div className='col-span-3'>
                                <div className='flex justify-between gap-10'>
                                    <h3 className='text-center font-bold text-lg truncate'>{order.cartItems[0].product.title}</h3>
                                    <p className='text-center font-bold text-lg'>EGP{order.totalOrderPrice}.00</p>
                                </div>
                                <div className='flex justify-between my-1.5'>
                                    <div>
                                        <p className='text-sm'>{order.createdAt}</p>
                                        <p className='text-gray-600 text-sm font-light'>{order.cartItems[0].product.subcategory[0].name}</p>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <p>review</p>
                                        <p className='flex'>{[0, 1, 2, 3, 4].map((star) => {
                                            const fillstar = star < Math.round(order.cartItems[0].product.ratingsAverage)

                                            return (
                                                <Star
                                                    key={star}
                                                    className={`size-6 ${fillstar
                                                        ? "text-yellow-500 fill-yellow-500"
                                                        : "text-gray-500 fill-gray-500"
                                                        }`}
                                                />
                                            )
                                        })}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='mt-3'>
                                    <p className='text-sm font-medium'>{order.cartItems[0].product.brand.name}-{order.cartItems[0].product.category.name}</p>
                                </div>
                                <hr />
                                <div>
                                    <Link
                                        href={{
                                            pathname: `/allorders/${order._id}`,
                                            query: { cartItems: JSON.stringify(order.cartItems) }
                                        }}
                                        className='text-blue-800'
                                    >
                                        View Receipt
                                    </Link>
                                </div>
                            </div>
                            <div className='col-span-2 flex justify-center items-center'>
                                <Button className='px-15 py-7'>Order Again</Button>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    )
}
