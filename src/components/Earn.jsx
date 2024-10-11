import React, { useState } from "react";
import styles from "./Earn.module.css";
import Button from "./Button";
import { earnImage, logo } from "../assets/assets";
import Modal from "./Modal";
import Staking from "./Staking";
import { useNavigate } from 'react-router-dom'; 

const Earn = () => {

  // const [button, setButton] = useState(null);
  const navigate = useNavigate(); 



  const navigateToHowToBuy = () =>
    {
      navigate('/howtobuy');
    }



  return (
    <section className={`section ${styles.earnSection} `}>
      <div
        className={`mt-[-5rem] md:mt-[-7rem] flex justify-center bg-[#fff] w-[100px] md:w-[200px] p-[1rem] rounded-full mx-auto `}
      >
        <img src={logo} className={`w-[200px]`} />
      </div>
      <div className={`sectionContainer`}>
        <div className={`contentContainer flex flex-col items-center`}>
          <h2 className={`title text-[#3B2621]`}>
            Earn $KAI coin with <br />
            Kutte Ai Referrals!
          </h2>
          <p className={`text text-[#fff]`}>
            Invite friends to join the Kutte AI journey using your referral
            code! For every purchase of $10 or more made through your code, you
            will earn 1,000 points in referral bonuses and climb the
            leaderboard.
          </p>

          <p className={`text text-[#fff]`}>
            During the launch, the top 100 referrers will be rewarded with a
            special bonus: 10% of the total value generated through their code,
            paid in $KAI coins, based on the launch price of $0.003. The more
            you refer, the more you earn—get in the race to the top and maximize
            your rewards!
          </p>

          <div>
            <img src={earnImage} className="w-[300px]" />
          </div>
          <Button
            colored
            text={`Start Referring`}
            clickFunction={navigateToHowToBuy}
          />
        </div>
      </div>

      {/* {modal && (
        <Modal modalHandler={modalHandler}>
          <div className={`sectionContainer `}>
            <div className={`contentContainer bg-[#fff]`}>
              <p className={`text mt-0 text-[1.7rem] font-bold text-[#3B2621]`}>
                Share Your Referal code. A7XK9PZ3
              </p>
            </div>
          </div>
        </Modal>
      )} */}
    </section>
  );
};

export default Earn;
