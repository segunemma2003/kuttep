import React from "react";
import styles from "./Updates.module.css";
import Button from "./Button";
import { updateImage } from "../assets/assets";

const Updates = () => {
  return (
    <section className={`section ${styles.updateSection}`}>
      <div className={`mt-[-7rem] flex justify-center`}>
        <img src={updateImage} className={`w-[200px]`} />
      </div>
      <div className={`sectionContainer`}>
        <div className={`contentContainer`}>
          <h2 className={`title`}>GET UPDATES</h2>
          <p className={`text`}>
            Share your details below, and we'll keep you updated with the latest
            news on kutte Ai via email! Stay in the loop with our occasional
            updates.
          </p>

          <form>
            <div className={`${styles.inputSection}`}>
              <div className={`${styles.inputContainer}`}>
                <label>Name</label>
                <input
                  className={`${styles.input}`}
                  placeholder="Name/Nickname"
                />
              </div>

              <div className={`${styles.inputContainer}`}>
                <label>Email Address</label>
                <input
                  className={`${styles.input}`}
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div className={`${styles.inputContainer}`}>
              <label>Comment</label>
              <textarea
                className={`${styles.textarea}`}
                placeholder="Comment (optional)"
              />
            </div>

            <div className="flex justify-center mt-[2rem] mb-[3rem]">
              <Button colored text={`Submit`} />
            </div>
          </form>

          <p className="text-[#fff] text-center">
            Submit by submitting this form you agree to our Terms and Privacy
            Policy
          </p>
        </div>
      </div>
    </section>
  );
};

export default Updates;
