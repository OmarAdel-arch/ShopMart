import * as z from 'zod'
export const registerSchema = z.object({
    name: z.string().nonempty("Name is required").min(3, "name must be atleast 3 character").max(10, "name is too long"),
    email: z.email({ error: "Email is required" }),
    password: z.string().nonempty("Password is required").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),
    rePassword: z.string().nonempty("RePassword is required"),
    phone: z.string().nonempty("phone number is required").regex(/^01[0125][0-9]{8}$/)
}).refine((object) => object.password == object.rePassword, {
    path: ["rePassword"],
    error: "password and repassword does't match"
})
export type registerSchemaType = z.infer<typeof registerSchema>


export const loginSchema = z.object({
    email: z.email({ error: "Email is required" }),
    password: z.string().nonempty("Password is required").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character")
})
export type loginSchemaType = z.infer<typeof loginSchema>

export const forgetPasswordSchema = z.object({
    email: z.email({ error: "Email is required" }),
})
export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>