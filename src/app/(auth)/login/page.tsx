'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, loginSchemaType } from '@/lib/ValidationSchema/auth.schema'
import { Spinner } from '@/components/ui/spinner'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff } from 'lucide-react'


export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    async function handlelogin(values: loginSchemaType) {
        const response = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })
        console.log(response);

        if (response?.ok) {
            toast.success("success", { position: "bottom-right" })
            router.push("/product")
        } else {
            toast.error(response?.error, { position: "bottom-right" })
        }

    }
    return (
        <>
            <main className='flex justify-center py-30'>
                <section className='w-full max-w-md px-8 py-4 shadow-2xl rounded-lg'>
                    <p className='text-xl font-medium text-center'>Sign in</p>
                    <form onSubmit={form.handleSubmit(handlelogin)}>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className='my-2'>Email</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Email"
                                        autoComplete="off"
                                        type='email'
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className='my-2'>
                                        Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="password"
                                            autoComplete="off"
                                            type={showPassword ? "text" : "password"}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                                        >
                                            {showPassword ? <EyeOff /> : <Eye />}
                                        </button>
                                    </div>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Button className='w-full mt-3'>
                            {form.formState.isSubmitting ? <Spinner /> : "Login"}
                        </Button>
                    </form>
                    <div className='flex justify-between'>
                        <p className="text-center text-sm mt-4">
                            You Dont Have <Link href="/register" className="underline hover:text-gray-600 font-bold">Account</Link>
                        </p>
                        <p className="text-center text-sm mt-4">
                            <Link href="/forgetpassword" className="underline hover:text-gray-600 font-bold">Forget Password</Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}
