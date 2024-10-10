import React, {useEffect, useState} from "react";
import {ethers} from 'ethers';
import toast from 'react-hot-toast';

import { CHECK_WALLET_CONNECTED, CONNECT_WALLET, GET_BALANCE,CHECK_ACCOUNT_BALANCE, TOKEN_ICO_CONTRACT, ERC20, ERC20_ICO_CONTRACT, TOKEN_ADDRESS, addTokenToMetamask,DISCONNECT_WALLET, PRICE_ABI  } from "./constants";
import { getAddressReferralCode, storeRecentBuy, storeReferral } from "../utilss/api";



export const TOKEN_ICO_Context = React.createContext();

export const TOKEN_ICO_Provider = ({ children }) => {
    const DAPP_NAME = "KUTTEAI ICO";
    const currency = "KUT";
    const  network = "sepolia";

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
    
                // Check if enough tokens are available
                if (availableToken > 1) {
                    // Calculate total price in Wei (not formatting first)
                    const pricePerTokenInWei = ethers.utils.parseUnits(tokenDetails.tokenPrice.toString(), "wei");
                    const totalPriceInWei = pricePerTokenInWei.mul(ethers.BigNumber.from(amount));
                    
                    // Calculate the ETH equivalent (for ETH or other currencies)
                    let ethAmountToPay = totalPriceInWei;
    
                    if (paymentCurrent && paymentCurrent !== "ETH") {
                        // For non-ETH payments, convert to ETH equivalent
                        const priceInEth = await fetchChainlinkPrice(paymentCurrent); // Price in ETH
                        const convertedAmount = ethers.utils.parseUnits((amount * priceInEth).toString(), "ether");
                        ethAmountToPay = convertedAmount;
                    }
    
                    // Handle buying with other cryptos
                    if (paymentCurrent && paymentCurrent !== "ETH") {
                        await buyTokenWithOtherCrypto(amount, paymentCurrent, referrerAddress, ethAmountToPay);
                    } else {
                        // Handle buying with ETH
                        await buyTokenWithETH(amount, referrerAddress, totalPriceInWei);
                    }
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

        const ethAddress = await fetchTokenAddress(paymentCurrent);
        const transaction = await contract.buyWithOtherCryptos(Number(amount), ethAddress, referrerAddress || ethers.constants.AddressZero, {
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


const fetchTokenAddress = async (tokenSymbol) => {
    let tokenAddress;
    
    // Assign the appropriate ERC-20 token contract address based on the selected token symbol
    switch (tokenSymbol) {
        case "BTC":
            // Wrapped Bitcoin (WBTC) contract address on Ethereum network
            tokenAddress = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
            break;
        case "BNB":
            // Binance-Peg BNB token (on Ethereum)
            tokenAddress = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
            break;
        case "SOL":
            // Wrapped Solana (SOL) on Ethereum
            tokenAddress = "0x7D273E5B9382A1c5AC3D09cfA42D9E51Bd6A830D";
            break;
        case "USDT":
            // Tether (USDT) contract address on Ethereum
            tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
            break;
        case "USDC":
            // USD Coin (USDC) contract address on Ethereum
            tokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
            break;
        // case "DAI":
        //     // DAI Stablecoin contract address on Ethereum
        //     tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
        //     break;
        // case "LINK":
        //     // Chainlink Token (LINK) contract address on Ethereum
        //     tokenAddress = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
        //     break;
        case "MATIC":
            // Polygon (MATIC) on Ethereum network
            tokenAddress = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";
            break;
        // case "UNI":
        //     // Uniswap (UNI) contract address on Ethereum
        //     tokenAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
        //     break;
        // case "AAVE":
        //     // Aave Token (AAVE) contract address on Ethereum
        //     tokenAddress = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
        //     break;
        // case "SUSHI":
        //     // SushiSwap (SUSHI) contract address on Ethereum
        //     tokenAddress = "0x6B3595068778DD592e39A122f4f5a5CF09C90fE2";
        //     break;
        // case "YFI":
        //     // yearn.finance (YFI) contract address on Ethereum
        //     tokenAddress = "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e";
        //     break;
        // case "CRV":
        //     // Curve DAO Token (CRV) contract address on Ethereum
        //     tokenAddress = "0xD533a949740bb3306d119CC777fa900bA034cd52";
        //     break;
        // case "COMP":
        //     // Compound (COMP) contract address on Ethereum
        //     tokenAddress = "0xc00e94Cb662C3520282E6f5717214004A7f26888";
        //     break;
        // case "SNX":
        //     // Synthetix (SNX) contract address on Ethereum
        //     tokenAddress = "0xC011A72400E58ecD99Ee497CF89E3775d4bd732F";
        //     break;
        // case "MKR":
        //     // Maker (MKR) contract address on Ethereum
        //     tokenAddress = "0x9f8F72aA9304C8B593d555F12ef6589Cc3A579A2";
        //     break;
        // case "BAT":
        //     // Basic Attention Token (BAT) contract address on Ethereum
        //     tokenAddress = "0x0D8775F648430679A709E98d2b0Cb6250d2887EF";
        //     break;
        // case "ZRX":
        //     // 0x (ZRX) contract address on Ethereum
        //     tokenAddress = "0xE41d2489571d322189246DaFA5ebDe1F4699F498";
        //     break;
        // case "OMG":
        //     // OMG Network (OMG) contract address on Ethereum
        //     tokenAddress = "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07";
        //     break;
        // case "BAL":
        //     // Balancer (BAL) contract address on Ethereum
        //     tokenAddress = "0xba100000625a3754423978a60c9317c58a424e3D";
        //     break;
        // case "LEND":
        //     // Aave (LEND) contract address on Ethereum
        //     tokenAddress = "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03";
        //     break;
        // case "FTT":
        //     // FTX Token (FTT) contract address on Ethereum
        //     tokenAddress = "0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9";
        //     break;
        // case "1INCH":
        //     // 1inch (1INCH) contract address on Ethereum
        //     tokenAddress = "0x111111111117dC0aa78b770fA6A738034120C302";
        //     break;
        default:
            throw new Error("Unsupported token");
    }
    
    return tokenAddress;
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
        case "USDT":
            priceFeedAddress = "0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46"; // USDT/ETH
            break;
        case "USDC":
            priceFeedAddress = "0x986b5E1e1755e3C2440e960477f25201B0a8bbD4"; // USDC/ETH
            break;
        case "MATIC":
            priceFeedAddress = "0x327e23A4855b6F663a28c5161541d69Af8973302"; // MATIC/ETH
            break;
        default:
            throw new Error("Unsupported token");
    }

    // Connect to Chainlink price feed contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const priceFeed = new ethers.Contract(priceFeedAddress, PRICE_ABI, provider);
    
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