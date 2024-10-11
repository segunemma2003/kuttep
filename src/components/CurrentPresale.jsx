import React from "react";
import { plane } from "../assets/assets";

const CurrentPresale = () => {
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
              1 KAI = 0.0002 USDT
            </p>
            <p className="text-[1.1rem] md:text-[1.3rem] lg:text-[2rem] font-semibold">
              1000 $KAI = 1 Meter
            </p>
          </div>

          <div className="bg-white rounded-lg px-[0.8rem] py-[1rem] md:px-[1.2rem] md:py-[1.5rem] lg:px-[1.5rem] lg:py-[2rem]">
            <p className="text-[1.3rem] md:text-[1.5rem] lg:text-[2.3rem] font-bold">
              247,121,788/
              <span className="text-[#FFA800]">8000000 Meters</span>
            </p>
            <p className="font-medium text-[1rem] md:text-[1.2rem] lg:text-[1.5rem]">
              <span className="font-bold text-[#3B2621]">Stage 1 = 70%</span> of
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
            <span className="text-[#964C1E]">USD Raised</span> $4,215,177.87
            <br />
            <span className="text-[#964C1E]">$1USDT</span> = 5,000 KAI
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurrentPresale;
