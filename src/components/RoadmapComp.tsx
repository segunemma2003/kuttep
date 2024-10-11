import React from 'react'


interface Props{
    title: string;
    RMArray: {
        text: string;
    }[];
}

const RoadmapComp = ({ title, RMArray }: Props) => {
  return (
    <div className='flex flex-col items-start gap-2 bg-[#8D8D8D87] rounded-[30px] h-[200px] md:h-[250px] lg:h-[290px] w-full lg:w-fit p-4'>
        <span className='text-[#E95524] text-[20px] md:text-[24px] lg:text-[28px] font-black'> {title} </span>
        
        <div className='text-[8px] md:text-[14px] italic lg:capitalize lg:text-[16px] text-[#F79341] capitalize w-full'>
            {RMArray?.map((item, index) => (
                <li key={index}> {item?.text} </li>
            ))}
        </div>
    </div>
  )
}

export default RoadmapComp