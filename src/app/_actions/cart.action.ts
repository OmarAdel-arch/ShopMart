"use server"
import { getUserToken } from "@/lib/auth"

const API_url = process.env.NEXT_PUBLIC_BASE_URL
export async function addToCart(productId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("please Signin first")
    }
    const response = await fetch(`${API_url}/cart`, {
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
export async function getLogUserCart() {
    const token = await getUserToken()
    if (!token) {
        throw new Error("please Signin first")
    }
    const response = await fetch(`${API_url}/cart`, {
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function deleteItem(productCartId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("please Signin first")
    }
    const response = await fetch(`${API_url}/cart/${productCartId}`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function updateItem(productCartId: string, newCount: number) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("please Signin first")
    }
    const response = await fetch(`${API_url}/cart/${productCartId}`, {
        method: "PUT",
        body: JSON.stringify({ count: newCount }),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function clearCart() {
    const token = await getUserToken()
    if (!token) {
        throw new Error("please Signin first")
    }
    const response = await fetch(`${API_url}/cart`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function onlineCheckout(cartId: string, formData: any) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("please Signin first")
    }
    const response = await fetch(`${API_url}/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}