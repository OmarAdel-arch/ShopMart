import { loginUser } from "@/services/auth.services"
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";
import { tokenI } from "@/interface/token";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (!credentials) return null
                const data = await loginUser(credentials)
                console.log(data);
                if (data.message == "success") {
                    const decodedToken: tokenI = jwtDecode(data.token)
                    return {
                        id: decodedToken.id,
                        user: data.user,
                        token: data.token
                    }
                } else {
                    throw new Error(data.message)
                }

            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.user = user.user
                token.token = user.token
            }
            return token
        },
        session({ session, token }) {
            if (session) {
                session.user = {
                    ...token.user,
                    id: token.id
                }
                session.token = token.token
            }
            return session
        }
    }
}