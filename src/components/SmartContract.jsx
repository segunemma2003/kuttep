import React, { useState } from "react";
import styles from "./SmartContract.module.css";
import CopyToClipboard from "react-copy-to-clipboard";
import Button from "./Button";
import { smartContractBigImage, smartContractSmallImage } from "../assets/assets";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from 'react-router-dom'; 
import { formatNumberWithCommas } from "../lib/utils";
import { CONTRACT_ADDRESS } from "../addresses";
const contractAdd = `0x2D7D248d5fBC132eE652a35305000fAB478ea52B`;


const SmartContract = ({settings}) => {
  const [copied, setCopied] = useState(null);
  const navigate = useNavigate(); 

  const navigateToBuy = () => {
    navigate('/buy');  // In Next.js
  };
  
  const copyHandler = () => {
    setCopied(true);
  };
  return (
    <section className={`section pt-[5rem] ${styles.smartContractSection}`}>
      <div className={`mt-[0] flex justify-center`}>
        <img src={smartContractSmallImage} className={`w-[200px]`} />
      </div>
      <div className={`sectionContainer`}>
        <div className={`contentContainer flex flex-col items-center`}>
          <h2 className={`title text-[#3B2621]`}>Smart Contract</h2>

          <div className=" pt-[1rem] max-w-[600px]  mx-auto">
            <div className="flex justify-center ">
              <Fade>
              <img src={smartContractBigImage} className="w-[100%]" />

              </Fade>
            
            </div>

            <div className={`${styles.detailsCard}`}>
              <div className="flex gap-3 items-center justify-between pb-[1rem]">
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

              <p className="text-center">Contract address</p>
              <div className={`flex items-center justify-center w-full`}>
                <p className={`${styles.address}`}>
                { settings? settings['contract_address']: CONTRACT_ADDRESS}
                </p>
                <CopyToClipboard text={contractAdd}>
                  <button onClick={copyHandler} className={`${styles.btn}`}>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
<Fade>
<Button colored text={`Join presale`} clickFunction={navigateToBuy} />
</Fade>
         
        </div>
      </div>
    </section>
  );
};

export default SmartContract;
