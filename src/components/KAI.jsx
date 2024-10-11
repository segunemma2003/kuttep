import React from "react";
import styles from "./KAI.module.css";
import Button from "./Button";
import { KaiImage, kaiSmallImage } from "../assets/assets";

const KAI = () => {
  return (
    <section className={`section ${styles.kaiSection}`}>
      <div className={`sectionContainer`}>
        <div className={`contentContainer flex flex-col items-center`}>
          <h2 className={`title text-[#3B2621]`}>Kutte Ai $KAI</h2>
          <p className={`text text-[#fff]`}>
            Kutte AI represent a disruptive force in the blockchain space—a
            metaphorical watchdog and guardian ensuring transparency, security,
            and fairness within decentralized networks.   
          </p>
          <p className={`text text-[#fff] mt-[1rem]`}>
            They participate in voting on proposals, shaping the future
            direction of the project. Kutte AI embody the spirit of loyalty and
            reliability within the crypto community. Just as a faithful dog
            guards its owner's interests, Kutte AI symbolize a token or a
            community member dedicated to safeguarding the integrity of
            transactions and protocols.   
          </p>
          <p className={`text text-[#fff] mt-[1rem]`}>
            Their symbolic representation in the blockchain world underscores
            themes of vigilance, governance, and community trust. Moreover,
            Kutte AI embrace the playful and engaging nature of meme crypto
            culture. They blend the serious aspects of blockchain security and
            governance with the light-hearted, viral nature of internet memes,
            making the project both approachable and impactful. By integrating
            humor and community-driven content, Kutte AI foster a vibrant and
            enthusiastic user base, promoting widespread adoption and
            participation.
          </p>
          <p className={`text text-[#fff] mt-[1rem]`}>
              Kutte AI will be listed on five major exchanges, ensuring high
            visibility and accessibility.
          </p>
          <p className={`text text-[#fff] mt-[1rem]`}>
              Additionally, the project will feature locked liquidity, providing
            stability and confidence to investors and users alike. Kutte AI will
            implement a buy back and burn mechanism, making the token
            deflationary. This approach ensures a decrease in the total supply
            over time, which can potentially increase the value of the remaining
            tokens, benefiting long-term holders and contributing to robust
            market dynamics. (Add WHITEPAPER link)   
          </p>
          <p className={`text text-[#fff] mt-[1rem]`}>
            In essence, Kutte AI combine the best of both worlds—serious
            guardianship of blockchain integrity and the dynamic, fun spirit of
            meme culture—creating a unique and powerful presence in the
            decentralized space.
          </p>

          <div>
            <img src={KaiImage} />
          </div>

          <div className="flex gap-3">
            <Button colored text={`Join Presale`} />
            <Button text={`Whitepaper`} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KAI;
