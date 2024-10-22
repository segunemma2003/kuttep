import React from "react";
import { plane } from "../assets/assets";
import { formatNumberWithCommas } from "../lib/utils";

const CurrentPresale = ({settings}) => {
  return (
    <section className={`section bg-[#FAD7C1]`}>
      <div className={`sectionContainer`}>
        <div className="flex flex-col items-center contentContainer">
          <p className="text-[1rem] md:text-[1.3rem] lg:text-[1.8rem] font-medium">
            Current Phase
          </p>
          <h2 className="text-[1.2rem] md:text-[1.5rem] lg:text-[2.5rem]">
            Presale Stage 1
          </h2>

          <div>
            <p className="text-[1.1rem] md:text-[1.3rem] lg:text-[2rem] font-semibold">
            1 KAI = {settings? Number(settings['price']): "0.0002"} ETH
            </p>
            <p className="text-[1.1rem] md:text-[1.3rem] lg:text-[2rem] font-semibold">
              40,000,000,000 KAI = 1 Meter
            </p>
          </div>

          <div className="bg-white rounded-lg px-[0.8rem] py-[1rem] md:px-[1.2rem] md:py-[1.5rem] lg:px-[1.5rem] lg:py-[2rem]">
            <p className="text-[1.3rem] md:text-[1.5rem] lg:text-[2.3rem] font-bold">
            {settings? formatNumberWithCommas(Number(settings['amount_raised_in_usdt'])): "245,353,533"} /
              <span className="text-[#FFA800]">{settings?formatNumberWithCommas(Number(settings['coin'])): "40,000,000,000"} Meters</span>
            </p>
            <p className="font-medium text-[1rem] md:text-[1.2rem] lg:text-[1.5rem]">
              <span className="font-bold text-[#3B2621]">Stage 1 = 40%</span> of
              the Journey
            </p>
            <p className="font-medium text-[1rem] md:text-[1.2rem] lg:text-[1.5rem]">
              Remaining meters until{" "}
              <span className="font-bold text-[#3B2621]">stage 1</span>
            </p>
          </div>

          <img
            src={plane}
            className="w-[80%] md:w-[70%] lg:w-[50%]"
            alt="plane"
          />

          <p className="text-center text-[1.1rem] md:text-[1.3rem] lg:text-[1.8rem] font-semibold">
            <span className="text-[#964C1E]">USD Raised</span> ${settings? formatNumberWithCommas(Number(settings['amount_raised_in_dollars'])): "4,215,177.87"}
            <br />
            <span className="text-[#964C1E]">1ETH</span> = {settings? formatNumberWithCommas(Number(settings['price']) * 10000000): "20,000"} KAI
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurrentPresale;
