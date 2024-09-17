"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { SOCIALS } from "@/utils/constants";
import Link from "next/link";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onStart: () => setIsVisible(true),
    });

    tl.fromTo(
      "#container",
      { left: "100%", scale: 0.5 },
      {
        left: "50%",
        scale: 0.5,
        transform: "translateX(-50%)",
        duration: 1.5,
        delay: 4,
      }
    ).to("#container", { scale: 1, duration: 1, delay: 2 });
  }, []);

  const titleBoxStyle = "text-3xl font-bold text-black bg-gray-300";

  const boxStyle =
    "bg-gray-300 border-2 border-zinc-600 rounded-xl flex flex-col items-center justify-center text-black h-full overflow-hidden relative";

  return (
    <div
      id="container"
      className={`relative w-screen h-screen p-2 sm:p-4 ${
        !isVisible ? "hidden" : ""
      }`}
    >
      <div className="grid grid-cols-6 lg:grid-cols-12 grid-rows-12 justify-center items-center gap-2 lg:gap-3 h-full">
        <div
          className={cn(
            "col-span-6 lg:col-span-12 row-span-1",
            boxStyle,
            titleBoxStyle
          )}
        >
          Kian Malakooti
        </div>

        {/* 1 */}
        <div
          className={cn(
            "col-span-6 row-span-4 md:col-span-4 md:row-span-5 lg:col-span-5 lg:row-span-7",
            boxStyle
          )}
        >
          <img
            src="/VEGAS/VEGAS-3.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Descriptive Alt Text"
          />
        </div>

        {/* 2 */}
        <div
          className={cn(
            "col-span-6 row-span-4 md:col-span-2 md:row-span-5 lg:col-span-3 lg:row-span-7",
            boxStyle
          )}
        >
          <img
            src="me.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Descriptive Alt Text"
          />
        </div>

        {/* 3 */}
        <div
          className={cn(
            "col-span-3 row-span-4 md:col-span-2 md:row-span-5 lg:col-span-4 lg:row-span-10",
            boxStyle
          )}
        >
          <img
            src="/AFRICA/AFRICA-68.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Descriptive Alt Text"
          />
        </div>

        {/* 4 */}
        <div
          className={cn(
            boxStyle,
            "col-span-3 row-span-4 md:col-span-4 md:row-span-5 lg:col-span-4 lg:row-span-5"
          )}
        >
          <img
            src="/AFRICA/AFRICA-13.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Descriptive Alt Text"
          />
        </div>

        {/* 5 */}
        <div
          className={cn(
            boxStyle,
            "hidden lg:block md:col-span-4 md:row-span-5 lg:col-span-4 lg:row-span-5"
          )}
        >
          <img
            src="/AFRICA/AFRICA-10.jpg"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Descriptive Alt Text"
          />
        </div>

        {/* 6 socials */}
        <div
          className={cn(
            boxStyle,
            "hidden md:block col-span-6 lg:col-span-4 row-span-2"
          )}
        >
          <div className="flex gap-2 justify-center h-full items-center">
            {SOCIALS.map((social, index) => (
              <div key={index} className="p-2">
                <Link href={social.href}>
                  <social.logo />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
