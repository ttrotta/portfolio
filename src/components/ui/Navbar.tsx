"use client";

declare global {
  interface Window {
    __navbarScrolling?: boolean;
  }
}

import { useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projectsData";

const NAV_LINKS = [
  { label: "HOME", href: "#home", isPage: false },
  { label: "EXPERIENCE", href: "#experience", isPage: false },
  { label: "EDUCATION", href: "#education", isPage: false },
  { label: "PROJECTS", href: "/projects", isPage: true },
  { label: "TECH STACK", href: "#tech-stack", isPage: false },
  { label: "ABOUT ME", href: "#about", isPage: false },
  { label: "CONTACT", href: "#footer", isPage: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.set(overlayRef.current, { display: "flex" });

    // overlay slide in
    tl.fromTo(
      overlayRef.current,
      { clipPath: "inset(0 0 0 100%)" },
      {
        clipPath: "inset(0 0 0 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      },
    );

    // stagger links in
    tl.fromTo(
      linkRefs.current.filter(Boolean),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
      },
      "-=0.3",
    );

    // counter fade
    tl.fromTo(
      counterRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      "-=0.4",
    );

    tlRef.current = tl;
  }, []);

  const toggleMenu = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isOpen) {
      tl.play();
      // hamburger → X
      gsap.to(topLineRef.current, {
        rotation: 45,
        y: 4,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(bottomLineRef.current, {
        rotation: -45,
        y: -4,
        duration: 0.4,
        ease: "power2.inOut",
      });
      // lock scroll
      document.body.style.overflow = "hidden";
    } else {
      tl.reverse();
      // X → hamburger
      gsap.to(topLineRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(bottomLineRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      document.body.style.overflow = "";
    }

    setIsOpen((prev) => !prev);
  }, [isOpen]);

  const handleLinkClick = useCallback(
    (href: string, isPage: boolean) => {
      const tl = tlRef.current;
      if (tl) tl.reverse();

      // reset hamburger
      gsap.to(topLineRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(bottomLineRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

      document.body.style.overflow = "";
      setIsOpen(false);

      if (!isPage && href.startsWith("#")) {
        if (pathname !== "/") {
          window.location.href = "/" + href;
          return;
        }

        // Block Projects snap during navbar-triggered scroll
        window.__navbarScrolling = true;

        setTimeout(() => {
          const id = href.replace("#", "");
          if (id === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
          // Unblock after scroll completes
          setTimeout(() => {
            window.__navbarScrolling = false;
          }, 1200);
        }, 600);
      }
    },
    [pathname],
  );

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-100 flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#home", false);
          }}
          className="group relative z-110"
          aria-label="Home"
        >
          <Image
            src="/logo-tt.svg"
            alt="TT Logo"
            width={112}
            height={66}
            className="h-6 w-auto transition-opacity duration-300 group-hover:opacity-70 md:h-7"
          />
        </a>

        <div className="relative z-110 flex items-center gap-6 md:gap-8">
          <button className="font-michroma group flex items-center gap-1.5 text-[0.65rem] tracking-[0.25em] text-neutral-400 uppercase transition-colors duration-300 hover:text-white">
            <span className="text-white">EN</span>
            <span className="text-neutral-600">/</span>
            <span>ES</span>
          </button>

          <span className="h-4 w-px bg-neutral-700" />

          <button
            onClick={toggleMenu}
            className="group relative flex h-6 w-7 flex-col items-center justify-center gap-1.5"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              ref={topLineRef}
              className="block h-[1.5px] w-full origin-center bg-white transition-colors duration-300 group-hover:bg-neutral-300"
            />
            <span
              ref={bottomLineRef}
              className="block h-[1.5px] w-full origin-center bg-white transition-colors duration-300 group-hover:bg-neutral-300"
            />
          </button>
        </div>
      </nav>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-99 hidden flex-col bg-black"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative flex h-full w-full flex-col justify-center px-8 md:px-16 lg:px-24">
          <span
            ref={counterRef}
            className="font-michroma absolute top-28 left-8 text-[0.6rem] tracking-[0.3em] text-neutral-600 uppercase opacity-0 md:left-16 lg:left-24"
          >
            Sections
          </span>

          <div className="flex flex-col gap-1 md:gap-0">
            {NAV_LINKS.map((link, i) => {
              const inner = (
                <span className="group relative flex items-center gap-4 overflow-hidden md:gap-6">
                  <span className="font-michroma w-8 text-[0.55rem] tracking-[0.2em] text-neutral-600 transition-colors duration-300 group-hover:text-white md:w-10 md:text-[0.65rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="font-michroma relative text-[clamp(1.5rem,4.5vh,3rem)] font-normal tracking-widest text-white/90 transition-all duration-500 group-hover:tracking-[0.2em] group-hover:text-white md:text-[clamp(2.5rem,6.5vh,5rem)]">
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
                  </span>

                  <span className="font-michroma ml-2 text-lg text-neutral-600 opacity-0 transition-all duration-300 group-hover:opacity-100 md:text-xl">
                    →
                  </span>
                </span>
              );

              if (link.isPage) {
                let href = link.href;
                if (link.label === "PROJECTS") {
                  href = `/projects/${projects[0].slug}`;
                }
                return (
                  <Link
                    key={link.label}
                    href={href}
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    onClick={() => handleLinkClick(link.href, true)}
                    className="block py-2 opacity-0 md:py-3"
                  >
                    {inner}
                  </Link>
                );
              }

              return (
                <button
                  key={link.label}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  onClick={() => handleLinkClick(link.href, link.isPage)}
                  className="block cursor-pointer py-2 text-left opacity-0 md:py-3"
                >
                  {inner}
                </button>
              );
            })}
          </div>

          <div className="absolute right-8 bottom-12 left-8 flex items-center justify-between md:right-16 md:left-16 lg:right-24 lg:left-24">
            <span className="font-michroma text-[0.55rem] tracking-[0.3em] text-neutral-700 uppercase">
              Thiago Trotta
            </span>
            <span className="font-michroma text-[0.55rem] tracking-[0.3em] text-neutral-700 uppercase">
              Portfolio &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
