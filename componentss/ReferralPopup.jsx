import React, { useState, useEffect } from "react";
import { CHECK_WALLET_CONNECTED } from "../context/constants";
import { getReferralCode } from "../utils/api";

const ReferralPopup = ({ setReferralPopup,  setLoader }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [referral, setReferral] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(referral).then(() => {
            setIsCopied(true);
            alert('copied');
            setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
        });
    };

    useEffect(() =>  {
        if (referral == "") {
            setLoader(true);
            const getReferralCodes = async () => {
    
              try {
                const  address = await  CHECK_WALLET_CONNECTED();
                console.log("check");
                console.log(address);
                if(address){
                    const dat = {
                        "address":address
                    }
                  const data = await getReferralCode(dat);
                  if(!data){
                  setReferral("No refferal code yet")
                  }
                  console.log("refferal:", data['referral_code']); // Fetch settings data
                  setReferral(data['referral_code']); // Store settings in state 
                 }
                
                 setLoader(false);
              } catch (error) {
                console.log(error);
                setLoader(false);
                // notifyError("Failed to fetch settings.");
              }
        
              
            }
            getReferralCodes();
        }
       
      }, [referral]);

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70">
        <div className={`sectionContainer relative`}>
          <div className={`contentContainer bg-[#fff] relative`}>
            {/* Cancel Button (X) */}
            <button
              className="absolute top-4 right-4 text-[#3B2621] font-bold text-2xl"
              onClick={()=>setReferralPopup(false)}  // Ensure this function closes the modal
            >
              &times;
            </button>
      
            <p   className={`text mt-0 text-lg font-bold text-[#3B2621]`}>
              Share Your Referral Code.
            </p>
            <div className="text-center text-bolder text-xl" onClick={handleCopy} >{referral}</div>
          </div>
      
        
        </div>
      </div>
      
    );
};

export default ReferralPopup;
