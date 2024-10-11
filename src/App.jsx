import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Buy from "./pages/Buy.jsx"

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, localhost, bsc } from "wagmi/chains";
import Homes from "./pages/Homes.jsx";
import { createContext, useContext } from "react";


const chains = [sepolia];
const projectId = "61f529aa30c77838f2502740d05202ad";
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const ModalContext = createContext();

export const useModal = () => {
  useContext(ModalContext);
};


function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Homes />} />
            <Route path="/buy" element= {<Buy />} />
          </Routes>
        </Router>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
