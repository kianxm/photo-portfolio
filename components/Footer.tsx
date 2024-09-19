import React from "react";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Albums",
    href: "#albums",
  },
  {
    title: "Contact Me",
    href: "#",
  },
];

const websiteLinks = [
  {
    title: "Work",
    href: "https://kianjm.com",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/kianmalakooti",
  },
  {
    title: "Github",
    href: "https://www.github.com/kianxm",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/shotbykian",
  },
];

export default function Footer() {
  return (
    <div
      className="relative h-[700px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+700px)] -top-[100vh]">
        <div className="h-[700px] sticky top-[calc(100vh-700px)]">
          <div className="bg-[#505050] py-8 px-12 h-full w-full flex flex-col justify-between">
            <div className="flex shrink-0 gap-20">
              <div className="flex flex-col gap-2">
                <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
                {navLinks.map((link) => (
                  <a key={link.title} href={link.href}>
                    {link.title}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="mb-2 uppercase text-[#ffffff80]">My Links</h3>
                {websiteLinks.map((link) => (
                  <a key={link.title} href={link.href}>
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <h1 className="text-[12vw] leading-[0.8] mt-10">
                Kian Malakooti
              </h1>
              <p className="hidden md:block">©copyright</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
