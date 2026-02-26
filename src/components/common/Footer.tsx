import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className='bg-white border-t py-12'>
                <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10'>
                    <div>
                        <h3 className='flex gap-1 font-bold text-xl mb-5'><span className=' bg-black text-white mr-1 w-7 h-7 flex items-center justify-center'>S</span>Shopmart</h3>
                        <ul>
                            <li className='text-gray-600 mb-5'>Your one-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</li>
                            <li className='flex items-center gap-2 text-gray-600 mb-3'><MapPin className='size-4' />123 Shop Street, Octoper City, DC 12345</li>
                            <li className='flex items-center gap-2 text-gray-600 mb-3'><Phone className='size-4' />(+20)010933333333</li>
                            <li className='flex items-center gap-2 text-gray-600 mb-3'><Mail className='size-4' />support@shopmart.com</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className=' font-bold text-xl mb-5 uppercase'>shop</h3>
                        <ul>
                            <li className=' text-gray-600 mb-3'>Electronics</li>
                            <li className=' text-gray-600 mb-3'>Fashion</li>
                            <li className=' text-gray-600 mb-3'>Home&Garden</li>
                            <li className=' text-gray-600 mb-3'>Sports</li>
                            <li className=' text-gray-600 mb-3'>Deals</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className=' font-bold text-xl mb-5 uppercase'>customer servise</h3>
                        <ul>
                            <li className=' text-gray-600 mb-3'>Contact Us</li>
                            <li className=' text-gray-600 mb-3'>Help Center</li>
                            <li className=' text-gray-600 mb-3'>Track Your Order</li>
                            <li className=' text-gray-600 mb-3'>Returns&Exchenges</li>
                            <li className=' text-gray-600 mb-3'>Size Guide</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className=' font-bold text-xl mb-5 uppercase'>about</h3>
                        <ul>
                            <li className=' text-gray-600 mb-3'>About Shopmart</li>
                            <li className=' text-gray-600 mb-3'>Careers</li>
                            <li className=' text-gray-600 mb-3'>Press</li>
                            <li className=' text-gray-600 mb-3'>Investor Relation</li>
                            <li className=' text-gray-600 mb-3'>Sustainability</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className=' font-bold text-xl mb-5 uppercase'>policies</h3>
                        <ul>
                            <li className=' text-gray-600 mb-3'>Privicy Policy</li>
                            <li className=' text-gray-600 mb-3'>Term of Service</li>
                            <li className=' text-gray-600 mb-3'>Cookie Policy</li>
                            <li className=' text-gray-600 mb-3'>Shipping Policy</li>
                            <li className=' text-gray-600 mb-3'>Refund Policy</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
