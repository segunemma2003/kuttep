import React from "react";
import styles from "./SpaceGuard.module.css";
import Button from "./Button";
import { spaceImage, spaceSmallImage } from "../assets/assets";
import { Fade } from "react-awesome-reveal";

const SpaceGuards = () => {
  return (
    <section className={`section ${styles.spaceSection}`}>
      <div className={`mt-[-7rem] flex justify-center`}>
        <img src={spaceSmallImage} className={`w-[200px]`} />
      </div>
      <div className={`sectionContainer`}>
        <div className={`contentContainer flex flex-col items-center`}>
          <h2 className={`title text-[#0F82D9]`}>Space Guard</h2>

          <p className={`text text-[#3B2621]`}>
            Our Kutte Ai smart contract has undergone a thorough audit by SCRL,
            a trusted leader in blockchain security. We have locked the team
            tokens and transferred control of the contract to ensure total
            transparency. Additionally, we have implemented a separate, audited
            smart contract that automatically sends 20% of presale funds to the
            liquidity wallet each day, ensuring we are fully prepared for a
            smooth and successful launch!
          </p>

          <div>
            <Fade>
            <img src={spaceImage} />
            </Fade>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceGuards;
