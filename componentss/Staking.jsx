import React from "react";

const Staking = ({
    setStaking
}) => {
  return (
    
    <section className={`section relative`}>
      <div className="fixed inset-0 z-40 flex items-center justify-center w-full bg-black bg-opacity-70">
  <div className={`sectionContainer`}>
    <div className={`contentContainer relative bg-[#fff]  max-w-[500px] mx-auto`}>
      {/* Cancel Button (X) */}
      <button
        className="absolute top-4 right-4 text-[#3B2621] font-bold text-2xl"
        onClick={()=>setStaking(false)}  // Ensure this function closes the modal/section
      >
        &times;
      </button>
    
    <p className={`text mt-0 text-[1.7rem] font-bold text-[#3B2621]`}>
        Staking Coming Soon
      </p>

    
    
    </div>
  </div>
  </div>
</section>


  );
};

export default Staking;
