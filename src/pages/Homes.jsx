import Navbars from "../components/Navbars";
import Hero from "../components/Hero";
import Super from "../components/Super";
import Earn from "../components/Earn";
import CurrentPresale from "../components/CurrentPresale";
import KAI from "../components/KAI";
import AboutKai from "../AboutKai";
import Liquiditys from "../components/Liquiditys";
import SpaceGuards from "../components/SpaceGuards";
import Roadmap from "../components/Roadmap";
import SmartContract from "../components/SmartContract";
import Sponsors from "../components/Sponsors";
import Patners from "../components/Patners";
import Updates from "../components/Updates";
import Stakings from "../components/Stakings";
import Footers from "../components/Footer";
import Community from "../components/Community";
import { useEffect, useState } from "react";
import { getFirstSetting } from "../lib/api";


const Homes = () => {

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
    return (<>
    <Navbars />
    <Hero
    settings= {settings}
    />
    <Super />
    <Earn />

      <CurrentPresale  
      settings={settings}
      />
      <KAI />
      <AboutKai />
      <Liquiditys />
      <SpaceGuards />
      <Roadmap />
      <SmartContract   settings={settings} />
      <Sponsors />
      <Patners />
      <Updates />
      <Community />
      <Footers />

    </>);
}


export default Homes;