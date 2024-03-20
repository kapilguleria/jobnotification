import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react'

interface AlertPopupProps {
    showAlert: boolean;
    title: string;
    message: string;
    type: string
}

const AlertPopup = ({showAlert, title, message, type}: AlertPopupProps) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (showAlert) {
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 10000)
        }
    }, [showAlert])



    return (
        <>
            {show && (
                <div className="fixed top-4 right-4 p-4 w-[30%]">
                    <Alert variant={type == "error" ? "destructive": "default"}>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>{title}</AlertTitle>
                        <AlertDescription>
                            {message}
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </>
    )
}

export default AlertPopup