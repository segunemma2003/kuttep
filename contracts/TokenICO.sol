// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface ERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    function symbol() external view returns (string memory);

    function totalSupply() external view returns (uint256);

    function name() external view returns (string memory);
}

contract TokenICO {
    
    address public owner;
    address public tokenAddress;
    uint256 public tokenSalePrice;
    uint256 public soldTokens;
    
    uint256 public totalReferralsRewarded; // Total tokens rewarded for referrals
    uint256 public referralReward; // Reward for referral in tokens
    uint256 public totalSupply; // Total supply of tokens
    uint256 public minTokenPurchase; // Minimum tokens a user can purchase
    mapping(address => bool) public hasBeenRewarded; // Track if the referrer has been rewarded
    mapping(address => mapping(address => bool)) public referralRewardsGiven; // Track if a referrer has been rewarded for a specific referred user
    mapping(address => uint256) public referralsCount; // Count of referrals per user
    mapping(address => uint256) public totalReferralsByUser; // Total referred by a user
    mapping(address => uint256) public referralEarnings; // Amount rewarded to each referrer
     mapping(address => address) public priceFeeds;

    event TokensPurchased(address indexed buyer, uint256 amount);
    event ReferralRewarded(address indexed referrer, uint256 reward);
    event TokensWithdrawn(address indexed owner, uint256 amount);
    event EtherWithdrawn(address indexed owner, uint256 amount);
    event TokenAddressUpdated(address indexed newTokenAddress);
    event TokenSalePriceUpdated(uint256 newPrice);
    event ReferralRewardUpdated(uint256 newReward);
    event MinTokenPurchaseUpdated(uint256 newMinPurchase);
    event TokenAdded(address indexed cryptoAddress, address indexed priceFeedAddress);


    modifier onlyOwner(){
        require(msg.sender == owner, "Only  contract owner can perform this action");
        _;
    }

   // Constructor to initialize the contract and set the owner
    constructor() {
        owner = msg.sender; // Set the deployer as the owner
        referralReward = 1000000000000000000000;
    }

    function updateToken(address _tokenAddress) public onlyOwner {
        tokenAddress = _tokenAddress;
        emit TokenAddressUpdated(_tokenAddress);

    }

    function updateTokenSalePrice(uint256 _tokenSalePrice) public onlyOwner {
        tokenSalePrice = _tokenSalePrice;
         emit TokenSalePriceUpdated(_tokenSalePrice);
    }

    function updateReferralReward(uint256 _referralReward) public onlyOwner {
        require(_referralReward > 0, "Referral reward must be greater than zero");
        referralReward = _referralReward;
        emit ReferralRewardUpdated(_referralReward);
    }

    // Function to update the minimum token purchase amount
    function updateMinTokenPurchase(uint256 _minTokenPurchase) public onlyOwner {
         require(_minTokenPurchase > 0, "Minimum token purchase must be greater than zero");
        minTokenPurchase = _minTokenPurchase;
        emit MinTokenPurchaseUpdated(_minTokenPurchase);
    }
    
    function multiply(uint256 x, uint256 y) internal pure returns(uint256 z){
        require(y==0|| (z = x * y )/y == x);
    }

// Internal function to handle referral logic
    function handleReferral(address referrer, address referred) internal {
        if (referrer != address(0) && referrer != referred && !referralRewardsGiven[referrer][referred]) {
            ERC20 token = ERC20(tokenAddress);
            uint256 tokenTotalSupply = token.totalSupply();
            require(
                totalReferralsRewarded + referralReward <= (tokenTotalSupply * 5) / 100,
                "Referral reward limit reached"
            );
            require(
                token.balanceOf(address(this)) >= referralReward,
                "Not enough tokens for referral reward"
            );

            // Transfer referral reward to referrer
            require(token.transfer(referrer, referralReward), "Referral reward transfer failed");

            // Mark the referral as rewarded
            referralRewardsGiven[referrer][referred] = true;

            // Update referral tracking
            totalReferralsRewarded += referralReward;
            referralsCount[referrer] += 1;
            totalReferralsByUser[referrer] += 1;
            referralEarnings[referrer] += referralReward;

            emit ReferralRewarded(referrer, referralReward);
        }
    }


     function buyToken(uint256 _tokenAmount, address referrer) public payable  {
        require(msg.value == multiply(_tokenAmount, tokenSalePrice), "Insufficient Ether provided for the token purchase");
        require(_tokenAmount >= minTokenPurchase, "Minimum token purchase amount not met");
        require(tokenAddress != address(0), "Token address not set");

        // Transfer the tokens
        ERC20 tokenToSell = ERC20(tokenAddress);
        require(_tokenAmount <= tokenToSell.balanceOf(address(this)), "Not enough tokens left for sale");
        require(tokenToSell.transfer(msg.sender, _tokenAmount * 1e18), "Token transfer failed");

        // Handle referral rewards
         handleReferral(referrer, msg.sender);

        // Transfer the Ether to the owner
        payable(owner).transfer(msg.value);

        soldTokens += _tokenAmount;
        emit TokensPurchased(msg.sender, _tokenAmount);
}



    // Function for users to buy tokens with other cryptocurrencies
   function buyWithOtherCryptos(address _cryptoAddress, uint256 _amount, address referrer) public {
    require(_cryptoAddress != address(0), "Invalid cryptocurrency address");
    require(priceFeeds[_cryptoAddress] != address(0), "This cryptocurrency is not supported");
    require(_amount > 0, "Amount must be greater than zero"); // Ensure a positive amount is provided

    ERC20 token = ERC20(tokenAddress);
    
    // Get the price of the cryptocurrency in terms of Ether (or your token's price)
    uint256 ethPrice = fetchChainlinkPrice(_cryptoAddress); // Fetch current price in ETH
    uint256 tokensToTransfer = (_amount * ethPrice) / tokenSalePrice; // Calculate equivalent token amount

    require(tokensToTransfer >= minTokenPurchase, "Minimum token purchase amount not met");
    require(tokensToTransfer <= token.balanceOf(address(this)), "Not enough tokens left for sale");

    // Transfer the specified cryptocurrency from the user to the contract
    ERC20 cryptoToken = ERC20(_cryptoAddress);
    require(cryptoToken.transferFrom(msg.sender, owner, _amount), "Payment transfer failed");

    // Transfer tokens to the buyer
    require(token.transfer(msg.sender, tokensToTransfer), "Token transfer failed");

  
  

    handleReferral(referrer, msg.sender);
    
    soldTokens += tokensToTransfer; // Update sold tokens count
    emit TokensPurchased(msg.sender, tokensToTransfer); // Emit event after successful transfer
}


    function getTotalReferralEarnings(address _user) public view returns (uint256) {
    return referralEarnings[_user];
}

     function getTokenDetails()
        public
        view
        returns (
            string memory name,
            string memory symbol,
            uint256 balance,
            uint256 supply,
            uint256 tokenPrice,
            address tokenAddr
        )
    {
        ERC20 token = ERC20(tokenAddress);
        return (
            token.name(),
            token.symbol(),
            token.balanceOf(address(this)),
            token.totalSupply(),
            tokenSalePrice,
            tokenAddress
        );
    }

     function transferToOwner(uint256 _amount) external payable{
        require(msg.value >= _amount, "Insufficient funds sent");
        (bool success,) = owner.call{value: _amount}("");
        require(success, "Transfer failed");

     }

      // Function to get the total number of referrals made by a user
   function getTotalReferredByUser(address _user) public view returns (uint256) {
    return totalReferralsByUser[_user];
}


      function transferEther(address payable _receiver, uint256 _amount) external payable{
         require(msg.value >= _amount, "Insufficient funds sent");
        (bool success,) = _receiver.call{value: _amount}("");
        require(success, "Transfer failed");

      }


    function withdrawAllTokens() public onlyOwner{
        ERC20 token = ERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(token.transfer(owner, balance), "Transfer failed");

       }

      function fetchChainlinkPrice(address _cryptoAddress) internal view returns (uint256) {
        address priceFeedAddress = priceFeeds[_cryptoAddress];
        require(priceFeedAddress != address(0), "Price feed not supported for this cryptocurrency");

        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);
        (, int price, , , ) = priceFeed.latestRoundData();

        // Check if the fetched price is greater than zero
        require(price > 0, "Fetched price must be greater than zero");

        // Convert price to a uint256 and return
        return uint256(price); // Adjust based on the decimals if necessary
}



// Function for the owner to add supported cryptocurrencies and their price feeds
    function addSupportedToken(address _cryptoAddress, address _priceFeedAddress) external onlyOwner{
        require(msg.sender == owner, "Only the owner can add supported tokens");
        require(_cryptoAddress != address(0), "Invalid cryptocurrency address");
        require(_priceFeedAddress != address(0), "Invalid price feed address");

        priceFeeds[_cryptoAddress] = _priceFeedAddress;
        emit TokenAdded(_cryptoAddress, _priceFeedAddress);
    }
       // Fallback function to receive Ether
    receive() external payable {}
    
    // Fallback function to handle calls with data but no matching function
    fallback() external payable {}

}