import React, { useContext } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { cartProductI } from '@/interface/cart';
import { deleteItem, updateItem } from '@/app/_actions/cart.action';
import { cartContext } from '@/providers/cart-provider';

export default function CartItem({ product, setproducts }: { product: cartProductI, setproducts: (products: cartProductI) => void }) {
    const { handleCart } = useContext(cartContext)
    async function deleteProduct(id: string) {
        try {
            const data = await deleteItem(id)
            setproducts(data.data.products)
            handleCart()
        } catch (error) {
            console.log(error);

        }
    }
    async function updateProductCount(id: string, newCount: number) {
        try {
            const response = await updateItem(id, newCount)
            console.log(response);
            setproducts(response.data.products)
            handleCart()
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className='shadow-md rounded-lg overflow-hidden flex justify-between p-3 m-3'>
                <div className='flex gap-2'>
                    <div>
                        <Image src={product.product.imageCover} alt={product.product.title} width={120} height={120}></Image>
                    </div>
                    <div className='flex justify-start flex-col'>
                        <h3 className='font-bold text-lg'>{product.product.title}</h3>
                        <p className='text-gray-600 text-sm'>
                            {product.product.brand.name}-{product.product.category.name}
                        </p>
                        <div className='flex'>
                            <Button onClick={() => { updateProductCount(product.product._id, product.count - 1) }} variant="outline" size="icon" className='rounded-r-none'>
                                <Minus />
                            </Button>
                            <span className=" flex items-center justify-center h-9 w-9 border border-input bg-background text-sm font-medium shrink-0">
                                {product.count}
                            </span>
                            <Button onClick={() => { updateProductCount(product.product._id, product.count + 1) }} variant="outline" size="icon" className='rounded-l-none'>
                                <Plus />
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className='font-bold text-lg'>EGP{product.price * product.count}.00</h3>
                    <p className='text-gray-600 text-sm text-right'>each</p>
                    <Button onClick={() => { deleteProduct(product.product._id) }} className='mt-2.5 cursor-pointer text-red-600 border-none bg-white hover:bg-white'>Remove</Button>
                </div>
            </div>
        </>
    )
}
