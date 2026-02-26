"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { Spinner } from "../ui/spinner"
import { onlineCheckout } from "@/app/_actions/cart.action"
import { toast } from 'sonner'

export function Paymant({ cartId }: { cartId: string }) {
    const form = useForm({
        defaultValues: {
            shipingAddress: {
                city: "",
                details: "",
                phone: ""
            }
        }
    })
    async function handleOnlineCheckout(values: any) {
        try {
            console.log(values);
            const data = await onlineCheckout(cartId, values)
            console.log(data);
            if (data.status == "success") {
                window.location.href = data.session.url
            }
        } catch (error) {
            toast.error("someting Wrong try again later", { position: "bottom-right" })
        }

    }
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className='w-full'>Proceed to Checkout</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="font-bold">Check out</DialogTitle>
                        <DialogDescription>
                            Add a shiping address for your deliveries.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(handleOnlineCheckout)}>
                        <Controller
                            name="shipingAddress.city"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className='my-2'>City</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder=""
                                        autoComplete="off"
                                        type='text'
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="shipingAddress.details"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className='my-2'>Details</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder=""
                                        autoComplete="off"
                                        type='text'
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="shipingAddress.phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className='my-2'>Phone Number</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder=""
                                        autoComplete="off"
                                        type='tel'
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <div className="flex gap-3 mt-3">
                            <DialogClose asChild className="cursor-pointer">
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className='grow cursor-pointer'>
                                {form.formState.isSubmitting ? <Spinner /> : "CheckOut"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </form>
        </Dialog>
    )
}
