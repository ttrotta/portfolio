import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

export default function Hero() {
  return (
    <section className="pointer-events-none relative flex h-screen flex-col justify-center overflow-hidden px-10 md:px-24">
      <div className="font-heading ml-10 flex flex-col justify-center">
        <h1 className="pointer-events-auto text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          THIAGO<span className="text-gray-500">TROTTA</span>
        </h1>
        <p className="pointer-events-auto mt-4 text-xl text-gray-400 sm:text-2xl md:text-3xl lg:text-4xl">
          Software Engineer
        </p>

        <div className="mt-8 flex gap-10">
          <a
            href="https://github.com/ttrotta"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="pointer-events-auto cursor-pointer text-white hover:text-gray-400"
          >
            <FaGithub className="hero-logo" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/thiago-trotta"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="pointer-events-auto cursor-pointer text-white transition-colors duration-300 hover:text-gray-400"
          >
            <FaLinkedin className="hero-logo" aria-hidden="true" />
          </a>
          <a
            href="/cv-thiago-trotta.pdf"
            download="CV_Thiago_Trotta.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
            className="pointer-events-auto cursor-pointer text-white transition-colors duration-300 hover:text-gray-400"
          >
            <HiDownload className="hero-logo" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
