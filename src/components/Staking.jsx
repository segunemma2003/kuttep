import React, { useEffect, useState } from "react";
import { plane } from "../assets/assets";
import styles from "./Staking.module.css";
import Button from "./Button";
import { Select } from "@radix-ui/react-select";
import { BigNumber, ethers } from 'ethers';
import mystyle from "./Earn.module.css";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { erc20Abi, maxUint256, parseEther, parseUnits, zeroAddress } from "viem";
import { CONTRACT_ADDRESS, TOKEN_ADDRESS } from "../addresses";
import presaleAbi from "../presaleAbi.json"
import tokenAbi from "../tokenAbi.json"
import { usePublicClient, useWalletClient } from "wagmi";
import { formatNumberWithCommas, getTokenAddress, shortenAddress, timeAgo } from "../lib/utils";
import { useAccount } from "wagmi";
import { getAddressReferralCode, getRecentBuys, getReferralCode, getReferrals, storeRecentBuy } from "../lib/api";


const Staking = ({settings}) => {
  const { address } = useAccount();
  const [amount, setAmount] = useState("0")
  const [amountToPay, setAmountToPay] = useState("0");
  const [buyToken, setBuyToken] = useState("ETH");
  const [tokenDetail, setTokenDetail] =useState();
  const [referralAddress, setReferralAddress] = useState(zeroAddress);
  const [tokenBal, setTokenBal] = useState(0);
  const [kut, setKut] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [referredCode, setRefferedCode] = useState();
  const [refAdd, setRefadd] = useState(null);
  const [load, setLoad ] = useState(false);
  const HEADERS = ["Rank", "Wallet", "Total Referred", "Total Amount"];

  const [selectedCurrency, setSelectedCurrency] = useState('ETH'); // Default to ETH
  const {data : walletClient} = useWalletClient()
  
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
    if (kut.length ==0) {
      const fetchRecentBuy = async () => {
        try {
          const data = await getRecentBuys();
          console.log("data:", data.data); // Fetch settings data
          setKut(data.data); // Store settings in state
        } catch (error) {
          console.log(error);
          // notifyError("Failed to fetch settings.");
        }
      };
  
      fetchRecentBuy();
    }
  }, [kut]);

   useEffect(() => {
    if (refAdd == null) {
      console.log("Ref add is not null")
      const fetchRef = async () => {
        try {
          const da ={
            "address":address
          }
          const data = await getReferralCode(da);
          console.log("data: refAdd", data['referral_code']); // Fetch settings data
          setRefadd(data['referral_code']); // Store settings in state
        } catch (error) {
          console.log(error);
          // notifyError("Failed to fetch settings.");
        }
      };
  
      fetchRef();
    }
  }, [refAdd]);


  useEffect(() => {
    if (referrals.length ==0) {
      const fetchRefferalBuy = async () => {
        try {
          const data = await getReferrals();
          console.log("data:", data); // Fetch settings data
          
          setReferrals(data); // Store settings in state
        } catch (error) {
          console.log(error);
          // notifyError("Failed to fetch settings.");
        }
      };
  
      fetchRefferalBuy();
    }
  }, [referrals]);

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
        const tokenBalInNormal = ethers.utils.formatUnits(tokenBal, 18); // Use the correct number of decimals for the token
