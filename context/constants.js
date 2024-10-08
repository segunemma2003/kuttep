import {ethers} from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


import tokenICO from "./TokenICO.json";
import erc20 from "./ERC20.json";
import price20 from "./Price.json";
import { storeAddress } from "../utilss/api";


export const TOKEN_ADDRESS = "0x1e9364b8e361ac0BF5BBFaB70778955C8e4BA705";
export const ERC20_ABI = erc20.abi;

export const OWNER_ADDRESS = "0xe1570f645B22A8774efd0585fC254E8f16EF5553";
export const CONTRACT_ADDRESS = "0x2D7D248d5fBC132eE652a35305000fAB478ea52B";
export const CONTRACT_ABI = tokenICO.abi;
export const PRICE_ABI = price20.abi;

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },
  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },
  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};


const changeNetwork = async({ networkName}) => {
  try {
    if(!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        }
      ]
    });
  } catch(error){
    console.log(error.message);
  }
}

export const handleNetworkSwitch = async() => {
  const networkName = "sepolia";
  await changeNetwork({ networkName});
} 

export const CHECK_WALLET_CONNECTED = async() => {
 if(!window.ethereum) return console.log("please install metamask");
 await handleNetworkSwitch();

 const account = await window.ethereum.request({
  method: "eth_accounts"
 });

 if(account.length) {
  const data={
    "address":account[0]
  };
  const response = await storeAddress(data);
console.log(response);
  return account[0];
 }else{
  console.log("Please install metamask & connect, Reload");
 }
} 


// export const CONNECT_WALLET  = async () => {
//   try{

//     if(!window.ethereum) return console.log("please install metamask");
//     if(window.ethereum) console.log("there is an ethereum here");
//  await handleNetworkSwitch();

//  const account = await window.ethereum.request({
//   method: "eth_requestAccounts"
//  });
// window.location.reload();
// data={
//   "address":account[0]
// };
// const response = await storeAddress(data);
// console.log(response);
//   return account[0];
//   } catch(err){
//     console.log(err);
//   }
// }


// export const CONNECT_WALLET = async () => {
//   try {
//     // Create a new instance of Web3Modal
//     const web3Modal = new Web3Modal({
//       cacheProvider: true, // Set to true to cache the provider
//       providerOptions: {},  // Add custom providers here if needed
//     });

//     // Open the modal to select a wallet
//     const provider = await web3Modal.connect();

//     // Create an instance of ethers.js provider
//     const ethersProvider = new ethers.providers.Web3Provider(provider);

//     // Get the signer for account access
//     const signer = ethersProvider.getSigner();

//     // Get the connected accounts
//     const accounts = await signer.getAddress();
    
//     // Log the account address
//     console.log("Connected account:", accounts);

//     // Get the current network
//     const network = await ethersProvider.getNetwork();

//     // Desired network to switch to
//     const desiredNetworkName = "holesky"; // Change this to your desired network

//     // Check if we need to switch networks
//     if (network.name !== desiredNetworkName) {
//       console.log(`Switching to ${desiredNetworkName} network...`);
//       await handleNetworkSwitch(desiredNetworkName); // Switch to the desired network
//     }

//     // Store the address or perform further actions
//     const data = { address: accounts };
//     const response = await storeAddress(data);
//     console.log(response);

//     return accounts;

//   } catch (err) {
//     console.log("Error:", err);
//   }
// };




export const CONNECT_WALLET = async () => {
  try {
    // WalletConnect provider options (you can customize or add other providers)
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "dbbc479bfa454288a09100c8eaff4e9f", // Required for WalletConnect
        },
      },
    };

    // Create a new instance of Web3Modal
    const web3Modal = new Web3Modal({
      cacheProvider: false, // Set to true to cache the provider
      providerOptions, // Using WalletConnect provider here
    });

    // Open the modal to select a wallet (MetaMask or WalletConnect)
    const provider = await web3Modal.connect();

    // Create an instance of ethers.js provider
    const ethersProvider = new ethers.providers.Web3Provider(provider);

    // Get the signer for account access
    const signer = ethersProvider.getSigner();

    // Get the connected accounts
    const accounts = await signer.getAddress();
    console.log("Connected account:", accounts);

    // Get the current network
    const network = await ethersProvider.getNetwork();
    console.log("Current network:", network.name);

    // Specify the desired network to switch to
    const desiredNetworkName = "sepolia"; // Change to your desired network name

    // Check if network switch is necessary
    if (network.name !== desiredNetworkName) {
      console.log(`Switching to ${desiredNetworkName} network...`);
      await handleNetworkSwitch(desiredNetworkName); // Use your custom handleSwitch function
    }

    // Store the address or perform further actions
    const data = { address: accounts };
    const response = await storeAddress(data);
    console.log(response);

    return accounts;

  } catch (err) {
    console.log("Error:", err);
  }
};

