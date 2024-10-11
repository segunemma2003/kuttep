import React from "react";
import styles from "./Sponsors.module.css";
import { sponsors } from "../data/data";
import { sponsorsImg } from "../assets/assets";

const Sponsors = () => {
  return (
    <section className={`section ${styles.sponsorSection}`}>
      <div className={`mt-[-7rem] flex justify-center`}>
        <img src={sponsorsImg} className={`w-[200px]`} />
      </div>
      <div className={`sectionContainer`}>
        <h2 className={`title text-[#444444]`}>Powered By</h2>

        <div className={`${styles.sponsorContainer}`}>
          {sponsors.map((item, i) => (
            <div
              key={i}
              className={`${styles.item}`}
              style={{ backgroundColor: item.color }}
            >
              <img src={item.image} className={`w-[70px]`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
