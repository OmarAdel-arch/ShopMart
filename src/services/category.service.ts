import { error } from "console"

const API_url = process.env.NEXT_PUBLIC_BASE_URL
export async function getAllcategories() {
    try {
        const response = await fetch(`${API_url}/categories`)
        const data = await response.json()
        return data
    } catch {
        console.error(error)
    }

}
export async function getSpecificCategory(catId: string) {
    try {
        const response = await fetch(`${API_url}/products?limit=4&category[in]=${catId}`)
        const data = await response.json()
        return data
    } catch {
        console.error(error)
    }

}