const waitForEthereum = async (timeout = 5000) => {
  const start = Date.now();

  while (typeof window.ethereum === 'undefined') {
    console.log('Waiting for MetaMask to load...');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if the wait has exceeded the timeout
    if (Date.now() - start >= timeout) {
      alert('MetaMask is not detected. Please install MetaMask.');
      return null;  // Exit the function if MetaMask is not detected
    }
  }
  return window.ethereum;  // Return the ethereum object if detected
};




const fetchContract = (address, abi, signer) => new ethers.Contract(address, abi, signer);



export const TOKEN_ICO_CONTRACT  = async () => {
  try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    return contract;

  } catch(err){
    console.log(err);
  }
}


export const ERC20  = async (TOKEN_ADDRESS) => {
  try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);


    const network = await provider.getNetwork();
    const signer = await provider.getSigner();

   const userAddress =  signer.getAddress();

   const contract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);

   const balance = await contract.balanceOf(userAddress);


   const name = await contract.name();

   const symbol = await contract.symbol();

   const supply = await contract.totalSupply();
   const decimals = await contract.decimals();

   const address = await contract.address;

   const token = {
    address:address,
    name: name,
    symbol: symbol,
    decimals: decimals,
    supply: ethers.utils.formatEther(supply.toString()),
    balance: ethers.utils.formatEther(balance.toString()),
    chainId: network.chainId
   };
   console.log(token);
    return token;

  } catch(err){
    console.log(err);
  }
}



export const ERC20_ICO_CONTRACT  = async () => {
  try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(CONTRACT_ADDRESS, ERC20_ABI, signer);

    return contract;

  } catch(err){
    console.log(err);
  }
}


export const DISCONNECT_WALLET = async () => {
  try {
    // Initialize Web3Modal instance
    const web3Modal = new Web3Modal();

    // Check if there's a cached provider
    if (web3Modal.cachedProvider) {
      // Clear the cached provider (this will "disconnect" the wallet)
      web3Modal.clearCachedProvider();

      // Reset local storage to remove any stored wallet information
      window.localStorage.clear();

      console.log("Cached provider cleared, wallet disconnected.");

      // Optional: Perform additional cleanup or app state reset here
    } else {
      console.log("No provider cached, no wallet to disconnect.");
    }

    // Optionally, reload the page to reset the app state
    window.location.reload();
  } catch (err) {
    console.error("Error while disconnecting:", err);
  }
};


export const GET_BALANCE  = async () => {
  try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

   const maticBal = await signer.getBalance();

   return ethers.utils.formatEther(maticBal.toString());

  } catch(err){
    console.log(err);
  }
}



export const CHECK_ACCOUNT_BALANCE  = async (ADDRESS) => {
  try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    
    const maticBal = await provider.getBalance(ADDRESS);

    return ethers.utils.formatEther(maticBal.toString());

  } catch(err){
    console.log(err);
  }
}


export const addTokenToMetamask  = async () => {
  if(window.ethereum){
    const tokenDetails = await ERC20(TOKEN_ADDRESS);
    const tokenDecimals = await tokenDetails?.decimals;
    const tokenAddress = TOKEN_ADDRESS;
    const tokenSymbol = tokenDetails?.symbol;
    const tokenImage = "https://ibb.co/JCf9d69";

    try{
      const wasAdded = await  window.ethereum.request({
        method: "wallet_watchAsset",
        params:{
          type:"ERC20",
          options:{
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage
          }
        }
      });

      if(wasAdded){
        return "Token added!";
      } else {
        return "Token not added";
      }
    }catch(e){
      console.log(e);
      return "failed to add";
    }
  }else{
    return "Metamask is not installed";
  }
}


// const tokenImage =
//       "https://www.daulathussain.com/wp-content/uploads/2024/05/theblockchaincoders.jpg";
