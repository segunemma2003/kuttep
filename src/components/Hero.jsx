import React from "react";
import styles from "./Hero.module.css";
import { detailsImg, logo, smImg } from "../assets/assets";
import Button from "./Button";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { useNavigate } from 'react-router-dom'; 
import { formatNumberWithCommas } from "../lib/utils";

const Hero = ({settings}) => {
  const { address } = useAccount();
  const { open } = useAppKit();
  const navigate = useNavigate(); 

const navigateToBuy = () => {
  navigate('/buy');  // In Next.js
};


  const openWhitepaper = () => {
    window.open('/whitepaper.pdf', '_blank'); // Replace with the correct path to your whitepaper
  };
  return (
    <section className={`${styles.section} relative section `}>
      <div className={`${styles.hero} `}>
        <div className={`${styles.heroContainer} sectionContainer`}>
          <div className={`${styles.imageContainer}`}>
            <img src={logo} alt="heroImage" />
          </div>

          <img src={smImg} alt="coin" className={styles.coin} />
          <img src={smImg} alt="coin" className={styles.coin2} />
          <img src={smImg} alt="coin" className={styles.coin3} />
          <img src={smImg} alt="coin" className={styles.coin4} />
          <img src={smImg} alt="coin" className={styles.coin5} />
          <img src={smImg} alt="coin" className={styles.coin6} />

          <div>
            <h1 className={`${styles.heroTitle}`}>KUTTE AI</h1>
            <p className={`${styles.heroText}`}>
              Launch Your Kuttie Ai to the Moon! 🚀
            </p>
          </div>

          <div
            className={`${styles.buttonContainer} flex gap-3 justify-center`}
          >
           {
            address? <Button colored text={`Join presale`} clickFunction={navigateToBuy} />
                    :<Button colored text={`Connect Wallet`} clickFunction={()=>open()} /> 
           } 
            <Button text={`Whitepaper`} clickFunction={openWhitepaper} />
          </div>

          <div className="bg-[#ffa800] pt-[1rem] mt-[3rem] relative max-w-[500px] mx-auto">
            <div className="flex justify-center w-[80px] mx-auto p-[0.5rem] rounded-full absolute right-0 left-0 top-0 transform -translate-y-1/2">
              <img src={detailsImg} className="" />
            </div>

            <div className={`${styles.detailsCard}`}>
              <p className={`${styles.detailsTitle}`}>Staked</p>
              <div>
                <p className={`${styles.detailsText}`}>Total Stake</p>
                <p className={`${styles.detailsTitle}`}>{settings? formatNumberWithCommas(Number(settings['total_staked'])): "15,766,383,366 "} KAI</p>
              </div>

              <div>
                <p className={`${styles.detailsText}`}>Apy</p>
                <p className={`${styles.detailsTitle}`}>{ settings? settings['current_percent']: 10}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
