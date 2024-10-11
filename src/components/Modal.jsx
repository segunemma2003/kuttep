import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ modalHandler, children }) => {
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay2} onClick={modalHandler}></div>
      <div className={`z-[1000]  w-full lg:w-[50%]  ${styles.modal}`}>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
