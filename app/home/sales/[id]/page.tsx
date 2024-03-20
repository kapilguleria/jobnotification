"use client"
import { Button } from '@/components/ui/button'
import { getSalesProjectDescription } from '@/utils/sales'
import React, { useEffect, useState } from 'react'
import moment from "moment"


const page = ({ params }: { params: { id: string } }) => {
    const [data, setdata] = useState<any>("")
    const [content, setContent] = useState("")
    const [postedOn, setPostedOn] = useState("")
    const [category, setCategory] = useState("")
    const [skills, setSkills] = useState("")
    const [country, setCountry] = useState("")
    const [applyLink, setApplyLink] = useState("")
    const [budget, setBudget] = useState("")

    const [getProjectDescription, setGetProjectDescription] = useState("")

    const getProjectDescriptionnFunc = async (content: string) => {
        const res = await getSalesProjectDescription(content)
        setGetProjectDescription(res?.data?.data?.message?.content)
    }

    useEffect(() => {
        const getData = localStorage?.getItem("salesDetails")

        if (getData != null) {
            const dataToadd = JSON.parse(getData)
            console.log('dataToadd', dataToadd)
            setdata(dataToadd?.content)
        }
    }, [])


    useEffect(() => {
        const jobDescriptionRegex = /Job\s*Description:<br \/>(.*?)/;
        const postedOnRegex = /<b>Posted On<\/b>: (.*?)<br \/>/;
        const categoryRegex = /<b>Category<\/b>: (.*?)<br \/>/;
        const skillsRegex = /<b>Skills<\/b>:(.*?)<br \/>(.*?)<br \/>/s;
        const countryRegex = /<b>Country<\/b>: (.*?)\n/;
        const applyLinkRegex = /<a href="(.*?)">click to apply<\/a>/;
        const budgetRegex = /<b>Budget<\/b>: \$([\d,]+)/;

        const postedOnMatch = data.match(postedOnRegex);
        const categoryMatch = data.match(categoryRegex);
        const skillsMatch = data.match(skillsRegex);
        const countryMatch = data.match(countryRegex);
        const applyLinkMatch = data.match(applyLinkRegex);
        const budgetMatch = data.match(budgetRegex);


        const postedOn = postedOnMatch ? postedOnMatch[1] : '';
        const category = categoryMatch ? categoryMatch[1] : '';
        const skills = skillsMatch ? skillsMatch[1] : '';
        const country = countryMatch ? countryMatch[1] : '';
        const applyLink = applyLinkMatch ? applyLinkMatch[1] : '';
        const budget = budgetMatch ? budgetMatch[1] : '';


        let content = data.replace(jobDescriptionRegex, '')
            .replace(postedOnRegex, '')
            .replace(categoryRegex, '')
            .replace(skillsRegex, '')
            .replace(countryRegex, '')
            .replace(applyLinkRegex, '')
            .replace(budgetRegex, '')

        setContent(content)
        setPostedOn(postedOn)
        setCategory(category)
        setSkills(skills)
        setCountry(country)
        setApplyLink(applyLink)
        setBudget(budget)
    }, [data])


    return (
        <div className='h-[94%] w-full flex overflow-x-hidden'>
            <div className='w-[70%] h-full border-r-2 pt-5 overflow-y-scroll'>
                <div className='w-full flex justify-between'>
                    <span className='text-2xl font-medium' >Job Description</span>
                </div>
                <div className='w-[80%]'>
                    <div className='mt-5' dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <div className='w-full h-12 rounded-md border-[1px] border-black flex justify-between items-center cursor-pointer' onClick={() => {
                    getProjectDescriptionnFunc(content)
                }}>
                    <span className='ml-5 font-medium text-lg'>Project Understanding</span>
                    {/* <FaArrowDownLong className='mr-5 text-xl font-medium' /> */}
                    <Button size="sm" className='mr-3'>Generate Details</Button>
                </div>

                {getProjectDescription && (
                    <div className='flex items-center justify-center'>
                        <span className=' text-base w-full mt-1 h-auto rounded-md'>{getProjectDescription}</span>
                    </div>
                )}

            </div>
            <div className='w-[30%] h-full flex flex-col p-4 items-center'>
                <div className='w-full flex justify-start flex-col gap-5'>
                    {postedOn && (
                        <span className='text-lg font-medium'>Posted on: <span className='text-base font-normal'>{moment.utc(postedOn).local().format("YYYY-MM-DD h:mm A")}</span></span>
                    )}
                    {category && (
                        <span className='text-lg font-medium'>Category: <span className='text-base font-normal'>{category}</span></span>
                    )}
                    {skills && (
                        <span className='text-lg font-medium'>Skills: <span className='text-base font-normal'>{skills}</span></span>
                    )}
                    {country && (
                        <span className='text-lg font-medium'>Country: <span className='text-base font-normal'>{country}</span></span>
                    )}
                    {budget && (
                        <span className='text-lg font-medium'>Budget: <span className='text-base font-normal'>${budget}</span></span>
                    )}
                </div>
                <Button className='w-[90%] mt-10' onClick={() => {
                    window.open(applyLink, '_blank');
                }}>
                  Go to Job
                </Button>
                <br />
                {/* {getProjectDescription && (
                    <span>{getProjectDescription}</span>
                )} */}
            </div>
        </div>
    )
}

export default page