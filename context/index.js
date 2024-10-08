import React, {useEffect, useState} from "react";
import {ethers} from 'ethers';
import toast from 'react-hot-toast';

import { CHECK_WALLET_CONNECTED, CONNECT_WALLET, GET_BALANCE,CHECK_ACCOUNT_BALANCE, TOKEN_ICO_CONTRACT, ERC20, ERC20_ICO_CONTRACT, TOKEN_ADDRESS, addTokenToMetamask,DISCONNECT_WALLET  } from "./constants";
import { getAddressReferralCode, storeRecentBuy, storeReferral } from "../utilss/api";



export const TOKEN_ICO_Context = React.createContext();

export const TOKEN_ICO_Provider = ({ children }) => {
    const DAPP_NAME = "KUTTEAI ICO";
    const currency = "KUT";
    const  network = "holesky";

    const [loader, setLoader] = useState(false);
    const [account, setAccount] = useState();
    const [count, setCount] = useState(0);

    const notifySuccess = (msg) => toast.success(msg, {duration:2000});
    const notifyError = (msg) => toast.error(msg, {duration:2000});

    

    const TOKEN_ICO = async()=>{
        try{
            const  address = await  CHECK_WALLET_CONNECTED();
            console.log(`Connected addresss ${address}`)
            if(address) {
                setLoader(true);
                setAccount(address);
                const contract = await TOKEN_ICO_CONTRACT();

                const tokenDetails = await contract.getTokenDetails();
                const contractOwner = await contract.owner();
                const soldTokens = await contract.soldTokens();


                const ethBal = await GET_BALANCE();
                const token = {
                    tokenBal: ethers.utils.formatEther(tokenDetails.balance.toString()),
                    name: tokenDetails.name,
                    symbol: tokenDetails.symbol,
                    supply: ethers.utils.formatEther(tokenDetails.supply.toString()),
                    tokenPrice: ethers.utils.formatEther(tokenDetails.tokenPrice.toString()),
                    tokenAddr: tokenDetails.tokenAddr,
                    maticBal: ethBal,
                    address: address.toLowerCase(),
                    owner: contractOwner.toLowerCase(),
                    soldTokens: soldTokens.toNumber(),
                }

                setLoader(false);
                return token;
            }
        }catch(error){
            console.log(error);
            notifyError("error try again later");
            setLoader(false);
        }
    }

    // const BUY_TOKEN = async(amount,paymentCurrent,referrerAddress)=>{
    //     try{
    //         setLoader(true);
    //         const  address = await  CHECK_WALLET_CONNECTED();
    //         if(address) {
            
    //             setAccount(account);
    //             const contract = await TOKEN_ICO_CONTRACT();
    //             const tokenDetails = await contract.getTokenDetails(); 
    //             const availableToken = ethers.utils.formatEther(
    //                 tokenDetails.balance.toString()
    //             );
    //             if(availableToken > 1){
    //                 const price = ethers.utils.formatEther(
    //                     tokenDetails.tokenPrice.toString()
    //                 );
                    
    //             const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

    //             const pricePerToken = ethers.utils.formatEther(tokenDetails.tokenPrice.toString());
    //             let ethAmountToPay = ethers.utils.parseUnits(pricePerToken.toString(), "ether");

    //                 // Check if the user is paying with another cryptocurrency (e.g., BTC, BNB)
    //             if (paymentCurrent && paymentCurrent !== "ETH") {
    //                 const priceInEth = await fetchChainlinkPrice(paymentToken); // Get price of BTC/BNB/SOL in ETH
    //                         const convertedAmount = (amount * priceInEth).toString();
    //                         ethAmountToPay = ethers.utils.parseUnits(convertedAmount, "ether");
    //                 }

    //             const transaction = await contract.buyToken(Number(amount),  referrerAddress || ethers.constants.AddressZero, {
    //                 value: payAmount.toString(),
    //                 gasLimit: ethers.utils.hexlify(8000000)
    //             });
    //             await transaction.wait();
    //             var buy_data = {
    //                 "address":address,
    //                 "amount":Number(amount)
    //             }
                
    //             await storeRecentBuy(buy_data);
    //             if(referrerAddress != null){
    //                 var buy_data = {
    //                     "referral_address":address,
    //                     "referred_address":referrerAddress,
    //                     "amount":Number(amount)
    //                 }
                    
    //             await storeReferral(buy_data);
    //             }
    //             notifySuccess("Transaction completed successfully");
    //             window.location.reload();
    //             }
               
    //             setLoader(false);
    //             // return token;
    //         }
    //     }catch(error){
    //         console.log(error);
    //         notifyError("error try again later");
    //         setLoader(false);
    //     }
    // }



    const BUY_TOKEN = async (amount, paymentCurrent, referrerAddress) => {
        try {
            console.log(paymentCurrent);
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if (address) {
                setAccount(account);
                const contract = await TOKEN_ICO_CONTRACT();
                const tokenDetails = await contract.getTokenDetails();
                const availableToken = ethers.utils.formatEther(tokenDetails.balance.toString());
                
                // Check if there are enough tokens available
                if (availableToken > 1) {
                    const pricePerToken = ethers.utils.formatEther(tokenDetails.tokenPrice.toString()* Number(amount));
                    const payAmount = ethers.utils.parseUnits((pricePerToken).toString(), "ether");
    
                    // Calculate the amount to pay in ETH
                    let ethAmountToPay = ethers.utils.parseUnits(pricePerToken.toString(), "ether");
    
                    // If the user is paying with another cryptocurrency (BTC, BNB, SOL)
                    // if (paymentCurrent && paymentCurrent !== "ETH") {
                    //     const priceInEth = await fetchChainlinkPrice(paymentCurrent); // Fetch price in ETH
                    //     console.log("price");
                    //     console.log(priceInEth);

                    //     const convertedAmount = (amount * priceInEth).toString();
                    //     ethAmountToPay = ethers.utils.parseUnits(convertedAmount, "ether");
                    //     console.log(ethAmountToPay);
                    //     // return;
                    //     // Call function to handle buying tokens with other cryptocurrencies
                    //     await buyTokenWithOtherCrypto(amount, paymentCurrent, referrerAddress, ethAmountToPay);
                    // } else {
                        // Call the function to buy tokens with ETH
                        await buyTokenWithETH(amount, referrerAddress, payAmount);
                    // }
                } else {
                    notifyError("Insufficient tokens available.");
                }
            }
            setLoader(false);

        } catch (error) {
            console.log(error);
            notifyError("An error occurred. Please try again later.");
            setLoader(false);
        }
    };


    // Function to handle buying tokens with ETH
const buyTokenWithETH = async (amount, referrerAddress, payAmount) => {
    try {
        const contract = await TOKEN_ICO_CONTRACT();
        if(referrerAddress){
            const dt = {
                "referral_code":referrerAddress
            }
            const ref_address = await getAddressReferralCode(dt);
            console.log(ref_address['address']);
            referrerAddress= ref_address['address'];
        }
        const transaction = await contract.buyToken(Number(amount), referrerAddress || ethers.constants.AddressZero, {
            value: payAmount.toString(),
            gasLimit: ethers.utils.hexlify(8000000)
        });

        await transaction.wait();
        // Store recent buy information
        const buy_data = {
            "address": await CHECK_WALLET_CONNECTED(),
            "amount": Number(amount)
        };
        await storeRecentBuy(buy_data);

        // Handle referrals
        if (referrerAddress) {
           
            const referralData = {
                "referral_address": await CHECK_WALLET_CONNECTED(),
                "referred_address": referrerAddress,
                "amount": Number(amount)
            };
            await storeReferral(referralData);
        }

        notifySuccess("Transaction completed successfully");
        window.location.reload();
    } catch (error) {
        console.log(error);
        notifyError("An error occurred while buying with ETH. Please try again later.");
    }
};



const buyTokenWithOtherCrypto = async (amount, paymentCurrent, referrerAddress, ethAmountToPay) => {
    try {
        const contract = await TOKEN_ICO_CONTRACT();
        if(referrerAddress){
            const dt = {
                "referral_code":referrerAddress
            }
            const ref_address = await getAddressReferralCode(dt);
            console.log(ref_address['address']);
            referrerAddress= ref_address['address'];
        }
        const transaction = await contract.buyTokenWithOtherCrypto(Number(amount), paymentCurrent, referrerAddress || ethers.constants.AddressZero, {
            value: ethAmountToPay.toString(),
            gasLimit: ethers.utils.hexlify(8000000)
        });

        await transaction.wait();
        // Store recent buy information
        const buy_data = {
            "address": await CHECK_WALLET_CONNECTED(),
            "amount": Number(amount)
        };
        await storeRecentBuy(buy_data);

        // Handle referrals
        if (referrerAddress) {
            const referralData = {
                "referral_address": await CHECK_WALLET_CONNECTED(),
                "referred_address": referrerAddress,
                "amount": Number(amount)
            };
            await storeReferral(referralData);
        }

        notifySuccess("Transaction completed successfully with " + paymentCurrent);
        window.location.reload();
    } catch (error) {
        console.log(error);
        notifyError("An error occurred while buying with " + paymentCurrent + ". Please try again later.");
    }
};


    const fetchChainlinkPrice = async (tokenSymbol) => {
        let priceFeedAddress;
        
        // Assign the appropriate Chainlink price feed contract address based on the selected token
        switch (tokenSymbol) {
          case "BTC":
            priceFeedAddress = "0xdeb288F737066589598e9214E782fa5A8eD689e8"; // BTC/ETH
            break;
          case "BNB":
            priceFeedAddress = "0x14e613ac84a31f709eadbdf89c6cc390fdc9540a"; // BNB/ETH
            break;
          case "SOL":
            priceFeedAddress = "0x4ffC43a60e009B551865A93d232E33Fce9f01507"; // SOL/ETH
            break;
          default:
            throw new Error("Unsupported token");
        }
      
        // Connect to Chainlink price feed contract
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const priceFeed = new ethers.Contract(priceFeedAddress, AggregatorV3InterfaceABI, provider);
        
        // Fetch latest price data
        const latestRoundData = await priceFeed.latestRoundData();
        const price = ethers.utils.formatUnits(latestRoundData.answer, 8); // Adjust decimals based on Chainlink feed
        
        return price; // Return the token/ETH price
      };

    const TOKEN_WITHDRAW = async()=>{
        try{
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if(address){
                const contract = await TOKEN_ICO_CONTRACT();
                const tokenDetails = await contract.getTokenDetails();

                const availableToken = ethers.utils.formatEther(tokenDetails.balance.toString());

                if(availableToken > 1){
                    const transaction = await contract.withdrawAllTokens();
                    await transaction.wait();
                    setLoader(false);
                    notifySuccess("Transaction completed successfully");
                    window.location.reload();
                }

               
            }
        }catch(error){
            console.log(error);
            notifyError("error try again later");
            setLoader(false);
        }
    }


    const UPDATE_TOKEN = async(_address)=>{
        try{
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if(address){
                const contract = await TOKEN_ICO_CONTRACT();
                
                    const transaction = await contract.updateToken(_address);
                    await transaction.wait();
                    setLoader(false);
                    notifySuccess("Transaction completed successfully");
                    window.location.reload();
               
            }
        }catch(error){
            console.log(error);
            notifyError("error try again later");
            setLoader(false);
        }
    }

    const UPDATE_TOKEN_PRICE = async(price)=>{
        try{
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if(address){
                const contract = await TOKEN_ICO_CONTRACT();
                const payAmount = ethers.utils.parseUnits(price.toString(), "ether");
                
                const transaction = await contract.updateTokenSalePrice(payAmount);
                await transaction.wait();
                setLoader(false);
                notifySuccess("Transaction completed successfully");
                window.location.reload();
                
               
            }
        }catch(error){
            console.log(error);
            notifyError("error try again later");
            setLoader(false);
        }
    }


    const DONATE = async(AMOUNT)=>{
        try{
            setLoader(true);
            const address = await CHECK_WALLET_CONNECTED();
            if(address){
                const contract = await TOKEN_ICO_CONTRACT();
                const payAmount = ethers.utils.parseUnits(AMOUNT.toString(), "ether");
                
                const transaction = await contract.transferToOwner(payAmount, {
                    value: payAmount.toString(),
                    gasLimit: ethers.utils.hexlify(8000000)
            });
                await transaction.wait();
                setLoader(false);
                notifySuccess("Transaction completed successfully");
                window.location.reload();
                
               
            }
        }catch(error){
            console.log(error);
            notifyError("error try again later");
            setLoader(false);
        }
    }

    const TRANSFER_ETHER = async(transfer)=>{
        try{
            setLoader(true);
            const {_receiver, _amount} = transfer;
             const address = await CHECK_WALLET_CONNECTED();
            if(address){
                const contract = await TOKEN_ICO_CONTRACT();
                const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");
                
                const transaction = await contract.transferEther(_receiver, payAmount, {
                    value: payAmount.toString(),
                    gasLimit: ethers.utils.hexlify(8000000)
            });
                await transaction.wait();
                setLoader(false);
                notifySuccess("Transaction completed successfully");
                window.location.reload();
                
               
            }
        }catch(error){
            console.log(error);
            notifyError("error try again later");
            setLoader(false);
        }
    }


    const TRANSFER_TOKEN = async()=>{
        try{
            setLoader(true);
            const {_tokenAddress,_sendTo,_amount} = transfer;
             const address = await CHECK_WALLET_CONNECTED();
            if(address){
                const contract = await ERC20_CONTRACT(_tokenAddress);
                const payAmount = ethers.utils.parseUnits(_amount.toString(), "ether");
                
                const transaction = await contract.transfer(_sendTo, payAmount, {
                   
                    gasLimit: ethers.utils.hexlify(8000000)
            });
                await transaction.wait();
                setLoader(false);
                notifySuccess("Transaction completed successfully");
                window.location.reload();
                
               
            }
        }catch(error){
            console.log(error);
            notifyError("error try again later");
            setLoader(false);
        }
    }

return <TOKEN_ICO_Context.Provider value={{
    TOKEN_ICO,
    BUY_TOKEN,
    TRANSFER_ETHER,
    DONATE,
    UPDATE_TOKEN,
    UPDATE_TOKEN_PRICE,
    TOKEN_WITHDRAW,
    TRANSFER_TOKEN,
    CONNECT_WALLET,
    ERC20,
    CHECK_ACCOUNT_BALANCE,
    setAccount,
    setLoader,
    addTokenToMetamask,
    CHECK_WALLET_CONNECTED,
    DISCONNECT_WALLET,
    TOKEN_ADDRESS,
    loader,
    account,
    currency

}} >{children}</TOKEN_ICO_Context.Provider>
}