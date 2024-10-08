/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./FormModal.module.css";
import { formClose, arrow } from "./assests";
import useMultistepForm from "./customHooks/useMultistepForm";
import EnterExchange from "./EnterExchange";
import ConfirmExcahnge from "./ConfirmExcahnge";
import CompleteExchange from "./CompleteExchange";
// import Progressbar from "./Progressbar";
import useClipboardPaste from "./customHooks/useClipboardPaste";

const FormModal = ({ modalHandler }) => {
  const [clipText, setClipText] = useState("");
  const handleClipText = (text) => {
    setClipText(text);
  };
  const [inputState, setInputState] = useState("");

  const inputStateHandler = (text) => {
    setInputState(text);
  };
  const [pastedText, pasteFromClipboard] = useClipboardPaste();

  const { steps, currentStep, next, step, stepNames } = useMultistepForm(
    [
      <EnterExchange
        key={0}
        pastedText={pastedText}
        pasteFromClipboard={pasteFromClipboard}
        onPastedTextChange={handleClipText}
        onInputState={inputStateHandler}
        clipText={clipText}
      />,
      <ConfirmExcahnge key={1} />,
      <CompleteExchange key={2} />,
    ],
    ["Enter exchange details", "Confirm exchange details", "Complete exchange"]
  );

  const submitHandler = (e) => {
    e.preventDefault();
    next();
  };

  return (
    <div className={`${styles.overlay}`}>
      <div className={`${styles.overlay2}`} onClick={modalHandler}></div>
      <div className={`${styles.formContainer}`}>
        <form onSubmit={submitHandler}>
          <div className={`${styles.formWrapper}`}>
            <div className={`${styles.formHeader}`}>
              <div className="flex justify-center w-full">
                <p className={`${styles.formText}`}>
                  {currentStep > 0
                    ? "Please confirm the details of your exchange"
                    : "Please enter the details of your exchange"}
                </p>
              </div>

              <div>
                <img
                  src={formClose}
                  onClick={modalHandler}
                  className="cursor-pointer w-[20px]"
                />
              </div>
            </div>

            {/* <div>
              <Progressbar
                progress={steps.length}
                currentProgress={currentStep}
                stepNames={stepNames}
              />
            </div> */}

            {step}

            <button
              className={`${styles.formButton} ${!inputState ? styles.btnFaint : ""} cursor-pointer`}
              disabled={!inputState}
            >
              Next
              <img src={arrow} />
            </button>
            {/* */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
