import React, { useState } from "react";

const useMultistepForm = (steps, stepNames) => {
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    setCurrentStep((i) => {
      if (i >= steps.length - 1) return i;

      return i + 1;
    });
  }

  return { steps, next, step: steps[currentStep], currentStep, stepNames };
};

export default useMultistepForm;
