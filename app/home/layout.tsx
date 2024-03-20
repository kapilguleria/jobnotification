"use client"
import Sidebar from '@/components/Layout/Sidebar'
import Topbar from '@/components/Layout/Topbar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className='w-screen h-screen'>
            <div className='w-full h-full flex'>
                <nav className='w-[15%]'>
                    <Sidebar />
                </nav>
                <div className='w-[85%] h-full'>
                    <div className='w-full h-[6%]'>
                        <Topbar />
                    </div>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default Layout