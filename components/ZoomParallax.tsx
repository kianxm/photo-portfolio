import Picture1 from "../public/AFRICA/AFRICA-13.jpg";
import Picture2 from "../public/AFRICA/AFRICA-18.jpg";
import Picture3 from "../public/AFRICA/AFRICA-68.jpg";
import Picture4 from "../public/AFRICA/AFRICA-10.jpg";
import Picture6 from "../public/VEGAS/VEGAS-13.jpg";
import Picture5 from "../public/AFRICA/AFRICA-50.jpg";
import Picture7 from "../public/VEGAS/VEGAS-4.jpg";

import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ];

  const getImageContainerClasses = (index: number) => {
    switch (index) {
      case 1:
        return "top-[-30vh] left-[5vw] w-[35vw] h-[30vh]";
      case 2:
        return "top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]";
      case 3:
        return "left-[27.5vw] w-[25vw] h-[25vh]";
      case 4:
        return "top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]";
      case 5:
        return "top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]";
      case 6:
        return "top-[22.5vh] left-[27.5vw] w-[20vw] h-[15vh]";
      default:
        return "w-[25vw] h-[25vh]";
    }
  };

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {pictures.map(({ src, scale }, index) => (
          <motion.div
            key={index}
            style={{ scale }}
            className="absolute top-0 flex h-full w-full items-center justify-center"
          >
            <div className={`relative ${getImageContainerClasses(index)}`}>
              <Image
                src={src}
                fill
                alt="image"
                placeholder="blur"
                className="object-cover"
                priority={true}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
