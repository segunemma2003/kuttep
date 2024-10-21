
import React, { useState } from "react";
import styles from "./Super.module.css";
import Button from "./Button";
import { communityImage } from "../assets/assets";
import Modal from "./Modal";
import HowToBuy from "./HowToBuy";
import { useNavigate } from 'react-router-dom'; 



const Super = () => {
  const [button, setButton] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate(); 

  const modalHandler = () => {
    setModal(!modal);
  };

  const selectButton = (text) => {
    setButton(text);
    setModal(true); // Set modal to true when a button is selected
  };

  const navigateToEarn = () => {
    navigate('/earn');  // In Next.js
  };

  const navigateToHowToBuy = () =>
  {
    navigate('/howtobuy');
  }
  

  return (
    <>
      <section className={`section ${styles.superSection}`}>
        <div className={`sectionContainer relative`}>
          <div className={`${styles.colContainer}`}>
            <div className={`${styles.firstCol} `}>
              <div className={`${styles.textContainer}`}>
                <h2>Cute watch guard meme coin</h2>
                <div className="md:hidden">
                  <img src={communityImage} className="w-[80%] mx-auto" />
                </div>
                <p className={`${styles.text}`}>
                  A blockchain watchdog ensuring transparency and security,
                  blending governance with meme culture and playful engagement.
                </p>
                <p className={`${styles.text}`}>
                  Get ready to blast off with Kutte Ai-the cutest and most
                  thrilling new meme coin in the crypto universe! Join the Kutte
                  Ai mission today and secure your seat for a wild ride to the
                  moon. Don't miss out on the excitement_ your Kutte Ai
                  adventure starts now!
                </p>

                <p className={`${styles.text}`}>
                  A blockchain watchdog ensuring transparency and security,
                  blending governance with meme culture and playful engagement.
                  Get ready to blast off with Kutte Ai-the cutest and most
                  thrilling new meme coin in the crypto universe! Join the Kutte
                  Ai mission today and secure your seat for a wild ride to the
                  moon.
                  <span className={`text-[#3A3A3A] font-bold`}>
                    Don't miss out on the excitement_ your Kutte Ai adventure
                    starts now!
                  </span>
                </p>
              </div>
            </div>

            <div
              className={`${styles.secondCol} flex items-center justify-between relative`}
            >
              <div className="flex gap-3">
                <Button
                  text={"How to Buy"}
                  colored
                  clickFunction={navigateToHowToBuy}
                />
                <Button
                  text={"Earn"}
                  clickFunction={navigateToEarn }
                />
              </div>
              <div className="hidden md:block absolute right-0 top-0 transform -translate-y-[40%] translate-x-[30%]">
                <img src={communityImage} className="w-[65%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal logic */}
      {modal && button === "HOB" && (
        <Modal modalHandler={modalHandler}>
          <HowToBuy />
        </Modal>
      )}
      {/* {modal && button === "Staking" && (
        <Modal modalHandler={modalHandler}>
          <Staking />
        </Modal>
      )} */}
    </>
  );
};

export default Super;
