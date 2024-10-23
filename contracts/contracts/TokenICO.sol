// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface AggregatorV3Interface {

  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);

    function decimals() external view returns(uint8);

}



interface ERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external;

    function symbol() external view returns (string memory);

    function totalSupply() external view returns (uint256);

    function name() external view returns (string memory);
    function decimals() external view returns(uint);
}

contract TokenICO {
    
    address public owner;
    address public tokenAddress;
    uint256 public tokenSalePrice = 0.0001 ether;
    uint256 public soldTokens;
    
    
    uint256 public totalSupply; // Total supply of tokens
    uint256 public minTokenPurchase; // Minimum tokens a user can purchase
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
    }


    function updateToken(address _tokenAddress) public onlyOwner {
        tokenAddress = _tokenAddress;
        emit TokenAddressUpdated(_tokenAddress);

    }


    function updateTokenSalePrice(uint256 _tokenSalePrice) public onlyOwner {
        tokenSalePrice = _tokenSalePrice;
        emit TokenSalePriceUpdated(_tokenSalePrice);
    }


    // Function to update the minimum token purchase amount
    function updateMinTokenPurchase(uint256 _minTokenPurchase) public onlyOwner {
        require(_minTokenPurchase > 0, "Minimum token purchase must be greater than zero");
        minTokenPurchase = _minTokenPurchase;
        emit MinTokenPurchaseUpdated(_minTokenPurchase);
    }

    function getTokenRequried (address _cryptoToken, uint amount) view public returns(uint) {
        uint ethPrice = fetchChainlinkPrice(_cryptoToken);
        uint decimals = fetchChainlinkDecimals(_cryptoToken);
        uint tokenDecimals = ERC20(_cryptoToken).decimals();
        uint tokenRequired = (amount * ethPrice * tokenSalePrice) / 10**((18 - tokenDecimals) + decimals + 18);
        return tokenRequired;
     }


    function buyToken(uint256 _tokenAmount) public payable  {
        uint amountRequired =_tokenAmount * tokenSalePrice / 1 ether; 
        require(msg.value == amountRequired, "Insufficient Ether provided for the token purchase");
        require(_tokenAmount >= minTokenPurchase, "Minimum token purchase amount not met");
        require(tokenAddress != address(0), "Token address not set");

        // Transfer the tokens
        ERC20 tokenToSell = ERC20(tokenAddress);
        require(_tokenAmount <= tokenToSell.balanceOf(address(this)), "Not enough tokens left for sale");
        require(tokenToSell.transfer(msg.sender, _tokenAmount), "Token transfer failed");
        payable(owner).transfer(msg.value);
        soldTokens += _tokenAmount;
        emit TokensPurchased(msg.sender, _tokenAmount);
    }


   function buyWithOtherCryptos(address _cryptoAddress, uint256 _amount) public {
        require(_cryptoAddress != address(0), "Invalid cryptocurrency address");
        require(priceFeeds[_cryptoAddress] != address(0), "This cryptocurrency is not supported");
        require(_amount > 0, "Amount must be greater than zero"); // Ensure a positive amount is provided

        ERC20 token = ERC20(tokenAddress);
        
        uint tokenRequired = getTokenRequried(_cryptoAddress, _amount);

        // Transfer the specified cryptocurrency from the user to the contract
        ERC20 cryptoToken = ERC20(_cryptoAddress);
        cryptoToken.transferFrom(msg.sender, owner, tokenRequired);

        // Transfer tokens to the buyer
        require(token.transfer(msg.sender, _amount), "Token transfer failed");
        
        soldTokens += _amount; // Update sold tokens count
        emit TokensPurchased(msg.sender, _amount); // Emit event after successful transfer
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


     function transferToOwner(uint256 _amount) external payable {
        require(msg.value >= _amount, "Insufficient funds sent");
        (bool success,) = owner.call{value: _amount}("");
        require(success, "Transfer failed");

     }


      function transferEther(address payable _receiver, uint256 _amount) external payable{
        _receiver.transfer(_amount);
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
    
    function fetchChainlinkDecimals(address _cryptoAddress) internal view returns (uint) {
        address priceFeedAddress = priceFeeds[_cryptoAddress];
        require(priceFeedAddress != address(0), "Price feed not supported for this cryptocurrency");

        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);
        return  uint(priceFeed.decimals());
    }




    function addSupportedToken(address _cryptoAddress, address _priceFeedAddress) external onlyOwner {
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