"use client"
import { Root } from '@/interface/userorder'
import { getUserOrder } from '@/services/userorder.service'
import { User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function page() {
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
    console.log(orders);
    const userOrder: Root = orders

    return (
        <main>
            <section className='py-15'>
                <div className='h-20 relative w-full'>
                    <Image fill src="/Images/ProfileCover.png" alt="ProfileCover"></Image>
                </div>
                <div className='mx-auto max-w-6xl'>
                    <div className='rounded-full h-30 w-30 bg-gray-300 flex justify-center items-center mt-5'>
                        <User size={40} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                Full Name
                            </label>

                            <div className="h-10 w-full rounded-md border border-gray-200 bg-gray-100 px-3 flex items-center text-sm text-gray-800">
                                {userOrder?.[0]?.user?.name}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                Email
                            </label>

                            <div className="h-10 w-full rounded-md border border-gray-200 bg-gray-100 px-3 flex items-center text-sm text-gray-800">
                                {userOrder?.[0]?.user?.email}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                Phone Number
                            </label>

                            <div className="h-10 w-full rounded-md border border-gray-200 bg-gray-100 px-3 flex items-center text-sm text-gray-800">
                                {userOrder?.[0]?.user?.phone}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">
                                language
                            </label>

                            <div className="h-10 w-full rounded-md border border-gray-200 bg-gray-100 px-3 flex items-center text-sm text-gray-800">
                                English
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

