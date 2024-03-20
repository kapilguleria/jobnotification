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
import { useRouter } from 'next/navigation'
import { createRSS } from '@/utils/sales'


interface OTPPopup {
    openDialog: boolean,
    setLoading: any
}

const RSSPopup = ({ openDialog, setLoading }: OTPPopup) => {
    const [open, setOpen] = useState(false)
    const [RSSValues, setRSSValues] = useState({
        name: '',
        RSS: ''
    })

    const createRSSFunc = async () => {
        if(RSSValues?.name != "" && RSSValues.RSS != "") {
            await createRSS(RSSValues?.name, RSSValues?.RSS)
            setLoading(true)
        }
        else {
            setLoading(false)
        }
    }
    


    useEffect(() => {
        setOpen(openDialog)
    }, [openDialog])


    return (
        <>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New RSS</DialogTitle>
                        <DialogDescription>
                            You can add RSS over here with a name and the specified RSS
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <label>Name</label>
                        <Input
                            id="link"
                            onChange={(e) => {
                                setRSSValues({
                                    name: e.target.value,
                                    RSS: RSSValues?.RSS
                                })
                            }}
                            placeholder='RSS Name'
                            className='mt-2'
                        />
                    </div>
                    <div>
                        <label>RSS</label>
                        <Input
                            id="link"
                            onChange={(e) => {
                                setRSSValues({
                                    name: RSSValues?.name,
                                    RSS: e.target.value
                                })
                            }}
                            placeholder='Enter RSS...'
                            className='mt-2'
                        />
                    </div>
                    <Button onClick={createRSSFunc}>Create RSS</Button>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default RSSPopup