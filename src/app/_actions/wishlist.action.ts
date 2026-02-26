"use server"
import { getUserToken } from "@/lib/auth"

const API_url = process.env.NEXT_PUBLIC_BASE_URL
export async function addToWishlist(productId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("please Signin first")
    }
    const response = await fetch(`${API_url}/wishlist`, {
        method: "POST",
        body: JSON.stringify({ productId: productId }),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function getLogUserWishlist() {
    const token = await getUserToken()
    if (!token) {
        throw new Error("please Signin first")
    }
    const response = await fetch(`${API_url}/wishlist`, {
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function deleteWishlistItem(productWishlistId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("please Signin first")
    }
    const response = await fetch(`${API_url}/wishlist/${productWishlistId}`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}