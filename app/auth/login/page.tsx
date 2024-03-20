"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.jpg"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod"
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { emailStore } from '@/store/auth';
import OTPPopup from '@/components/custom/OTPPopup';
import AlertPopup from '@/components/custom/AlertPopup';
import { login } from '@/utils/auth';
import { useRouter } from 'next/navigation';


const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
    })
})


const Signup = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState({
        alertShow: false,
        title: '',
        message: "",
        type: ""
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            await login({
                email: values?.email,
                password: values?.password
            }).then((res: any) => {
                setLoading(false)
                setShowAlert({
                    alertShow: true,
                    title: "Log In successfull",
                    message: res?.data?.message,
                    type: "default"
                })
                localStorage?.setItem("user", JSON.stringify(res.data))
                router.push("/home/dashboard")
            })
        } catch (error: any) {
            setLoading(false)
            console.log('error', error)
            setShowAlert({
                alertShow: true,
                title: "Log In Failed",
                message: error?.response?.data?.message,
                type: "error"
            })
        }
    }

    return (
        <>
            <AlertPopup showAlert={showAlert?.alertShow} title={showAlert?.title} message={showAlert?.message} type={showAlert?.type} />
            <div className='w-screen h-screen flex'>
                <div className='w-1/2 h-full p-2'>
                    <img className='w-full h-full object-cover rounded-md' src="https://images.unsplash.com/photo-1708924674133-84198ccafde9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="mountain" />
                </div>
                <div className='w-1/2 h-full flex justify-center items-center flex-col'>
                    <Image src={Logo} alt='logo' className='w-36 h-36' />
                    <span className='text-2xl py-5 font-semibold'>Welcome Back!</span>
                    <div className='w-[70%]'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="example@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <br />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <br />
                                <Button type="submit" className={loading ? `w-full bg-slate-400` : `w-full`} size='lg' >Log In</Button>
                            </form>
                        </Form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Signup


