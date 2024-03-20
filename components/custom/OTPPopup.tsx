import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { resendOtp, verifyOtp } from '@/utils/auth'
import AlertPopup from './AlertPopup'
import { useRouter } from 'next/navigation'


interface OTPPopup {
    openDialog: boolean,
    email: string
}

const OTPPopup = ({ openDialog, email }: OTPPopup) => {
    const router = useRouter()

    const [OTP, setOTP] = useState("")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState({
        alertShow: false,
        title: "",
        message: "",
        type: ""
    })


    const submitOtp = async () => {
        setLoading(true)
        await verifyOtp(OTP, email).then((res) => {
            setLoading(false)
            setShowAlert({
                alertShow: true,
                title: "OTP Verified Successfully",
                message: "Your Email is verified. Enjoy!",
                type: "default"
            })
            setOpen(false);
            router.push("/auth/login")
        }).catch((err) => {
            setLoading(false)
            setShowAlert({
                alertShow: true,
                title: "OTP Verification failed",
                message: "OTP is wrong",
                type: "error"
            })
        })
    }

    const resendOtpFunc = async () => {
        setLoading(true)
        await resendOtp(email).then(() => {
            setLoading(false)
            setShowAlert({
                alertShow: true,
                title: "OTP Verified Successfully",
                message: "Your Email is verified. Enjoy!",
                type: "default"
            })
        }).catch((err) => {
            setLoading(false)
            setShowAlert({
                alertShow: true,
                title: "OTP Verification failed",
                message: "OTP is wrong",
                type: "error"
            })
        })
    }

    useEffect(() => {
        setOpen(openDialog)
    }, [openDialog])
    

    return (
        <>
        <AlertPopup showAlert={showAlert?.alertShow} title={showAlert?.title} message={showAlert?.message} type={showAlert?.type} />
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Please Enter Your OTP</DialogTitle>
                    <DialogDescription>
                        You have recieved an OTP token over your email. Please fill it here.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    id="link"
                    value={OTP}
                    onChange={(e) => {
                        setOTP(e.target.value)
                    }}
                    placeholder='Enter OTP...'
                />
                <Button onClick={submitOtp} className={loading ? `bg-slate-500`: ``} >Confirm Email</Button>
                <span>Didn't recieve the email? <span className='text-blue-800 cursor-pointer' onClick={resendOtpFunc}>resend OTP</span></span>
            </DialogContent>
        </Dialog>
        </>
    )   
}

export default OTPPopup