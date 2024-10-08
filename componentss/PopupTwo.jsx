import React, {useState, useEffect} from "react";
import FormField from "./popupscomponents/FormField";
import FormComponent from "./popupscomponents/FormModule";

const PopupTwo = ({
          setBuyModel,
          BUY_TOKEN,
          currency,
          detail,
          account,
          ERC20,
          TOKEN_ADDRESS,
          setLoader,
}) => {
  const [amount, setAmount] = useState(0);
  const [paymentCurrency, setPaymentCurrency] = useState("ETH");
  const [referralAddress, setReferralAddress] = useState(null)
  const [transferToken, setTransferToken] = useState();


  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
  
    // Call the BUY_TOKEN function and await its result
    setLoader(true);
    await BUY_TOKEN(amount, paymentCurrency, referralAddress);
    setLoader(false);
  };
  
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

  return (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70">
    <section className={`section relative max-w-[100%]`}>
    <div className={`sectionContainer `}>
      <div className={`contentContainer bg-[#fff] relative`}>
        {/* Cancel Button (X) */}
        <button
          className="absolute top-4 right-4 text-[#3B2621] font-bold text-2xl"
          onClick={()=>setBuyModel(false)}  // Ensure this function closes the modal
        >
          &times;
        </button>
        <FormComponent 
        setPaymentCurrency ={ setPaymentCurrency}
        setReferralAddress={setReferralAddress}
        setAmount={setAmount}
        tokenPrice ={detail?.tokenPrice}
        amount={amount}
        tokenBalance={transferToken?.balance ?? 0}
        onSubmitHandler={onSubmitHandler}
        />
        
    </div>
    </div>
    </section>
  </div>
  );

}

export default PopupTwo;