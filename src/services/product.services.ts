import { error } from "console"

const API_url = process.env.NEXT_PUBLIC_BASE_URL
export async function getAllProduct() {
    try {
        const response = await fetch(`${API_url}/products`)
        const data = await response.json()
        return data
    } catch {
        console.error(error)
    }

}
export async function getSpecificProduct(id: string) {
    try {
        const response = await fetch(`${API_url}/products/${id}`)
        const data = await response.json()
        return data
    } catch {
        console.error(error)
    }

}