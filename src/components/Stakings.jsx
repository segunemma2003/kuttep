import React from "react";
import { plane } from "../assets/assets";
import styles from "./Staking.module.css";
import Button from "./Button";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Stakings = () => {
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
            <p className="text-[1rem] md:text-[1rem] lg:text-[2rem] font-bold">
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

          {/*************************************************** FORM **********************************************/}

          <div className="w-full">
            <p className="text-center mb-[1rem]">
              Step 1: Select the payment method
            </p>
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mb-[]">
              <Select className="w-full">
                <SelectTrigger className=" w-full h-[60px] bg-[#fad6a5] border border-[#fff] border-[2px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className=" h-[60px] bg-[#fad6a5] border border-[#fff] border-[2px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className=" h-[60px] bg-[#fad6a5] border border-[#fff] border-[2px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className=" h-[60px] bg-[#fad6a5] border border-[#fff] border-[2px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className=" h-[60px] bg-[#fad6a5] border border-[#fff] border-[2px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className=" h-[60px] bg-[#fad6a5] border border-[#fff] border-[2px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <p className="text-center my-[1rem]">
              Step 2: Enter the amount of token you would like to purchase
            </p>

            {/******* EXCHANGE SECTION   ***************/}
            <div className="flex flex-col w-full gap-4 md:flex-row">
              {/******* INPUT ONE SECTION   ***************/}
              <div className={`${styles.inputContainer} mb-[1rem] md:mb-0 `}>
                <input type="number" className="w-full" />
                <p>SOL</p>
              </div>
              {/******* INPUT TWO SECTION   ***************/}
              <div className={`${styles.inputContainer}`}>
                <input type="number" className="w-full" />
                <p>SOL</p>
              </div>
            </div>

            {/******* REFERAL SECTION   ***************/}
            <div className="flex gap-4 mt-[2rem]">
              <div>
                <p>Add referral code (optional)</p>

                <div className="flex gap-5 items-center text-[0.5rem] md:text-[0.8rem]">
                  <Button text={`Apply Code`} width={`w-full`} />
                  <div className={`${styles.inputContainer}`}>
                    <input type="number" className="w-full" />
                    <p>SOL</p>
                  </div>
                </div>
              </div>

              <div className="">
                <p className="text-right">Add bonus code (optional)</p>

                <div className="flex gap-5 items-center text-[0.5rem] md:text-[0.8rem]">
                  <div className={`${styles.inputContainer}`}>
                    <input type="number" className="w-full" />
                    <p>SOL</p>
                  </div>

                  <Button text={`Apply Code`} width={`w-full`} />
                </div>
              </div>
            </div>

            <div className="flex mt-[2rem] justify-center">
              <Button colored text={`How To Buy`} />
            </div>
          </div>
        </div>

        <div className="contentContainer bg-[#3B2621] mt-[1rem] h-[500px] overflow-scroll">
          <p className="text-[#FFFFFF82] text-[1rem] md:text-[1.2rem]">
            Recent Buy
          </p>

          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stakings;
