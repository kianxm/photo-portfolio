import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const CounterLoader: React.FC = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (percentage < 100) {
      const timer = setInterval(() => {
        setPercentage((prev) => Math.min(prev + 1, 100));
      }, 40);

      return () => clearInterval(timer);
    }
  }, [percentage]);

  return (
    <h1
      className="w-full h-full fixed flex justify-end items-end py-8 px-16 text-[10vw] z-50 italic font-medium"
      style={{ color: "var(--circle-outline)" }}
    >
      {percentage}%
    </h1>
  );
};

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: onComplete,
    });

    tl.fromTo("#circles", { top: "-50%" }, { top: "50%", duration: 2 })
      .to("#circle-inner-rotator", { scale: 1, duration: 1 }, "-=0.5")
      .to("#circles", { rotation: 360, duration: 1.5 })
      .to(
        "#block",
        { display: "block", height: "200px", duration: 0.75 },
        "-=0.5"
      )
      .to("#block", { width: "800px", duration: 0.75 })
      .to("#block", { width: "0px", duration: 0.75, delay: 0.75 })
      .to("#block", { height: "0px", duration: 0.75 })
      .to("#circles", { rotation: 0, duration: 0.75 })
      .to("#loader", { scale: 0, duration: 1 }, "-=0.5");
  }, [onComplete]);

  return (
    <>
      <div id="loader" className="fixed top-0 left-0 w-full h-full bg-primary">
        <CounterLoader />
        <div
          id="site-teaser"
          className="absolute top-0 right-0 py-8 px-16 text-[1rem] italic font-medium"
          style={{ color: "var(--circle-outline)" }}
        >
          Loading...
        </div>

        <div
          id="circles"
          className="absolute left-20 bottom-20 w-[400px] h-[400px] rounded-full"
        >
          <div
            id="circle-outer"
            className="absolute top-0 left-0 w-full h-full bg-none rounded-full"
            style={{ border: "1px solid var(--circle-outline)" }}
          ></div>

          <div
            id="circle-inner"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
          ></div>

          <div
            id="circle-inner-rotator"
            className="absolute left-1/2 transform -translate-x-1/2 w-[162.5px] h-[162.5px] bg-none rounded-full scale-0"
            style={{ border: "1px solid var(--circle-outline)" }}
          ></div>

          <div
            id="block"
            className="absolute top-[-100px] left-[200px] w-[0px] h-[0px] bg-none origin-bottom"
            style={{ border: "1px solid var(--circle-outline)" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
