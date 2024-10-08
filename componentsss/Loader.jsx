import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-transparent border-[#FFD700] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
