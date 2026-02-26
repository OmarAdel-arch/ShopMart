"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Heart, Menu, ShoppingCart, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { cartContext } from '@/providers/cart-provider'
import { Badge } from '../ui/badge'
import { Spinner } from '../ui/spinner'
import { wishlistContext } from '@/providers/wishlist-provider'


export default function Navbar() {
    const { noOfCartItems, isLoading } = useContext(cartContext)
    const { numOfWishlist, isLoadingW } = useContext(wishlistContext)
    const { data: session, status } = useSession()
    function logoutUser() {
        signOut({ callbackUrl: "/login" })
    }
    return (
        <nav className=' px-5 py-3 bg-[#F5F5F5] shadow-lg fixed top-0 left-0 w-full z-50'>
            <div className='container mx-auto max-w-7xl flex justify-between items-center'>
                <div className='nav-logo'>
                    <Link href='/' className=' text-xl font-bold flex'><span className=' bg-black text-white mr-1 w-7 h-7 flex items-center justify-center rounded-sm'>S</span>Shopmart</Link>
                </div>
                <div className=' nav-link'>
                    <NavigationMenu>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild >
                                <Link href="/product" className=' hover:bg-black hover:text-white font-bold'>Products</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild >
                                <Link href="/Categories" className=' hover:bg-black hover:text-white font-bold'>Categories</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild >
                                <Link href="/brands" className=' hover:bg-black hover:text-white font-bold'>Brands</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenu>
                </div>
                <div className='nav-action flex gap-5'>
                    {session && (
                        <div className='flex gap-3.5'>
                            <Link href="/cart" className='relative'>
                                <ShoppingCart />
                                <Badge className='h-5 min-w-5 absolute bottom-full start-full -translate-x-1/2 translate-y-1/2 rounded-full px-1'>
                                    {isLoading ? <><Spinner /></> : noOfCartItems}
                                </Badge>
                            </Link>
                            <Link href="/wisheslist" className='relative'>
                                <Heart />
                                <Badge className='h-5 min-w-5 absolute bottom-full start-full -translate-x-1/2 translate-y-1/2 rounded-full px-1'>
                                    {isLoadingW ? <><Spinner /></> : numOfWishlist}
                                </Badge>
                            </Link>
                        </div>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className='flex gap-1.5'>
                                <User className='size-6' />
                                <p className=' text-lg font-medium cursor-pointer'>{session?.user?.name}</p>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32">
                            <DropdownMenuGroup>
                                {session ? <>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/allorders">My Order</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem variant="destructive" onClick={logoutUser}>Log out</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </> :
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link href="/login">Login</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/register">Register</Link>
                                        </DropdownMenuItem>
                                    </>
                                }
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}