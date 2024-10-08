import React, {useState, useEffect} from "react";
import styles from "../styles/Navbar.module.css";
import { logo } from "../assets";
import { CHECK_WALLET_CONNECTED } from "../context/constants";

const Header = ({account, 
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  setAccount,
  setLoader,
  setOwnerModel,
  shortenAddress,
  details,
  currency,
  ownerModel }) => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled]= useState(false);
    // const [headerDetail, setDe]
    const [detail, setDetail] = useState({})
    // const 
    useEffect(() => {
      console.log(details)
      setDetail(details)
    }, [details])

    useEffect(() => {
      console.log(account)
    }, [account])


    const [toggle, setToggle] = useState(false);
    const toggleHandler = () => {
      setToggle((prev) => !prev);
    };

  useEffect(()=> {
    setLoader(false);
      if(typeof window.ethereum !== "undefined"){
        setIsMetaMaskInstalled(true);
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        setLoader(false);
      }

      return () => {
        if(typeof window.ethereum !== "undefined"){
          window.ethereum.removeListener(
            "accountChanged",
            handleAccountsChanged
          );
        }
      }
  }, []); 
  const handleAccountsChanged= (accounts) => {
    // console.log(accounts);
    setAccount(accounts[0])
  };
  const connectMetamask = async() => {
    if(typeof window.ethereum !== "undefined"){
      try{
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
          });
          setAccount(accounts[0]);
      } catch(err){
        console.log(err);
      }
    }else{
      console.log("Metamask is not installed");
    }
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <div className={`${styles.imageContainer}`}>
            <img src={logo.src} alt="Logo" className="w-[50px]" />
          </div>
          <h2 className={`${styles.logoTitle}`}>Kutte Ai</h2>
        </div>
        {
          detail?.address ?(
            <a
            className={`${styles.navBtn}`}
            // onClick={() =>navigator.clipboard.writeText(detail?.address)}
            onClick={() => DISCONNECT_WALLET()}
          >
            {shortenAddress(detail?.address)}:{" "}
            {detail?.maticBal.slice(0,6)}
            {/* {currency} */}
          </a>
          ):(
            <>
            <button onClick={()=> connectMetamask()} className={`${styles.navBtn}`}>
            Connect wallet
            </button>
            </>
          )
        }
       
      </div>
    </nav>
  );
};

export default Header;
