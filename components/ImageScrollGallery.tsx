"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";

export default function ImageScrollGallery() {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const leftXValues = [-800, -900, -400];
    const rightXValues = [800, 900, 400];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];

    gsap.utils.toArray(".row").forEach((row: any, index) => {
      const cardLeft = row.querySelector(".card-left") as HTMLElement;
      const cardRight = row.querySelector(".card-right") as HTMLElement;

      if (cardLeft && cardRight) {
        gsap.fromTo(
          cardLeft,
          { x: 0, rotation: 0, y: 0 },
          {
            x: leftXValues[index],
            scrollTrigger: {
              trigger: ".main",
              start: "top center",
              end: "150% center",
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                cardLeft.style.transform = `translateX(${
                  progress * leftXValues[index]
                }px) translateY(${progress * yValues[index]}px) rotate(${
                  progress * leftRotationValues[index]
                }deg)`;
              },
            },
          }
        );

        gsap.fromTo(
          cardRight,
          { x: 0, rotation: 0, y: 0 },
          {
            x: rightXValues[index],
            scrollTrigger: {
              trigger: ".main",
              start: "top center",
              end: "150% center",
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                cardRight.style.transform = `translateX(${
                  progress * rightXValues[index]
                }px) translateY(${progress * yValues[index]}px) rotate(${
                  progress * rightRotationValues[index]
                }deg)`;
              },
            },
          }
        );
      }
    });

    gsap.to("#logo", {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".main",
        start: "top center",
        end: "center center",
        scrub: true,
      },
    });

    gsap.fromTo(
      "#text",
      { y: "-500%" },
      {
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "center center",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#button",
      {
        y: -200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        delay: 0.25,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "center center",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div
          className="row relative w-screen my-4 flex justify-center gap-8"
          key={i}
        >
          <div className="card-left relative w-1/2 h-[240px] sm:w-[40%] sm:h-[360px] rounded-lg overflow-hidden transform">
            <img
              src={`/AFRICA/AFRICA-${2 * i - 1}.jpg`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="card-right relative w-1/2 h-[240px] sm:w-[40%] sm:h-[360px] rounded-lg overflow-hidden transform">
            <img
              src={`/AFRICA/AFRICA-${2 * i}.jpg`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }

    return rows;
  };

  return (
    <main className="main relative w-screen flex justify-center items-center h-[100vh] sm:h-[150vh] flex-col">
      <div
        id="main-content"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      >
        <div
          id="logo"
          className="w-[150px] h-[150px] border-2 border-white overflow-hidden scale-0"
        >
          <img src="/me.jpg" alt="Logo" />
        </div>

        <div
          id="copy"
          className="my-8 flex flex-col justify-center items-center"
        >
          <div className="line relative my-2.5 mx-0 w-[300px] h-auto clip-custom">
            <p
              id="text"
              className="relative text-[24px] text-white text-center"
            >
              Visited Africa in both 2019 and 2024, discovering new cultures and
              ideas.
            </p>
          </div>
          <button
            id="button"
            className="relative px-4 py-2 bg-white border-2 border-white rounded-full bg-none outline-none text-black"
          >
            test
          </button>
        </div>
      </div>
      {generateRows()}
    </main>
  );
}
