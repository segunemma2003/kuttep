import React, { useState } from "react";
import styles from "../styles/SmartContract.module.css";
import CopyToClipboard from "react-copy-to-clipboard";
import Button from "./Button";
import { smartContractBigImage, smartContractSmallImage } from "../assets";
import { formatNumberWithCommas } from "../utils";
import { addTokenToMetamask } from "../context/constants";
import toast from 'react-hot-toast';


const contractAdd = `0xD010705f0974E52EBfac6BB28f1D1CfdC7909534`;
const SmartContract = ({
  detail,
  currency,
  settings,
  setLoader,
  setBuyModel
}) => {
  const [copied, setCopied] = useState(null);
  const notifySuccess = (msg) => toast.success(msg, {duration:2000});
  const notifyError = (msg) => toast.error(msg, {duration:2000});


  const ADD_TOKEN_METAMASK = async() => {
    setLoader(true);
    const response = await addTokenToMetamask();
    setLoader(false);
    notifySuccess(response);
  }

  const copyHandler = () => {
    setCopied(true);
  };
  return (
    <section className={`section ${styles.smartContractSection}`}>
      <div className={`mt-[-7rem] flex justify-center`}>
        <img src={smartContractSmallImage.src} className={`w-[200px]`} />
      </div>
      <div className={`sectionContainer`}>
        <div className={`contentContainer flex flex-col items-center`}>
          <h2 className={`title text-[#3B2621]`}>Smart Contract</h2>

          <div className=" pt-[1rem] max-w-[600px]  mx-auto">
            <div className="flex justify-center ">
              <img src={smartContractBigImage.src} className="w-[100%]" />
            </div>

            <div className={`${styles.detailsCard}`}>
              <div className="flex gap-3 items-center justify-between pb-[1rem]">
                <p className={`${styles.detailsTitle}`}>Staked</p>
                <div>
                  <p className={`${styles.detailsText}`}>Total Stake</p>
                  <p className={`${styles.detailsTitle}`}>{ settings? formatNumberWithCommas(settings['total_staked']) :formatNumberWithCommas(detail?.supply)} KUT</p>
                </div>

                <div>
                  <p className={`${styles.detailsText}`}>Apy</p>
                  <p className={`${styles.detailsTitle}`}>{settings? settings['current_percent']: 20}%</p>
                </div>
              </div>

              <p className="text-center">Contract address</p>
              <div className={`flex items-center justify-center w-full`}>
                <p className={`${styles.address}`}>
                 { detail?.address}
                </p>
                <CopyToClipboard text={contractAdd}>
                  <button onClick={copyHandler} className={`${styles.btn}`}>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>

          <Button onClick= {()=>ADD_TOKEN_METAMASK()} colored text={`Contract to Wallet`} />
        </div>
      </div>
    </section>
  );
};

export default SmartContract;
