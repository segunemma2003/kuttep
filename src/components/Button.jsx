import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, colored, width, clickFunction, type, style }) => {
  return (
    <button
      className={` flex gap-2 justify-center ${
        colored ? styles.colored : styles.white
      } ${width}  ${style}`}
      onClick={clickFunction}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
