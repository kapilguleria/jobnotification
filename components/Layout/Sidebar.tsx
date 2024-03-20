"use client"

import React, { useEffect, useState } from 'react'
import Logo from "@/public/logo.jpg"
import Image from 'next/image'
import { MdOutlineDashboard } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { useRouter, usePathname  } from 'next/navigation';



const Sidebar = () => {
    const router = useRouter()
    const pathname = usePathname()

    const [activeView, setActiveView] = useState("")
    const [userData, setUserData] = useState<any>(null)


    const handleRoutes = (title: string) => {
        if (title === "dashboard") {
            router.push("/home/dashboard")
            setActiveView("dashboard")
        }
        if (title === "sales") {
            router.push("/home/sales")
            setActiveView("sales")
        }
    }



    useEffect(() => {
        setActiveView(pathname?.split("/")?.[2])
        const storedData = localStorage?.getItem("user");
        if (storedData !== null) {
            const data = JSON.parse(storedData);
            setUserData(data)
        }
    }, [])


    return (
        <div className='h-full w-full flex flex-col justify-between'>
            <div className='flex flex-col items-center w-full'>
                <div>
                    <Image src={Logo} alt='logo' className='w-20 h-20' />
                </div>
                <div className='mt-10 w-full flex items-start pl-10 flex-col gap-5'>
                    <div className='flex items-center justify-center gap-2 cursor-pointer' onClick={() => { handleRoutes('dashboard') }}>
                        <MdOutlineDashboard className={activeView == "dashboard" ? `text-xl text-red-400` : `text-xl`} />
                        <span className={activeView == "dashboard" ? ` text-red-400` : ``}>Dashboard</span>
                    </div>
                    <div className='flex items-center justify-center gap-2 cursor-pointer' onClick={() => { handleRoutes('sales') }}>
                        <BsGraphUp className={activeView == "sales" ? `text-xl text-red-400` : `text-xl`} />
                        <span className={activeView == "sales" ? ` text-red-400` : ``}>Sales</span>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col items-center gap-10 pl-10'>
                <div className='w-full flex  mb-10 items-center gap-5'>
                    <div className='w-10 h-10 bg-red-300 rounded-full flex justify-center items-center text-lg font-medium'>
                        {userData?.data?.email?.split("")?.[0]}
                    </div>
                    <div className='text-lg font-medium'>
                        {userData?.data?.email?.split("@")?.[0]}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
