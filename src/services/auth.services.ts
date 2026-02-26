import { ForgetPasswordSchemaType, loginSchemaType, registerSchemaType } from "@/lib/ValidationSchema/auth.schema"


const API_url = process.env.NEXT_PUBLIC_BASE_URL
export async function sginupUser(formdata: registerSchemaType) {
    const response = await fetch(`${API_url}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function loginUser(formdata: loginSchemaType) {
    const response = await fetch(`${API_url}/auth/signin`, {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function forgetpassword(formdata: ForgetPasswordSchemaType) {
    const response = await fetch(`${API_url}/auth/forgotPasswords`, {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}