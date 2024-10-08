import React, {useState, useEffect, useContext} from "react";
import {Footer,
  Header,
  About,
  KAI,
  AboutKai,
  Liquidity,
  SpaceGuard,
  Roadmap,
  SmartContract,
  Sponsors,
  Patners,
  Updates,
  Community,
  Brand,
  Contact,
  Faq,
  Features,
  Hero,
  Loader,
  Progress,
  SideBar, 
  Team,
  Token,
  TokenInfo,
  // Roadmap,
  Earn,
  CurrentPresale,
  Popup,
  TransferToken,
  Owner,
  TransferCurrency,
  Donate,
  UpdatePrice,
  UpdateAddress, 
  PopupTwo} from "../componentsss/index";

import {TOKEN_ICO_Context} from "../context/index";
import {shortenAddress} from "../utilss/index";
import { getFirstSetting, getRecentBuys } from '../utilss/api';
import ReferralPopup from "../componentsss/ReferralPopup";
import HowToBuy from "../componentsss/HowToBuy";
import Staking from "../componentsss/Staking";

const index = () => {
  const {
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
    CHECK_WALLET_CONNECTED,
    CHECK_ACCOUNT_BALANCE,
    setAccount,
    setLoader,
    addTokenToMetamask,
    TOKEN_ADDRESS,
    DISCONNECT_WALLET,
    loader,
    account,
    currency
  } = useContext(TOKEN_ICO_Context);

  const [ownerModel, setOwnerModel] = useState(false);
  const [buyModel, setBuyModel] = useState(false);
  const [howToBuy, setHowToBuy] = useState(false);
  const [staking, setStaking] = useState(false);
  const [startReferring, setStartReferring] = useState(false);
  const [transferModel, setTransferModel] = useState(false);
  const [transferCurrency, setTransferCurrency] = useState(false);
  const [openDonate, setopenDonate] = useState(false);
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
  const [ referralPop, setReferralPopup] = useState(false);
  const [detail, setDetail] = useState();
  const [settings, setSettings] = useState(null);
  const [kut, setKut] = useState([]);
  const [referral, setReferral] = useState(null);

  useEffect(() => {
    if (detail === undefined) {  // Check if `detail` is undefined
      const fetchData = async () => {
        try {
          const items = await TOKEN_ICO();
          console.log(items);
          setDetail(items); // Set fetched data to `detail`
        } catch (error) {
          console.log(error);
          // handle error, if needed
        }
      };
  
      fetchData();
    }
  }, []); // Only run if `detail` changes and is still `undefine

  
  useEffect(() => {
    if (settings === null) {
      const fetchSettings = async () => {
        try {
          const data = await getFirstSetting();
          console.log("data:", data.data); // Fetch settings data
          setSettings(data.data); // Store settings in state
        } catch (error) {
          console.log(error);
          // notifyError("Failed to fetch settings.");
        }
      };
  
      fetchSettings();
    }
  }, [settings]);


 


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


  return (
    <>
   
        {ownerModel &&
          (<Owner 
            setOwnerModel={setOwnerModel}
            currency={currency}
            detail={detail}
            account={account}
            setTransferModel={setTransferModel}
            setTransferCurrency={setTransferCurrency}
            setopenDonate = {setopenDonate}
            TOKEN_WITHDRAW={TOKEN_WITHDRAW}
            setOpenUpdatePrice = {setOpenUpdatePrice}
            setOpenUpdateAddress = {setOpenUpdateAddress}
          />
        
        )}
        {/* {buyModel && 
        (<Popup 
          setBuyModel={setBuyModel} 
          BUY_TOKEN={BUY_TOKEN}
          currency={currency}
          detail={detail}
          account={account}
          ERC20={ERC20}
          TOKEN_ADDRESS={TOKEN_ADDRESS}
          setLoader={setLoader}
          />)} */}


{buyModel && 
        (<PopupTwo
          setBuyModel={setBuyModel} 
          BUY_TOKEN={BUY_TOKEN}
          currency={currency}
          detail={detail}
          account={account}
          ERC20={ERC20}
          TOKEN_ADDRESS={TOKEN_ADDRESS}
          setLoader={setLoader}
          />)}




          {referralPop && (<ReferralPopup 
            setReferralPopup={setReferralPopup}
            setLoader={setLoader}
            // referral = {referral}
          />)}

          {transferModel && (
            <TransferToken 
              setTransferModel={setTransferModel}
              TRANSFER_TOKEN={TRANSFER_TOKEN}
              ERC20={ERC20}
              setLoader={setLoader}
            
            />
          )}

{transferCurrency && (
            <TransferCurrency 
              setTransferCurrency={setTransferCurrency}
              TRANSFER_ETHER={TRANSFER_ETHER}
              detail={detail}
              currency={currency}
              CHECK_ACCOUNT_BALANCE={CHECK_ACCOUNT_BALANCE}  
              setLoader={setLoader}
            />
          )}

          {openDonate && (
            <Donate
              detail={detail}
              currency={currency}
              setopenDonate={setopenDonate}
              DONATE={DONATE}
            />
          )}

{openUpdatePrice && (
            <UpdatePrice
              detail={detail}
              currency={currency}
              setOpenUpdatePrice={setOpenUpdatePrice}
              UPDATE_TOKEN_PRICE={UPDATE_TOKEN_PRICE}
            />
          )}
{openUpdateAddress && (
            <UpdateAddress
              detail={detail}
              currency={currency}
              setOpenUpdateAddress={setOpenUpdateAddress}
              UPDATE_TOKEN = {UPDATE_TOKEN}
              ERC20={ERC20}
              setLoader={setLoader}
            />
          )}
          {
            howToBuy &&(
            <HowToBuy
            setHowToBuy={setHowToBuy}
            />)
          }

{
            staking &&(
            <Staking
            setStaking={setStaking}
            />)
          }
          {loader && <Loader />}

          <Header 
          account={account} 
          CONNECT_WALLET={CONNECT_WALLET}
          setAccount={setAccount}
          setLoader={setLoader}
          setOwnerModel={setOwnerModel}
          shortenAddress={shortenAddress}
          details={detail}
          DISCONNECT_WALLET={DISCONNECT_WALLET}
          currency={currency}
          ownerModel={ownerModel} 
          />
          <Hero 
            setBuyModel={setBuyModel}
            account={account}
            settings= {settings}
            CONNECT_WALLET={CONNECT_WALLET}
            setAccount={setAccount}
            setLoader={setLoader}
            detail={detail}
            addTokenToMetamask={addTokenToMetamask}
          />
        <About
        
        setHowToBuy={setHowToBuy}
        setStaking={setStaking}
        />

        <Earn 
        setReferralPopup={setReferralPopup}
        />
      <CurrentPresale 
        settings={settings}
        detail={detail}
      />

      <KAI setBuyModel={setBuyModel} />
      <AboutKai 
      detail={detail}
      kutte={kut}
      settings={settings}
      />
      <Liquidity />
      <SpaceGuard />
      <Roadmap />
      <SmartContract detail={detail} setBuyModel={setBuyModel} settings={settings} setLoader={setLoader} />
      <Sponsors />
      <Patners />
      <Updates />
      <Community />
      <Footer setBuyModel={setBuyModel}/>
        {/* <Features />
        <Token />
        <TokenInfo detail={detail} />
        <Team />
        <Faq />
        <Contact />
        <Footer /> */}
    
    </>
  );
};

export default index;
