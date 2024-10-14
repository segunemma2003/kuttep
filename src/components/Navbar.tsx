import { useState, useEffect } from "react";
import logo from "../assets/img17.png";
import Fade from "react-awesome-reveal";
import { useAppKit } from "@reown/appkit/react";


import { useAccount, useDisconnect } from "wagmi";
const Navbar = () => {
  // const [address, setAddress] = useState("");
  const { address } = useAccount();
  const { open} = useAppKit();
  
  return (
    <>
      <div className="sticky top-0 flex items-center bg-[#000000] w-full px-8 pt-4 z-10">
        <div className="lg:flex-[0.35] flex items-center justify-start">
          <Fade delay={2000} duration={1000} className="w-full">
            <a href="/">
              <img
                src={logo}
                alt=""
                className="w-[65%] lg:w-[255px]  lg:h-[80.04px] object-contain"
              />
            </a>
          </Fade>
        </div>

        <div className="lg:flex-[0.65] flex items-center justify-end lg:justify-start gap-8 w-full lg:w-fit">
          <Fade
            cascade
            className="hidden lg:flex items-center justify-start gap-8"
          >
            <a href="#" className={`text-[#E95524] text-[16px]`}>
              {" "}
              Home{" "}
            </a>
            <a href="#tokenomics" className={`text-[#E95524] text-[16px]`}>
              {" "}
              Tokenomics{" "}
            </a>
            <a href="#moonmap" className={`text-[#E95524] text-[16px]`}>
              {" "}
              Moonmap{" "}
            </a>
            <a href="#nft" className={`text-[#E95524] text-[16px]`}>
              {" "}
              Nft{" "}
            </a>
            <a href="#faqs" className={`text-[#E95524] text-[16px]`}>
              {" "}
              How to buy{" "}
            </a>
          </Fade>
          {address ? (
            <button className="lg:ml-16">
              <Fade delay={2000} duration={1000}>
                <div
                  className="bg-[#E95524] text-[#000000] text-[16px] rounded-[25px] py-2 lg:py-3 px-4 lg:px-5"
                  onClick={() => open()}
                >
                  {address.slice(0, 6)} ..... {address.slice(-4)}
                </div>
              </Fade>
            </button>
          ) : (
            <button className="lg:ml-16">
              <Fade delay={2000} duration={1000}>
                <div
                  className="bg-[#E95524] text-[#000000] text-[16px] rounded-[25px] py-2 lg:py-3 px-4 lg:px-5"
                  onClick={() => open()}
                >
                  Connect Wallet
                </div>
              </Fade>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
