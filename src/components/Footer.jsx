import React from "react";
import styles from "./Footer.module.css";
import { logo } from "../assets/assets";
import Button from "./Button";

const Footers = () => {
  return (
    <section className={`section ${styles.footerSection} `}>
      <div className={`sectionContainer pb-[1rem]`}>
        <div className={`${styles.logoMenu}`}>
          <div className="flex flex-col items-center gap-5 pb-5">
            <div
              className={` flex justify-center bg-[#fff] w-[120px] p-[1rem] rounded-full mx-auto `}
            >
              <img src={logo} className={`w-[200px]`} />
            </div>

            <div className="flex gap-3">
              <Button colored text={`Join Presale`} />
              <Button text={`How to buy?`} />
            </div>
          </div>

          <div className={`${styles.footerMenu}`}>
            <div className={`${styles.menuItem}`}>
              <p className="font-bold">About</p>
              <ul>
                <li>Tokenomics</li>
                <li>How to buy</li>
              </ul>
            </div>

            <div>
              <p className="font-bold">Docs</p>
              <ul>
                <li>Whitepaper</li>
                <li>Audit</li>
                <li>Report</li>
                <li>KYC </li>
                <li>Transparency</li>
              </ul>
            </div>

            <div>
              <p className="font-bold">Terms</p>
              <ul>
                <li>Ciookies </li>
                <li>Privacy</li>
                <li>Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div>
              <p className="font-bold">About</p>
              <ul>
                <li>Tokenomics</li>
                <li>How to buy</li>
              </ul>
            </div>
          </div>
        </div>

        <p>
          Disclaimer: Cryptocurrencies may not be regulated in your
          jurisdiction, and their value can rise or fall. Any profits may be
          subject to capital gains or other applicable taxes based on your local
          regulations.
        </p>
      </div>
      <p className="text-[#fff] text-[0.8rem] text-center bg-[#000] p-[0.5rem]">
        © 2024 Kutte Ai. All Rights Reserved.
      </p>
    </section>
  );
};

export default Footers;
