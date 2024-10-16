import { useAppKit } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Navbars from "../components/Navbars";
import SmartContract from "../components/SmartContract";
import Staking from "../components/Staking";
import Footers from "../components/Footer";
import { getFirstSetting } from "../lib/api";



const Buy = () => {


    const [amount, setAmount] = useState("0");
  const [output, setOutput] = useState(0);
  const [buyToken, setBuyToken] = useState("bnb");
  const { address } = useAccount();
  const { open } = useAppKit();
  const [settings, setSettings] = useState(null);

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
            <SmartContract settings={settings} />
            <Staking  settings={settings} />
            <Footers />
    </>);
}


export default Buy;