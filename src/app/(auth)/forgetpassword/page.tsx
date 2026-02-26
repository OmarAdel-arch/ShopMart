'use client'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgetPasswordSchema, ForgetPasswordSchemaType } from '@/lib/ValidationSchema/auth.schema'
import { forgetpassword } from '@/services/auth.services'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
export default function ForgetPassword() {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: ""
        }
    })
    async function handleFofrgetpassword(values: ForgetPasswordSchemaType) {
        const response = await forgetpassword(values)
        console.log(response);

        if (response?.statusMsg == "success") {
            toast.success(response?.message, { position: "bottom-right" })
            router.push("/login")
        } else {
            toast.error(response?.error, { position: "bottom-right" })
        }

    }
    return (
        <main className='flex justify-center py-30'>
            <section className='w-full max-w-md px-8 py-4 shadow-2xl rounded-lg'>
                <h3 className='text-2xl font-semibold text-center'>Forgot Password</h3>
                <p className='text-center text-sm text-gray-600 mt-3'>Enter your email and we’ll send you a reset code.</p>
                <form onSubmit={form.handleSubmit(handleFofrgetpassword)}>
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
                                    placeholder="example@email.com"
                                    autoComplete="off"
                                    type='email'
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Button className='w-full mt-3'>
                        {form.formState.isSubmitting ? <Spinner /> : "Login"}
                    </Button>
                </form>
                <div className='flex justify-end'>
                    <p className="text-center text-sm mt-4">
                        You Dont Have <Link href="/register" className="underline hover:text-gray-600 font-bold">Account</Link>
                    </p>
                </div>
            </section>
        </main>
    )
}

