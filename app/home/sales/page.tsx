"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import moment from "moment"
import { getFeedUpdatesStore, getRSS, getSales } from '@/utils/sales';
import RSSPopup from '@/components/custom/RSSPopup';


const Sales = () => {
  const router = useRouter()
  const [getSalesData, setGetSalesData] = useState<any>([])
  const [overAllSalesData, setoverAllSalesData] = useState<any>([])
  const [rssTitles, setRssTitles] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [countSales, setCountSales] = useState<any>([])
  const [selectedRssTitle, setSelectedRssTitle] = useState({
    title: rssTitles?.length == 0 ? "" : rssTitles?.[0]?.name,
    RSS: rssTitles?.length == 0 ? "" : rssTitles?.[0]?.RSS,
  })

  const getFeedUpdatesFunc = async () => {
    const data: any = await getFeedUpdatesStore();
    setCountSales(data?.data?.data)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getFeedUpdatesFunc()
    }, 20000);

    return () => clearInterval(interval);
  }, [countSales]);


  const getRSSDataFunc = async () => {
    setLoading(true)
    const data: any = await getSales(selectedRssTitle?.title)
    setGetSalesData(data?.data?.data)
    setLoading(false)
  }




  const fetchDetails = (data: any) => {
    const postedOnRegex = /<b>Posted On<\/b>: (.*?)<br \/>/;
    const categoryRegex = /<b>Category<\/b>: (.*?)<br \/>/;
    const skillsRegex = /<b>Skills<\/b>:(.*?)<br \/>(.*?)<br \/>/s;
    const countryRegex = /<b>Country<\/b>: (.*?)\n/;
    const applyLinkRegex = /<a href="(.*?)">click to apply<\/a>/;

    const postedOnMatch = data.match(postedOnRegex);
    const categoryMatch = data.match(categoryRegex);
    const skillsMatch = data.match(skillsRegex);
    const countryMatch = data.match(countryRegex);
    const applyLinkMatch = data.match(applyLinkRegex);

    const postedOn = postedOnMatch ? postedOnMatch[1] : '';
    const category = categoryMatch ? categoryMatch[1] : '';
    const skills = skillsMatch ? skillsMatch[1] : '';
    const country = countryMatch ? countryMatch[1] : '';
    const applyLink = applyLinkMatch ? applyLinkMatch[1] : '';

    let finalData = {
      postedOn: postedOn,
      category: category,
      skills: skills,
      country: country,
      applyLink: applyLink
    }
    return finalData;
  }

  const fetchRSSTtitles = async () => {
    const getRssData = await getRSS()
    setRssTitles(getRssData?.data?.data)
    setLoading(false)
    setOpenDialog(false)
  }

  useEffect(() => {
    if (selectedRssTitle?.title != "" && selectedRssTitle?.RSS != "") {
      getRSSDataFunc()
    }
  }, [selectedRssTitle])

  useEffect(() => {
    fetchRSSTtitles()
  }, [])

  useEffect(() => {
    if (loading) {
      fetchRSSTtitles()
    }
  }, [loading])

  useEffect(() => {
    let salesItemData: any = []
    let salesSkills: any = []
    getSalesData?.map((item: any) => {
      let salesData: any = fetchDetails(item?.content)
      console.log('salesData', salesData)
      salesData["title"] = item?.title

      let dataNow = salesData?.skills?.split(",")
      dataNow?.map((item: any) => {
        let trimData = item?.trim(" ")
        salesSkills?.push(trimData)
      })

      salesData["skills"] = salesSkills
      salesSkills = []
      salesItemData?.push(salesData)
    })
    setoverAllSalesData(salesItemData)
  }, [getSalesData])



  return (
    <>
      <div className='flex flex-col gap-4 pt-3 overflow-y-scroll h-[94%] overflow-x-hidden pb-3'>
        <Tabs defaultValue={selectedRssTitle?.title} className="w-full">
          <TabsList className='w-full flex justify-between bg-white'>
            <div >
              {rssTitles?.map((item: any, index: number) => {
                return (
                  <>
                    <TabsTrigger key={item?._id} value={item?.name} onClick={(e) => {
                      setSelectedRssTitle({
                        title: item?.name,
                        RSS: item?.RSS
                      })
                      console.log('item?.name', item?.name)
                    }} >
                      {item?.name}
                      <span className="ml-2 ">{countSales?.[index]?.name == item?.name ?  countSales?.[index]?.count : 0}</span> 
                    </TabsTrigger>
                  </>
                )
              })}
            </div>
            <div className='mr-20'>
              <Button size="sm" onClick={() => {
                setOpenDialog(true)
              }}>Click Me</Button>
            </div>
          </TabsList>
        </Tabs>
        {overAllSalesData?.map((item: any, index: number) => {
          return (
            <div className='border-[1px] border-black rounded-md flex items-center pl-4 w-[95%] justify-between py-3 '>
              <div className='flex flex-col gap-2'>
                <span className='text-lg font-medium'>{item?.title}</span>
                <div className='mt-3 flex flex-col gap-2'>
                  {item?.category && (
                    <span><span className='text-lg font-medium'>Category:</span> {item?.category}</span>
                  )}
                  {item?.country && (
                    <span><span className='text-lg font-medium'>Country:</span> {item?.country}</span>
                  )}
                  {item?.skills?.length != 0 && (
                    <div className='flex gap-2'>
                      <span className='text-lg font-medium'>Skills:</span>
                      <div className='flex gap-2 flex-row '>
                        {item?.skills?.map((item: any) => {
                          return (
                            <Badge variant="outline">{item}</Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {item?.postedOn && (
                    // 
                    <span><span className='text-lg font-medium'>Posted On:</span>{" "}{moment.utc(item?.postedOn).local().format("YYYY-MM-DD h:mm A")}</span>
                  )}
                </div>
              </div>
              <div className='pr-5'>
                <Button onClick={() => {
                  localStorage?.setItem("salesDetails", JSON.stringify(getSalesData?.[index]))
                  router.push(`/home/sales/${index + 1}`)
                }}>View</Button>
              </div>
            </div>
          )
        })}
        <RSSPopup openDialog={openDialog} setLoading={setLoading} />
      </div>
    </>

  )
}

export default Sales