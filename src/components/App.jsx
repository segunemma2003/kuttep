import React, { createContext, useContext, useState } from "react";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Super from "./component/Super";
import Earn from "./component/Earn";
import KAI from "./component/KAI";
import Liquidity from "./component/Liquidity";
import SpaceGuard from "./component/SpaceGuard";
import Roadmap from "./component/Roadmap";
import SmartContract from "./component/SmartContract";
import Sponsors from "./component/Sponsors";
import Patners from "./component/Patners";
import Updates from "./component/Updates";
import Community from "./component/Community";
import Footer from "./component/Footer";
import CurrentPresale from "./component/CurrentPresale";
import AboutKai from "./component/AboutKai";
import Modal from "./component/Modal";
import Staking from "./component/Staking";

const ModalContext = createContext();

export const useModal = () => {
  useContext(ModalContext);
};

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <Super />
      <Earn />

      <CurrentPresale />
      <KAI />
      <AboutKai />
      <Liquidity />
      <SpaceGuard />
      <Roadmap />
      <SmartContract />
      <Sponsors />
      <Patners />
      <Updates />
      <Staking />
      <Community />
      <Footer />
    </>
  );
};

export default App;
