import React, {useState, useEffect} from "react";

const Popup = ({
          setBuyModel,
          BUY_TOKEN,
          currency,
          detail,
          account,
          ERC20,
          TOKEN_ADDRESS,
          setLoader,
}) => {
  const [amount, setAmount] = useState("");
  const [paymentCurrency, setPaymentCurrency] = useState("ETH");
  const [referralAddress, setReferralAddress] = useState(null)
  const [transferToken, setTransferToken] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show loading overlay
    setLoader(true);
    
    // Simulate a process delay (replace this with actual processing logic)
    setTimeout(() => {
      setLoader(false);
      // alert(`Purchased ${amount} tokens with ${paymentCurrency}`);
      // Close form after processing
      setBuyModel(false);
    }, 3000); // 3 seconds delay
  };

  useEffect(() => {
    setLoader(true);
    console.log("token Addes");
    console.log(TOKEN_ADDRESS);
    ERC20(TOKEN_ADDRESS).then((items) => {
      setTransferToken(items);
      console.log(items);
      setLoader(false);
    });

    // BUY_TOKEN(amount,paymentCurrency, referralAddress)
    setTimeout(() => {
      setLoader(false);
      console.log(`Purchased ${amount} tokens with ${paymentCurrency}`);
      // Close form after processing
      // setBuyModel(false);
    }, 3000);
  },[])

  return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-[#f9e79f] bg-opacity-80 p-10 rounded-lg shadow-lg w-1/2 relative z-50 backdrop-blur-md">
      <h2 className="mb-6 text-2xl font-semibold text-gold">Buy Kutte Tokens</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-lg font-medium text-gold">
          {`Present Token Balance: ${transferToken?.balance ?? 0} KUT`}
          </label>
        </div>
        <div className="mb-6">
          <label htmlFor="amount" className="block text-lg font-medium text-gold">
            Amount of Tokens
          </label>
          <input
            type="number"
            id="amount"
        
            className="w-full px-4 py-3 mt-1 bg-transparent border rounded border-gold text-gold"
            placeholder="Enter token amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="currency" className="block text-lg font-medium text-gold">
            Payment Currency
          </label>
          <select
            id="currency"
            className="w-full px-4 py-3 mt-1 bg-transparent border rounded border-gold text-gold"
            value={paymentCurrency}
            onChange={(e) => setPaymentCurrency(e.target.value)}
            required
          >
            <option value="ETH">Ethereum (ETH)</option>
            {/* <option value="BTC">Bitcoin (BTC)</option>
            <option value="USDT">Tether (USDT)</option> */}
          </select>
        </div>
          <div className="mb-6">
          <label className="block text-lg font-medium text-gold">
                    {`Output Value: ${amount* detail?.tokenPrice} ${'ETH'}`}
                    </label>
          </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-3 text-white bg-gray-500 rounded-lg"
            onClick={() => setBuyModel(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 font-semibold text-white rounded-lg bg-gold"
            onClick={()=> BUY_TOKEN(amount, paymentCurrency, referralAddress)}
          >
            Buy Tokens
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default Popup;
