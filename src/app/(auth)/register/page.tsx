'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, registerSchemaType } from '@/lib/ValidationSchema/auth.schema'
import { sginupUser } from '@/services/auth.services'
import { Spinner } from '@/components/ui/spinner'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'


export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        }
    })
    async function handleRegister(values: registerSchemaType) {
        console.log(values);
        const response = await sginupUser(values)
        console.log(response);
        if (response.message == "success") {
            toast.success("success")
            router.push("/login")
        } else {
            toast.error(response.message)
        }
    }
    return (
        <>
            <main className='flex justify-center pt-17 mb-5'>
                <section className='w-full max-w-md px-8 py-4 shadow-2xl rounded-lg'>
                    <p className='text-xl font-medium text-center'>Sign up</p>
                    <form onSubmit={form.handleSubmit(handleRegister)}>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className='mb-y'>Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Name"
                                        autoComplete="off"
                                        type='text'
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>

                            )}
                        />
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
                                    <FieldLabel htmlFor={field.name} className='my-2'>Password</FieldLabel>
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
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="rePassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className='my-2'>RePassword</FieldLabel>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="RePassword"
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
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className='my-2'>Phone Number</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Phone"
                                        autoComplete="off"
                                        type='tel'
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Button className='w-full mt-3'>
                            {form.formState.isSubmitting ? <Spinner /> : "Create Account"}
                        </Button>
                    </form>
                    <p className="text-center text-sm mt-4">
                        Already have an account?
                        <Link href="/login" className="underline hover:text-gray-600 font-bold">Login</Link>
                    </p>
                </section>
            </main>
        </>
    )
}
