import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre, { viem } from "hardhat";
import { getAddress, maxUint256, parseEther, parseGwei, parseUnits } from "viem";

const USDT  = "0xdac17f958d2ee523a2206206994597c13d831ec7"

const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

const priceFeeds = {
    [USDT] : "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    [USDC] : "0x986b5E1e1755e3C2440e960477f25201B0a8bbD4"
}


describe("TokenICO", function () {
  
  async function deployContracts() {
    const [signer] =  await hre.viem.getWalletClients()
    const token  = await hre.viem.deployContract("contracts/KutteAI.sol:KutteAi", [signer.account.address])
    
    const tokenIco = await hre.viem.deployContract("TokenICO")
    await tokenIco.write.updateToken([token.address])

    const res = Object.entries(priceFeeds).map(async ([_tokenAddress, _priceFeedAddress]) => {
        const tokenAddress = getAddress(_tokenAddress)
        const priceFeedAddress = getAddress(_priceFeedAddress)
        await tokenIco.write.addSupportedToken([tokenAddress, priceFeedAddress])
    })
    await Promise.all(res)
    
    await token.write.transfer([tokenIco.address, parseEther("10000")])
    
    

    
    return {
        token, tokenIco
    };
  }

  describe("Buy Token", function () {
    


    it("Should buy with ETH", async function () {
        const [signer, guy] = await viem.getWalletClients()
        
        
        const {token, tokenIco} = await loadFixture(deployContracts)
        const tokenToBuy  = "100"
        const tokenToBuyWei =  parseEther(tokenToBuy)
        const price = await tokenIco.read.tokenSalePrice()
        console.log(`Token sales price is ${price}`)
        const ethRequired = price * tokenToBuyWei / parseEther("1");
        console.log(`Amount of ETH required ${ethRequired}`)
        await tokenIco.write.buyToken([tokenToBuyWei], {value : ethRequired, account : guy.account})
        const guyBalance  = await token.read.balanceOf([guy.account.address])
        expect(guyBalance).eq(tokenToBuyWei)
              
  });

  describe("Buy with other tokens", () => {
    it("SHould buy with USDT", async () => {
        const {token, tokenIco} = await loadFixture(deployContracts)
        const usdtHolder = "0x835678a611B28684005a5e2233695fB6cbbB0007"
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [usdtHolder],
        });
        const sender = await hre.viem.getWalletClient(usdtHolder)
        
        
        const  usdtToken = await viem.getContractAt("IERC20", USDT)
        
        const tokenAMount = parseEther("100")
        const tokenRequired = await tokenIco.read.getTokenRequried([USDT, tokenAMount])
        await usdtToken.write.approve([tokenIco.address, maxUint256], {account : sender.account})
        const 
        await tokenIco.write.buyWithOtherCryptos([USDT, tokenAMount], {account : sender.account})
        const holderBalance = await token.read.balanceOf([usdtHolder])
        expect(holderBalance).eq(tokenAMount)

        await hre.network.provider.request({
            method: "hardhat_stopImpersonatingAccount",
            params: [usdtHolder],
        });

    })
  })

})
  
});
