import { error } from "console"

const API_url = process.env.NEXT_PUBLIC_BASE_URL
export async function getAllBrands() {
    try {
        const response = await fetch(`${API_url}/brands`)
        const data = await response.json()
        return data
    } catch {
        console.error(error)
    }

}