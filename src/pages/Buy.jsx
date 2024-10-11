import { useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Navbars from "../components/Navbars";
import SmartContract from "../components/SmartContract";
import Staking from "../components/Staking";
import Footers from "../components/Footer";






const Buy = () => {

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

    return(<>
            <Navbars />
            <SmartContract />
            <Staking />
            <Footers />
    </>);
}


export default Buy;