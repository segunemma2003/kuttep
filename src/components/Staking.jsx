import React, { useEffect, useState } from "react";
import { plane } from "../assets/assets";
import styles from "./Staking.module.css";
import Button from "./Button";
import { Select } from "@radix-ui/react-select";
import { BigNumber, ethers } from 'ethers';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { maxUint256, parseEther, parseUnits, zeroAddress } from "viem";
import { getWalletClient } from "wagmi/actions";
import { CONTRACT_ADDRESS, TOKEN_ADDRESS } from "../addresses";
import presaleAbi from "../presaleAbi.json"
import tokenAbi from "../tokenAbi.json"
import { erc20ABI, usePublicClient } from "wagmi";
import { getTokenAddress } from "../lib/utils";
import { useAccount } from "wagmi";

const Staking = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState("0")
  const [amountToPay, setAmountToPay] = useState("0");
  const [buyToken, setBuyToken] = useState("ETH")
  const [tokenDetail, setTokenDetail] =useState();
  const [referralAddress, setReferralAddress] = useState(null);
  const [tokenBal, setTokenBal] = useState(0);

  const [selectedCurrency, setSelectedCurrency] = useState('ETH'); // Default to ETH

  const currencies = [
    { id: 'ETH', label: 'ETH' },
    { id: 'USDT', label: 'USDT' },
    { id: 'USDC', label: 'USDC' },
    { id: 'TRUEUSD', label: 'TRUEUSD' },
  ];

  const handleCurrencyClick = (id) => {
    if(id!="ETH"){
      alert("Currency not supported yet");
      return;
    }
   
    setSelectedCurrency(id);
  };


  useEffect(() => {
    const getDetails = async () => {
      try {
        const tokenDetails = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: presaleAbi.abi,
          functionName: "getTokenDetails",
        });
        console.log(tokenDetails);
        setTokenDetail(tokenDetails);
      } catch (error) {
        console.error("Error fetching token details:", error);
      }
    };
    
    getDetails();
  }, []); // Runs only once when the component mounts


  useEffect(() => {
    const getBalance = async () => {
      try {
        const tokenDetails = await publicClient.readContract({
          address: TOKEN_ADDRESS,
          abi: tokenAbi.abi,
          functionName: "balanceOf",
          args:[address]
        });
        console.log(address);
        console.log(tokenDetails);
        const tokenBal = tokenDetails
        setTokenBal(Number(tokenBal));
      } catch (error) {
        console.error("Error fetching token details:", error);
      }
    };
    
    getBalance();
  }, []); // Runs only once when the component mounts



  const updateAmount = async(amount) => {
    console.log(amount);
    setAmount(amount);
    if(selectedCurrency == "ETH"){
      const pricePerToken = tokenDetail[4];
      const pricePerTokenBigNumber = BigNumber.from(pricePerToken.toString());
      console.log(pricePerToken);
    const totalAmount = pricePerTokenBigNumber * amount;
    const totalAmountInEth = ethers.utils.formatEther(totalAmount);
    console.log(totalAmountInEth);
    setAmountToPay(totalAmountInEth);
    }else{
      alert("Currency not supported yet");
    }
    

  }
  //  const walletClient = getWalletClient()
  const publicClient = usePublicClient()



  const getTokenBalanceAndAllowance = async (tokenAddress, ownerAddress, spenderAddress) => {
      const[balance, allowance, decimals] = await Promise.all([
          publicClient.readContract({
              address : tokenAddress,
              abi : erc20ABI.abi,
              functionName : "balanceOf",
              args : [ownerAddress]
          }),
          publicClient.readContract({
              address : tokenAddress,
              abi : erc20ABI.abi,
              functionName : "allowance",
              args : [ownerAddress, spenderAddress]
          }),
          publicClient.readContract({
              address : tokenAddress,
              abi : erc20ABI.abi,
              functionName : "decimals",
          }),
      ])

      return {balance, allowance, decimals}

  }

    const approveSpender = async (tokenAddress, spender) => {
      const walletClient = await getWalletClient();
      const hash = await  walletClient.writeContract({
        address : tokenAddress,
        abi : erc20ABI.abi,
        functionName : "approve",
        args : [spender, maxUint256]
      })
      await publicClient.waitForTransactionReceipt({hash})
      return true
    }


  // TODO add referral
  const referral = zeroAddress

  const handleBuy = async () => {
    

    const walletClient = await getWalletClient({chainId: 11155111});
    if(!walletClient) {
      // Wallet not connected
      return 
    }
    

    console.log(amount);
    try{
    if(selectedCurrency == "ETH"){
      const amountWei = parseEther(amount)
      const totalAmountInEth = ethers.utils.formatEther(tokenDetail[4])
      console.log(Number(totalAmountInEth * amount))
      const hash = await walletClient.writeContract({
        address : CONTRACT_ADDRESS,
        abi :  presaleAbi.abi,
        functionName : "buyToken",
        args: [BigInt(amount), referral],
        value : Number(totalAmountInEth * amount)

      })
      await publicClient.waitForTransactionReceipt({hash})
    }else{
      const tokenAddress = getTokenAddress(buyToken)
      if(!tokenAddress) {
        // Notify user that the token is not supported
        return  

      }
      
      const {balance, allowance, decimals} = await getTokenBalanceAndAllowance( tokenAddress, walletClient.account.address, CONTRACT_ADDRESS)
      const amountWei = parseUnits(amount, decimals)

      if(balance < amountWei) {
        // Insufficient Balance
        return 
      }

      if(amountWei > allowance) {
        await approveSpender(tokenAddress, CONTRACT_ADDRESS)
      }

      const hash = await walletClient.writeContract({
        address : CONTRACT_ADDRESS,
        abi : presaleAbi.abi,
        functionName : "buyWithOtherCryptos",
        args : [tokenAddress, amountWei, referral]
      })
      await publicClient.waitForTransactionReceipt({hash})
    }
  }catch(error){
    console.log("data error");
    console.error("Transaction error:", error);
  }
  
    
  }


  return (
    <section className={`section bg-[#FAD7C1] `}>
      <div className={`sectionContainer `}>
        <div className="flex flex-col items-center contentContainer">
          <p className="text-[1rem] md:text-[1.3rem] lg:text-[1.8rem] font-medium">
            Current Phase
          </p>
          <h2 className="text-[1.2rem] md:text-[1.5rem] lg:text-[2.5rem]">
            Presale Stage 1
          </h2>

          <div>
            <p className="text-[1.1rem] md:text-[1.3rem] lg:text-[2rem] font-semibold">
              1 KAI = 0.0002 USDT
            </p>
            <p className="text-[1.1rem] md:text-[1.3rem] lg:text-[2rem] font-semibold">
              1000 $KAI = 1 Meter
            </p>
          </div>

          <div className="bg-white rounded-lg px-[0.8rem] py-[1rem] md:px-[1.2rem] md:py-[1.5rem] lg:px-[1.5rem] lg:py-[2rem]">
            <p className="text-[1rem] md:text-[1rem] lg:text-[2rem] font-bold">
              247,121,788/
              <span className="text-[#FFA800]">8000000 Meters</span>
            </p>
            <p className="font-medium text-[1rem] md:text-[1.2rem] lg:text-[1.5rem]">
              <span className="font-bold text-[#3B2621]">Stage 1 = 70%</span> of
              the Journey
            </p>
            <p className="font-medium text-[1rem] md:text-[1.2rem] lg:text-[1.5rem]">
              Remaining meters until{" "}
              <span className="font-bold text-[#3B2621]">stage 1</span>
            </p>
          </div>

          <img
            src={plane}
            className="w-[80%] md:w-[70%] lg:w-[50%]"
            alt="plane"
          />

          <p className="text-center text-[1.1rem] md:text-[1.3rem] lg:text-[1.8rem] font-semibold">
            <span className="text-[#964C1E]">USD Raised</span> $4,215,177.87
            <br />
            <span className="text-[#964C1E]">$1USDT</span> = 5,000 KAI
          </p>

          {/*************************************************** FORM **********************************************/}

          <div className="w-full">
            <p className="text-center mb-[1rem]">
              Step 1: Select the payment method
            </p>
            <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-2 sm:grid-cols-1">
              {currencies.map((currency) => (
                <div
                  key={currency.id}
                  className={`p-6 text-center border border-[#FFA800] rounded-md cursor-pointer hover:bg-[#FFA800] 
                    ${selectedCurrency === currency.id ? 'bg-[#FFA800] text-white' : 'bg-[#FAD7C1] text-black'}`}
                  onClick={() => handleCurrencyClick(currency.id)}
                >
                  <h3 className="text-lg font-semibold">{currency.label}</h3>
                </div>
              ))}
            </div>

            <p className="text-center my-[1rem]">
              Step 2: Enter the amount of token you would like to purchase
            </p>

            {/******* EXCHANGE SECTION   ***************/}
            <div className="flex flex-col w-full gap-4 md:flex-row">
              {/******* INPUT ONE SECTION   ***************/}
              <div className={`${styles.inputContainer} mb-[1rem] md:mb-0 `}>
                <input type="number" className="w-full" onChange={(e) => updateAmount(e.target.value)}/>
                <p>KUT</p>
              </div>
              {/******* INPUT TWO SECTION   ***************/}
              <div className={`${styles.inputContainer}`}>
                <input type="number" className="w-full" value={amountToPay} />
                <p>{selectedCurrency}</p>
              </div>
            </div>

            {/******* REFERAL SECTION   ***************/}
            <div className="flex gap-4 mt-[2rem]">
              <div>
                <p>Add referral code (optional)</p>

                <div className="flex gap-5 items-center text-[0.5rem] md:text-[0.8rem]">
                 
                  <div className={`${styles.inputContainer}`}>
                    <input type="number" className="w-full" />
                   
                  </div>
                  <Button text={`Apply Code`} width={`w-full`} />
                </div>
              </div>

              <div className="">
                <p className="text-left">Referral Address</p>

                <div className="flex gap-5 items-center text-[0.5rem] md:text-[0.8rem]">
                  <div className={`${styles.inputContainer}`}>
                    <input type="number" className="w-full"  value={referralAddress} readonly/>
                 
                  </div>

             
                </div>
              </div>
            </div>

            <div className="flex mt-[2rem] justify-center">
              <Button colored text={`BUY COIN`} clickFunction={handleBuy} />
            </div>

            <div className="flex mt-[2rem] justify-center">
              Your Total Token Balance : {tokenBal}
            </div>
          </div>
        </div>

        <div className="contentContainer bg-[#3B2621] mt-[1rem] h-[500px] overflow-scroll">
          <p className="text-[#FFFFFF82] text-[1rem] md:text-[1.2rem]">
            Recent Buy
          </p>

          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              0xd5d2...90bc
            </p>
            <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
              10,000 KAI
            </p>
            <p className="text-[0.8rem] md:text-[1.2rem]">18 hours ago</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Staking;
