import React from "react";
import { kai } from "../data/data";
import {shortenAddress, timeAgo} from "../utils/index";

const AboutKai = ({
  detail,
  settings,
  kutte
}) => {
  return (
    <section className={`section bg-[#F3B1A2] ]`}>
    <div className={`sectionContainer text-[#fff]`}>
      <div className="contentContainer bg-[#3B2621] mt-[1rem] text-center">
        <p className="font-bold text-[1.2rem] md:text-[1.5rem]">
          Kutte AI is Set To Rock The Charts With a Whopping 100% ROI (This
          Year Alone!)
        </p>

        <p className="text-[1rem] md:text-[1.2rem]">
          Each Successful trade triggers the purchase and immediate burning of
          Kutte Ai token, increasing demand, reducing supply, and driving
          prices to the moon.
        </p>

        <p className="font-bold text-[1.2rem] md:text-[1.5rem]">
          1 Kutte AI = $ { settings? Number(settings['price']): "0.0002"} ETH
        </p>
      </div>

      {kai.map((item) => (
        <div
          key={item.title}
          className="contentContainer bg-[#3B2621] mt-[1rem]"
        >
          <div className="flex items-center gap-3">
            <div className="w-[40px] md:w-[50px]">
              <img src={item.svg.src} alt={item.title} />
            </div>

            <p className="font-bold text-[1rem] w-full md:w-[30%] md:text-[1.2rem]">
              {item.title}
            </p>
          </div>
          <p className="text-[0.8rem] w-full md:w-[70%] md:text-[1.2rem]">
            {item.text}
          </p>
        </div>
      ))}

      <div className="contentContainer bg-[#3B2621] mt-[1rem]">
        <p className="text-[#FFFFFF82] text-[1rem] md:text-[1.2rem]">
          Recent Buy
        </p>
        {kutte.map((recent)=>(
        <div  key={recent['id']} className="flex justify-between items-center">
          <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
          {shortenAddress(recent["address"])}
          </p>
          <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
          {recent["amount"] }KUT
          </p>
          <p className="text-[0.8rem] md:text-[1.2rem]">{timeAgo(recent['created_at'])}</p>
        </div>
  ))} 
        
      </div>
    </div>
  </section>
  );
};

export default AboutKai;
