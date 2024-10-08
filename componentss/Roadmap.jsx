import React from "react";
import styles from "../styles/Roadmap.module.css";
import { roadmap } from "../data/data";

const Roadmap = () => {
  return (
    <section className={`section ${styles.roadmapSection}`}>
      <div className={`sectionContainer `}>
        <div className={`contentContainer bg-[#fff]`}>
          <h2 className="title  text-center text-[#3B2621] ">Road Map</h2>
          <p className={`text mt-0 text-[1.2rem] text-[#3B2621]`}>
            While fortune-teller guess, we plan. Here’s our upcoming evolution
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
            {roadmap.map((item) => (
              <div
                key={``}
                className={`bg-[#3B2621] text-[#fff] p-[1rem] rounded-2xl`}
              >
                <div className="text-center">
                  <p>{item.subTitle}</p>
                  <h2 className={`text-[#F3B1A2] text-[1.6rem]`}>
                    {item.title}
                  </h2>
                </div>

                {item.list.map((listItem) => (
                  <div
                    key={``}
                    className={`flex gap-3 items-center mt-[0.6rem]`}
                  >
                    <img src={listItem.svg} className="w-[20px]" />
                    <p>{listItem.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
