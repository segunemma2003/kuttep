import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import img from "../assets/pudel.png";
import eth from "../assets/eth.png";
import { Progress } from "antd";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import chart from "../assets/chart.png";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";
import img9 from "../assets/img9.png";
import img10 from "../assets/img10.png";
import img11 from "../assets/img11.png";
import img12 from "../assets/img12.png";
import img13 from "../assets/img13.png";
import img14 from "../assets/img14.png";
import img15 from "../assets/img15.png";
import img16 from "../assets/img16.png";
import img18 from "../assets/img18.png";
import img19 from "../assets/img19.png";
import gif from "../assets/gif.gif";
import Faqs from "../components/Faqs";
import { FaTelegramPlane } from "react-icons/fa";
import {
  BsGithub,
  BsInstagram,
  BsReddit,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import RoadmapComp from "../components/RoadmapComp";
import pdf from "../assets/PUDEL.pdf";

import { Contract, utils } from "ethers";
import tokenAbi from "../tokenAbi.json";
import presaleAbi from "../presaleAbi.json";

import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { parseEther } from "ethers/lib/utils";

import { getPublicClient, getWalletClient } from "@wagmi/core";

const IconArr = [
  {
    img: img2,
    link: "https://pancakeswap.finance/",
  },
  {
    img: "https://solidproof.io/img/logo/logo_white.png",
    link: "https://solidproof.io/contact",
  },
  // {
  //   img: img3,
  //   link: "https://coinpedia.org/",
  // },
  {
    img: img4,
    link: "https://www.coingecko.com/",
  },
  {
    img: img5,
    link: "https://coinmarketcap.com/",
  },
  {
    img: img6,
    link: "https://bscscan.com/token/0x6113E696A85cAcF0fE9E4Fd5F420598d9bA2fE85#balances",
  },
  {
    img: img9,
    link: "https://partner.bybit.com/b/52011",
  },
  {
    img: img10,
    link: "https://www.bitget.com/expressly?channelCode=whdmsblog&vipCode=z7oh&languageType=0",
  },
  {
    img: img11,
    link: "https://accounts.binance.info/register?ref=176411140",
  },
  {
    img: img12,
    link: "https://bingx.com/invite/IBPQUF",
  },
];

const RMArr1 = [
  { text: "Design Graphics" },
  { text: "Development (contract, website)" },
  { text: "Presa/e & Launch" },
  { text: "Coinmarketcap Listing" },
  { text: "Big Marketing Campaigns" },
  { text: "Coingecko Listing" },
];

const RMArr2 = [
  { text: "10,000 Holders" },
  { text: "Airdrops & Giveaways" },
  { text: "More Marketing Campaigns" },
  { text: "Influencers" },
  { text: "Various Ads, Social Media Presence" },
  { text: "Great Promotions For The Community" },
];

const RMArr3 = [
  { text: "25,000 Holders" },
  { text: "Big Airdrop Campaign" },
  { text: "NFT Collection Opensea" },
  { text: "Special Marketing Campaigns" },
  { text: "Centralized Exchange Listing" },
  { text: "Big Marketing Plan" },
];

const RMArr4 = [
  { text: "50,000 Holders" },
  { text: "Staking Pools" },
  { text: "Own Special NFT Platform" },
  { text: "More Tier 1 And 2 Exchange Listings" },
  { text: "Own Swap" },
  { text: "Mobile App With Wallet" },
];

const Home = () => {
  const c_price = "0.000015";
  const nextPrice = "0.000015";
  const stage = "Stage";
  const pricePerUsd = "$307,350 / $500,000";
  const percentage = 61.47;
  const usdtPerPudel = "1USDT = 66,666.66PD";

  const contractAddress = "0x2D7D248d5fBC132eE652a35305000fAB478ea52B";
  const usdt = "0x55d398326f99059fF775485246999027B3197955";
  const busd = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

  const [popUp, setPopUp] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setPopUp(true);
  //   }, 4500);
  // }, []);

  const [amount, setAmount] = useState("0");
  const [output, setOutput] = useState(0);
  const [buyToken, setBuyToken] = useState("bnb");
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  useEffect(() => {
    if (!amount) {
      setOutput(0);
      return;
    }
    const amt = parseFloat(amount);
    const out = buyToken == "bnb" ? amt * 66666 * 235 : amt * 66666;
    setOutput(out);
  }, [amount, buyToken]);

  const buyPresale = async () => {
    if (!address || !amount) return;
    const _amt = utils.parseEther(amount);

    const walletClient = await getWalletClient({ chainId: 56 });
    const publicClient = await getPublicClient({ chainId: 56 });
    if (_amt.eq(0)) {
      alert("Add amount ");
      return;
    }
    if (!walletClient) return;

    if (buyToken == "bnb") {
      try {
        await walletClient.writeContract({
          address: contractAddress,
          abi: presaleAbi,
          functionName: "buyPresaleBNB",
          value: _amt.toBigInt(),
        
        });
        // await Presale.buyPresaleBNB({ value: _amt });
      } catch (e) {
        console.log("Error buying presale");
      }
    } else {
      const token = buyToken == "busd" ? busd : usdt;
      const balance = await publicClient.readContract({
        address: token,
        abi: tokenAbi,
        functionName: "balanceOf",
        args: [address],
      });

      // const TokenContract = new Contract(token, tokenAbi, signer);
      // const balance = await TokenContract.balanceOf(address);
      console.log(balance);

      if (balance < _amt.toBigInt()) {
        alert("Insufficient token balance");
        return;
      }

      const approved = await publicClient.readContract({
        address: token,
        abi: tokenAbi,
        functionName: "allowance",
        args: [address, contractAddress],
      });

      if (approved < _amt.toBigInt()) {
        const hash = await walletClient.writeContract({
          address: token,
          abi: tokenAbi,
          functionName: "approve",
          args: [contractAddress, parseEther("100000000000000000")],
        });
        const trx = await publicClient.waitForTransactionReceipt({ hash });
        console.log(trx);
      }

      await walletClient.writeContract({
        address: contractAddress,
        abi: presaleAbi,
        functionName: "buyPresale",
        args: [token, _amt.toBigInt()],
        gas: 1000000n,
      });

      // const resBuy = await Presale.buyPresale(token, _amt);
      // console.log(resBuy);
    }
    setAmount("0");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-start gap-4 lg:gap-16 bg-[#000000] h-full w-full lg:pb-0">
        {/* About */}
        <div id="about" className="text-[transparent] lg:mb-5">
          .
        </div>
        <div className="flex flex-col items-center justify-between w-full gap-16 px-8 lg:flex-row lg:items-start lg:gap-0 lg:px-28">
          <div className="lg:flex-[0.6] flex flex-col items-start">
            <Fade triggerOnce delay={2000} duration={1000} className="w-full">
              <img src={img14} alt="" className="object-contain " />
            </Fade>
            {/* <Fade triggerOnce delay={2000} duration={1000}>
              <a
                className="flex text-[30px]  font-black text-white bg-orange-500 rounded-lg px-4 items-center justify-center ml-20 cursor-pointer mt-2"
                href="https://www.dextools.io/app/en/bnb/pair-explorer/0x003d7a2a56349524e0174fcc19ca82b83e9f9929"
                target="_blank"
              >
                Chart
              </a>
            </Fade> */}
          </div>
          <div className="lg:flex-[0.4] w-full lg:w-fit">
            <Fade duration={2000} className="w-full">
              <div className="flex flex-col items-center gap-4 bg-[#F79341] rounded-[50px] w-full pt-2 pb-4 overflow-hidden">
                <span className="text-[#FFFFFF] text-[20px] text-center font-black w-[250px]">
                  Join $PUDEL 2ND Presale Last {stage}
                </span>

                <span className="text-[#FFFFFF] text-[16px] font-black">
                  BNB Smart Chain (Bep20)
                </span>

                <span className="text-[#FFFFFF] text-[16px] text-center font-black">
                  Price: ${c_price}
                </span>

                <span className="text-[#000] text-[20px] font-black">
                  {" "}
                  BUY PUDEL{" "}
                </span>

                <div className="h-[1px] w-full bg-[#E95524]" />

                <div className="flex flex-col w-full px-12">
                  <div className="relative flex items-center justify-center rounded-[10px] h-[13px] min-w-min">
                    <Progress
                      strokeColor={"#E95524"}
                      percent={percentage}
                      strokeWidth={18}
                      showInfo={false}
                      className="w-full mt-1 animate-pulse"
                    />

                    <span className="absolute text-[14px]">
                      Last Stage Price: ${nextPrice}
                    </span>
                  </div>
                  <Fade
                    delay={2000}
                    duration={1000}
                    triggerOnce
                    className="w-full"
                  >
                    <div className="flex items-center justify-between text-[#000000] text-[12px] mt-4">
                      <span> {pricePerUsd} </span>
                      <span> {percentage}% </span>
                    </div>
                  </Fade>
                </div>

                <div className="h-[1px] w-full bg-[#E95524]" />

                <>
                  <div className="w-full px-12">
                    <div className="flex items-center justify-between bg-[#E9552447] rounded-[23.61px] w-full px-8">
                      <div className="flex flex-col items-start">
                        <span className="text-[#F5F5F5] text-[14px] font-medium">
                          {" "}
                          You send{" "}
                        </span>
                        <input
                          value={amount}
                          placeholder="Amount"
                          onChange={(e) => setAmount(e.target.value)}
                          className="border-none outline-none focus:outline-none text-[#D0D0D0] text-[20px] bg-[#E9552447] font-medium w-[50%]"
                        />
                      </div>

                      <select
                        onChange={(e) => setBuyToken(e.target.value)}
                        name=""
                        id=""
                        className="focus:outline-none rounded-[18.31px] bg-[#E95524] py-1 px-1"
                      >
                        {/* <div className="flex items-center gap-2 bg-[#E95524] rounded-[18.31px] py-1 w-[120px] lg:w-fit px-4">
                              <img src={eth} alt="" className="h-[29px] w-[19px]" />
                              <span className="text-[#F5F5F5] text-[12px] lg:text-[14px] font-bold">
                                {" "}
                                ETH{" "}
                              </span>
                            </div> */}
                        <option value="bnb"> BNB </option>
                        <option value="busd"> BUSD </option>
                        <option value="usdt"> USDT </option>
                      </select>
                    </div>
                  </div>
                  <Fade delay={2000} duration={1000} triggerOnce>
                    <div className="flex items-center justify-start w-full">
                      <span className="flex items-center justify-start text-[#D0D0D0] text-[20px] font-medium w-full px-12">
                        {usdtPerPudel}
                      </span>
                    </div>
                  </Fade>
                  <div className="w-full px-12">
                    <div className="flex items-center justify-between bg-[#E9552447] rounded-[23.61px] w-full px-8">
                      <div className="flex flex-col items-start">
                        <span className="text-[#F5F5F5] text-[14px] font-medium">
                          {" "}
                          You recieve{" "}
                        </span>
                        <input
                          value={output}
                          // placeholder="0.0"
                          className="border-none outline-none focus:outline-none text-[#D0D0D0] text-[14px] bg-[#E9552447] font-medium w-[50%]"
                        />
                      </div>

                      <div className="flex items-center gap-2 bg-[#E95524] rounded-[18.31px] py-2 lg:py-1 w-[120px] lg:w-fit px-4">
                        <img
                          src={img}
                          alt=""
                          className="h-[20.02px] lg:h-[30.02px] w-[20.02px] lg:w-[30.02px]"
                        />
                        <span className="text-[#F5F5F5] text-[14px] font-bold">
                          PUDEL
                        </span>
                      </div>
                    </div>
                  </div>
                </>

                <>
                  <div className="h-[1px] w-full bg-[#E95524]" />

                  {address ? (
                    ""
                  ) : (
                    <Fade delay={2000} duration={1000} triggerOnce>
                      <span className="text-[#F5F5F5] text-[14px] py-2">
                        {" "}
                        CONNECT YOUR WALLET TO BUY PUDEL{" "}
                      </span>
                    </Fade>
                  )}

                  <div className="h-[1px] w-full bg-[#E95524]" />
                </>

                <button className="" onClick={() => buyPresale()}>
                  <Fade
                    triggerOnce
                    direction="left"
                    delay={1000}
                    duration={1000}
                  >
                    {address ? (
                      <div className="bg-[#E95524] text-[#F5F5F5] font-bold text-[16px] rounded-[25px] py-2 lg:py-3 w-[341px]">
                        Buy
                      </div>
                    ) : (
                      <div
                        className="bg-[#E95524] text-[#F5F5F5] font-bold text-[16px] rounded-[25px] py-2 lg:py-3 w-[341px]"
                        onClick={() => open()}
                      >
                        Connect Wallet
                      </div>
                    )}
                  </Fade>
                </button>
              </div>
            </Fade>
          </div>
        </div>

        {/* Icons */}
        <div>
          <Fade className="w-full">
            <span className="hidden lg:flex items-center justify-center text-[#E95524] text-[48px] font-black mb-4">
              {" "}
              Our Partners{" "}
            </span>
          </Fade>

          <Fade duration={2000} className="hidden w-full DESKTOP lg:block">
            <div
              id="slider___"
              className="flex items-center justify-between w-full gap-8 px-8 lg:px-16"
            >
              {IconArr?.map((item, index) => (
                <>
                  <a href={item?.link} target="_blank" key={index}>
                    <img
                      src={item?.img}
                      alt=""
                      className="h-[50px] object-contain"
                    />
                  </a>
                </>
              ))}
            </div>
          </Fade>

          <div className="block MOBILE lg:hidden">
            <Splide
              options={{
                autoplay: true,
                perPage: 3,
                height: "100px",
                gap: "2rem",
              }}
              hasTrack={false}
            >
              <SplideTrack>
                {IconArr?.map((slide, index) => (
                  <SplideSlide key={index}>
                    <a href={slide?.link} target="_blank">
                      <img
                        src={slide.img}
                        alt=""
                        className="w-[80px] h-[50px] object-contain"
                      />
                    </a>
                  </SplideSlide>
                ))}
              </SplideTrack>
            </Splide>
          </div>
        </div>

        {/* Tokenomics */}
        <div id="tokenomics" className="text-[transparent]">
          .
        </div>
        <div className="flex flex-col w-full gap-8 px-8 lg:gap-12 lg:px-28">
          <span className="flex items-center justify-center text-[#F79341] text-[24px] lg:text-[64px] font-black">
            {" "}
            Tokenomics{" "}
          </span>
          <div className="flex flex-col items-center justify-start w-full lg:flex-row lg:items-center lg:justify-between">
            <Fade triggerOnce direction="up" duration={1500}>
              <img
                src={chart}
                alt=""
                className="h-[256px] lg:h-[400px] w-[256px] lg:w-[400px] object-contain"
              />
            </Fade>

            <div className="flex flex-col items-center text-center lg:text-left lg:items-start justify-start gap-2 text-[#F79341] text-[20px] lg:text-[24px] my-8 lg:my-0">
              <Fade direction="left" cascade duration={1000} className="w-full">
                <span>Name: Pudel </span>
                <span>Symbol: PD </span>
                <span>Total Supply: 1,000,000,000,000 PD </span>
                <span>Tokenomics Ratio </span>
                <span>Developer and team 3% </span>
                <span>20% pre-sale </span>
                <span>Liquidity 30% </span>
                <span>Burn 20% </span>
                <span>CEX 27% </span>
                <span> Reward 2% Buy 6% Sell 8% </span>
              </Fade>

              <button className="">
                <Fade duration={1000}>
                  <a href={pdf} download={pdf?.split("/")[3]}>
                    <div className="bg-[#E95524] text-[#F5F5F5] font-bold text-[16px] rounded-[25px] py-2 lg:py-3 w-[341px]">
                      Whitepaper
                    </div>
                  </a>
                </Fade>
              </button>
            </div>
          </div>
        </div>

        {/* MoonMap */}
        <div id="moonmap" className="text-[transparent]">
          .
        </div>
        <div id="moonmap" className="w-full px-8 lg:px-28">
          <div className="flex flex-col items-center w-full gap-4 lg:gap-8">
            <Fade className="w-full">
              <span className="flex items-center justify-center text-[#F79341] lg:text-[48px] text-[24px] font-black">
                {" "}
                Moon Map{" "}
              </span>
            </Fade>

            <>
              <Fade triggerOnce direction="up" duration={1500}>
                <img
                  src={img15}
                  alt=""
                  className="hidden object-contain lg:block"
                />
              </Fade>
            </>

            <>
              <Fade triggerOnce direction="up" duration={1500}>
                <img
                  src={img16}
                  alt=""
                  className="block object-contain lg:hidden"
                />
              </Fade>
            </>
            {/* <>
              <div className="relative items-center justify-start hidden w-full gap-4 DESKTOP lg:flex mt-36">
                <>
                    <div className="absolute left-[15%] -top-20">
                      <Fade triggerOnce duration={1000} className="w-full">
                        <RoadmapComp title="Phase 1" RMArray={RMArr1} />
                      </Fade>
                    </div>

                    <div className="absolute left-[15%] bottom-64">
                      <Fade triggerOnce duration={1000} className="w-full">
                        <RoadmapComp title="Phase 3" RMArray={RMArr3} />
                      </Fade>
                    </div>
                </>
                
                <Fade triggerOnce delay={1000} duration={1000} className="w-full">
                  <div className="flex items-center justify-center w-full">
                    <img src={img13} alt="" className="object-contain" />
                  </div>
                </Fade>

                <>
                    <div className="absolute right-[15%] top-64">
                      <Fade triggerOnce duration={1000} className="w-full">
                        <RoadmapComp title="Phase 2" RMArray={RMArr2} />
                      </Fade>
                    </div>
                    <div className="absolute right-[15%] -bottom-20">
                        <Fade triggerOnce duration={1000} className="w-full">
                          <RoadmapComp title="Phase 4" RMArray={RMArr4} />
                        </Fade>
                    </div>
                </>
              </div>
              
              <>
                <div className="grid w-full grid-cols-2 gap-4 MOBILE lg:hidden">
                  <Fade triggerOnce cascade direction="up" duration={1000} className="w-full">
                    <RoadmapComp title="Phase 1" RMArray={RMArr1} />
                    <RoadmapComp title="Phase 2" RMArray={RMArr2} />
                    <RoadmapComp title="Phase 3" RMArray={RMArr3} />
                    <RoadmapComp title="Phase 4" RMArray={RMArr4} />
                  </Fade>
                </div>
              </>
            </> */}
          </div>
        </div>

        {/* Nft */}
        <div id="nft" className="text-[transparent]">
          .
        </div>
        <div className="w-full px-8 lg:px-28">
          <Fade className="w-full">
            <span className="flex items-center justify-center text-[#F79341] lg:text-[48px] text-[64px] font-black">
              {" "}
              NFT.{" "}
            </span>
          </Fade>
          <Fade triggerOnce direction="up" duration={1500} className="w-full">
            <img
              src={gif}
              alt=""
              className="w-full h-[192px] lg:h-[658px] object-contain"
            />
          </Fade>
        </div>

        {/* Faqs */}
        <Faqs />

        <div className="flex flex-col w-full">
          <span className="flex items-center justify-center text-[#fff] text-[16px] lg:text-[18px] font-medium w-full px-8 lg:px-36 mt-b">
            {" "}
            contact@pudel.vip{" "}
          </span>

          <div
            id="contact"
            className="flex items-center justify-between w-full px-8 lg:px-36"
          >
            <Fade triggerOnce direction="left" duration={1000}>
              <Link
                to={{ pathname: "//t.me/PUDEL_BSC" }}
                target="_blank"
                className="flex items-center justify-center w-[40.86px] lg:w-[80px] h-[40.86px] lg:h-[80px] bg-[#229ED9] rounded-full"
              >
                <FaTelegramPlane size={30} color="#fff" />
              </Link>
            </Fade>

            <Fade triggerOnce direction="left" delay={250} duration={1000}>
              <Link
                to={{ pathname: "//twitter.com/PUDEL_BSC" }}
                target="_blank"
                className="flex items-center justify-center w-[40.86px] lg:w-[80px] h-[40.86px] lg:h-[80px] bg-[#1D9BF0] rounded-full"
              >
                <BsTwitter size={30} color="#fff" />
              </Link>
            </Fade>

            <Fade triggerOnce direction="left" delay={500} duration={1000}>
              <Link
                to={{ pathname: "//instagram.com/pudel_bsc" }}
                target="_blank"
                className="flex items-center justify-center w-[40.86px] lg:w-[80px] h-[40.86px] lg:h-[80px] bg-[#000000] rounded-full"
              >
                <BsInstagram size={30} color="#fff" />
              </Link>
            </Fade>

            <Fade triggerOnce direction="left" delay={750} duration={1000}>
              <Link
                to={{ pathname: "//github.com/PUDELBSC" }}
                target="_blank"
                className="flex items-center justify-center w-[40.86px] lg:w-[80px] h-[40.86px] lg:h-[80px] bg-[#000] rounded-full"
              >
                <BsGithub size={30} color="#fff" />
              </Link>
            </Fade>

            <Fade triggerOnce direction="left" delay={1000} duration={1000}>
              <Link
                to={{ pathname: "//www.reddit.com/u/PUDEL_BSC" }}
                target="_blank"
                className="flex items-center justify-center w-[40.86px] lg:w-[80px] h-[40.86px] lg:h-[80px] bg-[#FF4500] rounded-full"
              >
                <BsReddit size={30} color="#fff" />
              </Link>
            </Fade>
          </div>
        </div>

        <Fade triggerOnce direction="up" duration={1500} className="w-full">
          <span className="flex items-center justify-center w-full text-[#FFFFFF] text-[16px] pb-12">
            Copyright © Pudel 2023
          </span>
        </Fade>
      </div>

      <>
        {popUp && (
          <div className="fixed top-0 left-0 flex flex-col bg-[#F7934159] h-[100vh] w-full pt-24 lg:pt-20 z-50">
            <div className="flex justify-center w-full mb-4 lg:mb-8">
              <span
                className="flex items-center justify-center h-[40px] w-[40px] bg-[#000000] rounded-full cursor-pointer"
                onClick={() => setPopUp(false)}
              >
                {" "}
                <MdClose size={20} color="#fff" />{" "}
              </span>
            </div>

            <div className="flex justify-center w-full">
              <div className="flex flex-col items-center bg-[#000000] w-full lg:w-[50%] py-10 lg:py-28">
                <img
                  src={img19}
                  alt=""
                  className="h-[376px] lg:h-[600px] object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Home;
