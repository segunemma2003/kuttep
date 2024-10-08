/* eslint-disable react/prop-types */
import React from "react";
import styles from "./FormComponent.module.css";
import { arrow, bitcoin } from "./assests";

const FormField = ({ label, labelId, selectName, onChange, onSelect, amount }) => {
  return (
    <div className="relative flex w-full">
      <label id={labelId} className={styles["form-label"]}>
        {label}
      </label>
      <input 
  id={labelId} 
  className={styles["form-input"]}
  onChange={(e) => onChange && onChange(e.target.value)}  // Ensure onChange works
  readOnly={!onChange}  // Make read-only if onChange is not provided
  value={labelId === "crypto-you-get" ? amount : undefined}  // Only set value for "crypto-you-get", otherwise allow typing
/>
      {
        selectName!=null && 
        <select 
        name={selectName} 
        className={styles["form-select"]}
        onChange={(e) => onSelect(e.target.value)}
        >
        {
          selectName=="buycoin"?(<option value="KUT">
         
              KUT 
      
          </option>):(<>  <option value="ETH">
      
              ETH 

   
          </option>
          {/* <option value="BTC">BTC</option>
          <option value="BNB">BNB</option>
          <option value="SOL">SOL</option> */}
          </>)
        }
        </select>
      }
      
    </div>
  );
};

export default FormField;
