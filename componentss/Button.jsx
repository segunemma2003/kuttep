import React from "react";
import styles from "../styles/Button.module.css";

const Button = ({ text, colored, width, onClick, type, style }) => {
  return (
    <button
      className={` flex gap-2 justify-center whitespace-nowrap ${
        colored ? styles.colored : styles.white
      } ${width}  ${style}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
