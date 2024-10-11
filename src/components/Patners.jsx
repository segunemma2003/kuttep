import React from "react";
import styles from "./Patners.module.css";
import { patners } from "../data/data";
import { patnersImage } from "../assets/assets";

const Patners = () => {
  return (
    <section className={`section ${styles.partnerSection}`}>
      <div className={`mt-[-7rem] flex justify-center`}>
        <img src={patnersImage} className={`w-[200px]`} />
      </div>
      <div className={`sectionContainer`}>
        <h2 className={`title text-[#0352DD]`}>Media Partners</h2>

        <div className={`${styles.patnerContainer}`}>
          {patners.map((item, i) => (
            <div className={`${styles.item}`} key={i}>
              <img src={item.image} className="w-[150px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Patners;
