import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl
    const protectedRoutes = [
        "/cart",
        "/brand",
        "/myorder",
        "/Categories",
        "/wisheslist",
    ]
    const authRoutes = ["/login", "/register"]
    if (token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (!token && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: [
        "/cart",
        "/brand",
        "/myorder",
        "/Categories",
        "/wisheslist",
        "/login",
        "/register",
    ],
}