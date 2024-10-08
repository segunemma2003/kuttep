import React from "react";
import styles from "../styles/Liquidity.module.css";
import Button from "./Button";
import { liquidity, liquidityImage } from "../assets";

const Liquidity = () => {
  return (
    <section className={`section ${styles.liquiditySection}`}>
    <div className={`mt-[-7rem] flex justify-center`}>
      <img src={liquidityImage.src} className={`w-[200px]`} />
    </div>
    <div className={`sectionContainer`}>
      <div className={`contentContainer flex flex-col items-center`}>
        <h2 className={`title text-[#3B2621]`}>
          Liquidity Blast & <br />
          Buyback Bonanza
        </h2>

        <p className={`text text-[#3B2621]`}>
          At launch, liquidity will smoothly integrate, ensuring a lively and
          robust market. But the real excitement is yet to come! Prepare for
          our BuyBack & Burn Events, scheduled periodically over the next 3 to
          6 months. These events will boost buying pressure, sending prices
          soaring, while simultaneously burning tokens—reducing the supply
          permanently. As scarcity increases, the value of your $KAI stash
          will skyrocket, making every coin you own a true gem worth keeping!
        </p>

      

        <div>
          <img src={liquidity.src} />
        </div>
      </div>
    </div>
  </section>
  );
};

export default Liquidity;
