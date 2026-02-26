import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const decodedToken = (await cookies()).get("next-auth.session-token")?.value
    const userToken = await decode({ token: decodedToken, secret: process.env.AUTH_SECRET! })
    console.log(userToken?.token);

    return userToken?.token as string
}