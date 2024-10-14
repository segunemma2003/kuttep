import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import "../App.css";
import { logo } from "../assets/assets";
import Fade from "react-awesome-reveal";

import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { storeAddress } from "../lib/api";

const Navbars = () => {
  const [toggle, setToggle] = useState(false);
  const { address } = useAccount();
  const { open } = useAppKit();


  useEffect(() => {
    const stAddress = async () =>{
      if(address){
        const data={
          "address":address
        };
        const response = await storeAddress(data);
      }
      
    }
    stAddress();
  },[])

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <div className={`${styles.imageContainer}`}>
          <Fade delay={2000} duration={1000} className="w-full">
          <a href="/">
            <img src={logo} alt="Logo" className="w-[50px]" />
            </a>
            </Fade>
          </div>
          <h2 className={`${styles.logoTitle}`}>Kutte Ai</h2>
        </div>
        {address ? (
           <Fade delay={2000} duration={1000}>
        <button
        onClick={() =>{
          console.log("open");
          open();
        }} 
        className={`${styles.navBtn}`}> {address.slice(0, 6)} ..... {address.slice(-4)}</button> </Fade>)
        :(
          <Fade delay={2000} duration={1000}>
        <button className={`${styles.navBtn}`} onClick={() =>  {
          console.log("open");
          console.log(  open());
        }}>
          Connect wallet
        </button>
        </Fade>
        )
        }
      </div>
    </nav>
  );
};

export default Navbars;
