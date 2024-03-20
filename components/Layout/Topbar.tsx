"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getOrganisation } from '@/utils/origanisation'

const Topbar = () => {
  const [orgData, setOrgData] = useState<any>([])

  const getOrg = async () => {
    const data = await getOrganisation()
    setOrgData(data?.data?.data)
  }

  useEffect(() => {
    getOrg()
  }, [])


  return (
    <div className=' w-full h-full flex items-center border-b-2 gap-6 justify-end pr-9'>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Organisation" />
          </SelectTrigger>
          <SelectContent>
            {orgData?.map((item: any) => {
              return (

                <SelectItem value={item?.organisation_name} key={item?._id}>{item?.organisation_name}</SelectItem>
                )
            })}
         
          </SelectContent>
        </Select>

      </div>
      <div>
        <Button>Invite User</Button>
      </div>
    </div>
  )
}

export default Topbar