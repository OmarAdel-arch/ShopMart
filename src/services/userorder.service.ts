const API_url = process.env.NEXT_PUBLIC_BASE_URL
export async function getUserOrder(userId: string) {
    const response = await fetch(`${API_url}/orders/user/${userId}`)
    const data = await response.json()
    return data
}