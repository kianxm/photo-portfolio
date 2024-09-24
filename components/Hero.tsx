"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SOCIALS } from "@/utils/constants";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [isVisible] = useState(true);

  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     defaults: { ease: "power4.inOut" },
  //     onStart: () => setIsVisible(true),
  //   });

  //   tl.fromTo(
  //     "#container",
  //     { left: "300%", scale: 0.5 },
  //     {
  //       left: "50%",
  //       scale: 0.5,
  //       transform: "translateX(-50%)",
  //       duration: 3,
  //       delay: 3.5,
  //     }
  //   ).to("#container", { scale: 1, duration: 2, delay: 1.25 });
  // }, []);

  const boxStyle =
    "bg-gray-200 rounded-xl flex flex-col items-center justify-center text-black h-full overflow-hidden relative shadow-md";

  return (
    <div
      id="container"
      className={`relative w-screen h-screen p-2 sm:p-4 ${
        !isVisible ? "hidden" : ""
      }`}
    >
      <div className="grid grid-cols-6 lg:grid-cols-12 grid-rows-12 justify-center items-center gap-2 lg:gap-3 h-full">
        {/* 1 */}
        <div
          className={cn(
            boxStyle,
            "hidden md:block col-span-6 row-span-4 md:col-span-6 md:row-span-6 lg:col-span-5 lg:row-span-11"
          )}
        >
          <Image
            src="/VEGAS/VEGAS-3.jpg"
            alt="Descriptive Alt Text"
            quality={50}
            fill
            className="absolute inset-0 object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>

        {/* 2 */}
        <div
          className={cn(
            boxStyle,
            "hidden md:block col-span-6 row-span-4 md:col-span-2 md:row-span-5 lg:col-span-3 lg:row-span-6 lg:col-start-6 lg:row-start-1"
          )}
        >
          <Image
            src="/me-2.jpg"
            alt="Descriptive Alt Text"
            quality={50}
            fill
            className="absolute inset-0 object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>

        {/* 3 */}
        <div
          className={cn(
            boxStyle,
            "col-span-6 row-span-3 row-start-1 md:col-span-2 md:row-span-5 lg:col-span-4 lg:row-span-3 lg:col-start-9 lg:row-start-1 shadow-sm"
          )}
        >
          <Image
            src="/AFRICA/AFRICA-18.jpg"
            alt="Descriptive Alt Text"
            quality={50}
            fill
            className="absolute inset-0 object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>

        {/* 4 */}
        <div
          className={cn(
            "col-span-6 row-span-8 md:col-span-2 md:row-span-5 lg:col-span-4 lg:row-span-8 lg:col-start-9 lg:row-start-4",
            boxStyle
          )}
        >
          <Image
            src="/AFRICA/AFRICA-68.jpg"
            alt="Descriptive Alt Text"
            quality={50}
            fill
            className="absolute inset-0 object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>

        {/* 5 */}
        <div
          className={cn(
            boxStyle,
            "col-span-6 row-span-1 md:col-span-6 lg:col-span-12 lg:col-start-1 items-start pl-4 pr-2 text-2xl shadow-none"
          )}
        >
          <div className="flex w-full justify-between items-center">
            <span>Kian Malakooti</span>
            <div className="flex gap-2">
              {SOCIALS.slice(0, 2)
                .reverse()
                .map((social, index) => (
                  <Link href={social.href} key={index} className="p-2">
                    <social.icon />
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* 6 */}
        <div
          className={cn(
            boxStyle,
            "hidden lg:block md:col-span-4 md:row-span-5 lg:col-span-3 lg:row-span-5 lg:row-start-7 lg:col-start-6"
          )}
        >
          <Image
            src="/AFRICA/AFRICA-10.jpg"
            alt="Descriptive Alt Text"
            quality={50}
            fill
            className="absolute inset-0 object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
