// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import FormField from "./FormField";
import styles from "./EnterExchange.module.css";
// import useClipboardPaste from "../customHooks/useClipboardPaste";
import { paste } from "./assests";

const EnterExchange = ({ pastedText, pasteFromClipboard, clipText,onInputState }) => {
  // const [address, setAddress] = useState()
  const inputValue = clipText !== "" ? clipText : pastedText;

  onInputState(inputValue);

  return (
    <div className={`${styles.formField} w-full`}>
      {/******************** FORM FILED CONTAINER  ***************/}
      <div className={`${styles.formFieldContainer}`}>
        {/******************** FORM FILED ITEM ONE  ***************/}
        <div className="w-full">
          <FormField
            label="You Send"
            labelId="crypto-you-send"
            selectName="send-crypto"
          />
          {/******************** TEXT UNDER THE FIRST FORM FIELD  ***************/}
          <div className="flex gap-[16px] text-[0.6rem] text-[#00103994] mt-[0.5rem]">
            <p className="">
              Fee <span>20%</span>
            </p>
            <p>
              1 BTC ≈ <span>45762.89</span> USDT
            </p>
          </div>
        </div>

        {/******************** FORM ITEM TWO  ***************/}

        <div className="w-full">
          <FormField
            label="You Get"
            labelId="crypto-you-get"
            selectName="receive-crypto"
          />
        </div>
      </div>

      <div>
        <p className="mb-[0.3rem] text-[0.75rem] text-[#001039]">
          Receipient Wallet
        </p>
        <div className={`${styles.pasteAddress}`}>
          <input
            className={`${styles.formInput}`}
            placeholder="Enter BTC payout wallet"
            value={inputValue}
            onChange={(e) => onPastedTextChange(e.target.value)}
          />
          <button
            className={`${styles.inputBtn}`}
            type="button"
            onClick={pasteFromClipboard}
          >
            Paste <img src={paste} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterExchange;
