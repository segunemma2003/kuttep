import React, {useEffect, useState} from "react";
import toast  from "react-hot-toast";
import styles from "../styles/Hero.module.css";
import { detailsImg, logo, smImg } from "../assets/index.js";
import Button from "./Button.jsx";
import {formatNumberWithCommas } from '../utilss/index'



const Hero = ({
  setBuyModel,
  account,
  settings,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  detail,
  addTokenToMetamask
}) => {
const notifySuccess = (msg) => toast.success(msg, {duration: 2000});
const notifyError = (msg) => toast.error(msg, {duration: 2000});

const connectWallet = async() =>{
  setLoader(true);
  const address = await CONNECT_WALLET();
  setAccount(address);
}

const [percentage, setPercentage] = useState();
const [tokenTotal, setTokenTotal] = useState(0);

  const openFileInNewTab = () => {
    console.log("testing");
    const fileUrl = '/whitepaper.pdf'; // Path to the file in the public folder
    window.open(fileUrl, '_blank');
  };

useEffect(()=>{
  const calculatePercentage = () => {
    const tokenSold = detail?.soldTokens ?? 0;
    const tokenTotalSupply = detail?.soldTokens + Number(detail?.tokenBal) * 1 ?? 1;
    console.log(tokenTotalSupply);
    console.log("--------");
    const percentageNew = (tokenSold / tokenTotalSupply) * 100;

    if(tokenTotalSupply === 0){
      console.log("Token sale balance is zero, cannot calculate percentage");
    }else{
      console.log(percentageNew)
      setPercentage(percentageNew);
     
    }
    setTokenTotal(percentageNew);
    const timer =  setTimeout(calculatePercentage, 1000);

    return () => clearTimeout(timer);

  }
}, [detail]);

const ADD_TOKEN_METAMASK = async() => {
  setLoader(true);
  const response = await addTokenToMetamask();
  setLoader(false);
  notifySuccess(response);
}
  return (
    <section className={`${styles.section} relative section `}>
      <div className={`${styles.hero} `}>
        <div className={`${styles.heroContainer} sectionContainer`}>
          <div className={`${styles.imageContainer}`}>
            <img src={logo.src} alt="heroImage" />
          </div>

          <img src={smImg.src} alt="coin" className={styles.coin} />
          <img src={smImg.src} alt="coin" className={styles.coin2} />
          <img src={smImg.src} alt="coin" className={styles.coin3} />
          <img src={smImg.src} alt="coin" className={styles.coin4} />
          <img src={smImg.src} alt="coin" className={styles.coin5} />
          <img src={smImg.src} alt="coin" className={styles.coin6} />

          <div>
            <h1 className={`${styles.heroTitle}`}>KUTTE AI</h1>
            <p className={`${styles.heroText}`}>
              Launch Your Kuttie Ai to the Moon! 🚀
            </p>
          </div>

          <div
            className={`${styles.buttonContainer} flex gap-3 justify-center`}
          >
             {account?(<Button onClick= {()=>setBuyModel(true)} colored text={`Join presale`} />):(<Button onClick={()=> connectWallet(true)} colored text={`Connect Wallet`} />)} 
             <Button onClick={()=>openFileInNewTab()} text={`Whitepaper`} />
          </div>

          <div className="bg-[#ffa800] pt-[1rem] mt-[3rem] relative max-w-[500px] mx-auto">
            <div className="flex justify-center w-[80px] mx-auto p-[0.5rem] rounded-full absolute right-0 left-0 top-0 transform -translate-y-1/2">
              <img src={detailsImg.src} className="" />
            </div>

            <div className={`${styles.detailsCard}`}>
              <p className={`${styles.detailsTitle}`}>ICO</p>
              <div>
                <p className={`${styles.detailsText}`}>Total  Coin</p>
                <p className={`${styles.detailsTitle}`}>{settings? formatNumberWithCommas(Number(settings['total_stake'])): formatNumberWithCommas(detail?.total_stake)}  KUT</p>
              </div>

              <div>
                <p className={`${styles.detailsText}`}>Apy</p>
                <p className={`${styles.detailsTitle}`}>{ settings? settings['current_percent']: percentage}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
 