setTokenBal(Number(tokenBalInNormal)); 
      } catch (error) {
        console.error("Error fetching token details:", error);
      }
    };
    
    getBalance();
  }, []); // Runs only once when the component mounts



  
  const applyReferralAddress = async() => {
    setLoad(true);
    if(referredCode){
      const dat ={
        'referral_code': referredCode
      };
        const data = await getAddressReferralCode(dat);
        console.log(data)
        console.log("data");
        setReferralAddress(data["address"]);
    }else{
      alert("Kindly type referral code");
    }
    setLoad(false);
  }

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
  
  const publicClient = usePublicClient()



  const getTokenBalanceAndAllowance = async (tokenAddress, ownerAddress, spenderAddress) => {
      const[balance, allowance, decimals] = await Promise.all([
          publicClient.readContract({
              address : tokenAddress,
              abi : erc20Abi,
              functionName : "balanceOf",
              args : [ownerAddress]
          }),
          publicClient.readContract({
              address : tokenAddress,
              abi : erc20Abi,
              functionName : "allowance",
              args : [ownerAddress, spenderAddress]
          }),
          publicClient.readContract({
              address : tokenAddress,
              abi : erc20Abi,
              functionName : "decimals",
          }),
      ])

      return {balance, allowance, decimals}

  }

    const approveSpender = async (tokenAddress, spender) => {
      const hash = await  walletClient.writeContract({
        address : tokenAddress,
        abi : erc20Abi,
        functionName : "approve",
        args : [spender, maxUint256]
      })
      await publicClient.waitForTransactionReceipt({hash})
      return true
    }


  // TODO add referral
  const referral = zeroAddress

  const handleBuy = async () => {
    // Get wallet client

    console.log("About to connect")
    
    
    console.log(walletClient)
    if (!walletClient) {
      console.log("Wallet not connected");
      // Notify the user
      return;
    }
  
    console.log(amount);
    try {
      if (selectedCurrency === "ETH") {
        // const pricePerTokenInWei = ethers.utils.parseUnits(tokenDetails.tokenPrice.toString(), "wei");
        const totalAmountInEthWei = ethers.utils.parseUnits(tokenDetail[4].toString(), "wei"); // Assuming tokenDetail[4] is in Wei
        const totalPriceInWei = totalAmountInEthWei.mul(ethers.BigNumber.from(amount));// Ensure amount is in BigInt if necessary
        
        // Multiply totalAmountInEthWei by the amount
        
  
        const hash = await walletClient.writeContract({
          address: CONTRACT_ADDRESS,
          abi: presaleAbi.abi,
          functionName: "buyToken",
          args: [Number(amount), referralAddress],
          gasLimit: ethers.utils.hexlify(8000000),
          value: totalPriceInWei, // Ensure proper usage of BigInt here
        });
  
        await publicClient.waitForTransactionReceipt({ hash });
        const buy_data = {
          "address":address,
          "amount": Number(amount).toString()
      };
      await storeRecentBuy(buy_data);
        window.location.reload();
      } else {
        const tokenAddress = getTokenAddress(buyToken);
        if (!tokenAddress) {
          console.log("Token not supported");
          // Notify user that the token is not supported
          return;
        }
  
        const { balance, allowance, decimals } = await getTokenBalanceAndAllowance(
          tokenAddress,
          walletClient.account.address,
          CONTRACT_ADDRESS
        );
        const amountWei = parseUnits(amount, decimals); // Use correct decimals
  
        if (balance < amountWei) {
          console.log("Insufficient Balance");
          // Notify user about insufficient balance
          return;
        }
  
        if (amountWei > allowance) {
          console.log("Approving spender...");
          await approveSpender(tokenAddress, CONTRACT_ADDRESS);
        }
  
        const hash = await walletClient.writeContract({
          address: CONTRACT_ADDRESS,
          abi: presaleAbi.abi,
          functionName: "buyWithOtherCryptos",
          args: [tokenAddress, BigInt(amountWei), referral], // Use BigInt if necessary
        });
  
        await publicClient.waitForTransactionReceipt({ hash });
      }
    } catch (error) {
      console.error("Transaction error:", error);
      // Optionally notify the user about the error in a user-friendly way
    }
  };
  


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
            1 KAI = {settings? Number(settings['price']): "0.0002"} ETH
            </p>
            <p className="text-[1.1rem] md:text-[1.3rem] lg:text-[2rem] font-semibold">
            40,000,000,000 KAI = 1 Meter
            </p>
          </div>

          <div className="bg-white rounded-lg px-[0.8rem] py-[1rem] md:px-[1.2rem] md:py-[1.5rem] lg:px-[1.5rem] lg:py-[2rem]">
            <p className="text-[1rem] md:text-[1rem] lg:text-[2rem] font-bold">
            {settings? formatNumberWithCommas(Number(settings['amount_raised_in_usdt'])): "245,353,533"} /
              <span className="text-[#FFA800]">{settings?formatNumberWithCommas(Number(settings['coin'])): "8000000"} Meters</span>
            </p>
            <p className="font-medium text-[1rem] md:text-[1.2rem] lg:text-[1.5rem]">
              <span className="font-bold text-[#3B2621]">Stage 1 = 40%</span> of
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
            <span className="text-[#964C1E]">USD Raised</span> ${settings? formatNumberWithCommas(Number(settings['amount_raised_in_dollars'])): "4,215,177.87"}
            <br />
            <span className="text-[#964C1E]">1ETH</span> = {settings? formatNumberWithCommas(Number(settings['price']) * 10000000): "20,000"} KAI
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
                <p>KAI</p>
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
                    <input  className="w-full bg-transparent" onChange={(val)=>setRefferedCode(val.target.value)} value={referredCode} />
                   
                  </div>
                  <Button text={load?"Loading.....":`Apply Code`} clickFunction={!load && applyReferralAddress} width={`w-full`} />
                </div>
              </div>

              <div className="">
                <p className="text-left">Referral Address</p>

                <div className="flex gap-5 items-center text-[0.5rem] md:text-[0.8rem]">
                  <div className={`${styles.inputContainer}`}>
                    <input type="" className="w-full bg-transparent"  value={referralAddress} readonly/>
                 
                  </div>

             
                </div>
              </div>
            </div>

            <div className="flex mt-[2rem] justify-center">
              <Button colored text={`BUY COIN`} clickFunction={handleBuy} />
            </div>

            <div className="flex mt-[2rem] justify-center">
              Your Total Token Balance : <b>{tokenBal} KAI</b>
            </div>
            <div className="flex mt-[2rem] justify-center">
              Your Referral Code is : <b>{address && refAdd? refAdd: "Kindly connect wallet to get your referral code"}</b>
            </div>
          </div>
        </div>

        <div className="contentContainer bg-[#3B2621] mt-[1rem]">
              <p className="text-[#FFFFFF82] text-[1rem] md:text-[1.2rem]">
                Recent Buy
              </p>
              {kut.map((recent)=>(
              <div  key={recent['id']} className="flex items-center justify-between">
                <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
                {shortenAddress(recent["address"])}
                </p>
                <p className="text-[#FBB58A] text-[0.8rem] md:text-[1.2rem]">
                {recent["amount"] }KAI
                </p>
                <p className="text-[0.8rem] md:text-[1.2rem] text-[#FBB58A]">{timeAgo(recent['created_at'])}</p>
              </div>
        ))} 
        
        </div>
<br />

        <div
          className={`contentContainer bg-[#fff] h-max border-1 border-slate-950 `}
        >
          <div>


            <h2 className="title  text-center text-[#3B2621] "> Top  Recent Referral Bonus </h2>
        <div className="table-responsive mt-[3rem] h-[500px] overflow-y-scroll  ">
          <table className={`${mystyle.tableStyle} `}>
            <thead>
              <tr>
                {HEADERS.map((th, index) => (
                  <th className={`${mystyle.thStyle}`} key={index}>
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {referrals.map((recent, index) => (
                <tr key={recent['id']} className={`h-[70px]`}>
                  <td className={`${mystyle.tdStyle}`}>{index + 1}</td>

                  <td className={`${mystyle.tdStyle}`}> {shortenAddress(recent["address"]['address'])}</td>
                  <td className={`${mystyle.tdStyle} `}> {recent["total_referred"] }KAI</td>
                  <td className={`${mystyle.tdStyle} `}> {recent["amount"] }KAI</td>

                  <td className={`${mystyle.tdStyle}`}>{timeAgo(recent['created_at'])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
</div>
</div>

        
      </div>
    </section>
  );
};

export default Staking;
