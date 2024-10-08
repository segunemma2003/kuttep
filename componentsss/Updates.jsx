import React from "react";
import styles from "../styles/Updates.module.css";
import Button from "./Button";
import { updateImage } from "../assets";
import { useForm } from "@formspree/react";

const Updates = () => {
  const notifySuccess = (msg) => toast.success(msg, {duration: 2000});
const notifyError = (msg) => toast.error(msg, {duration: 2000});
const [state, handleSubmit] = useForm("mzbnzpqr");
if(state.succeeded){
  notifySuccess("Successfully submitted");
  window.location.reload();
}
  return (
    <section id="contact" className={`section ${styles.updateSection}`}>
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

          <form onSubmit={handleSubmit}>
            <div className={`${styles.inputSection}`}>
              <div className={`${styles.inputContainer}`}>
                <label>Name</label>
                <input
                id="name"
                name="name"
                  className= {`${styles.input}`}
                  placeholder="Name/Nickname"
                />
              </div>

              <div className={`${styles.inputContainer}`}>
                <label>Email Address</label>
                <input
                id="email"
                name="email"
                  className={`${styles.input}`}
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div className={`${styles.inputContainer}`}>
              <label>Comment</label>
              <textarea
              id="comment"
                name="comment"
                className={`${styles.textarea}`}
                placeholder="Comment (optional)"
              />
            </div>

            <div className="flex justify-center mt-[2rem] mb-[3rem]">
              <Button 
              type="submit"
              disabled={state.submitting}
              colored text={`Submit`} />
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
