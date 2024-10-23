import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks : {
    hardhat : {
      forking : {
        url : "http://localhost:8545",
        
      }
    }
  }
};

export default config;
