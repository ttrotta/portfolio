import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer id="footer" className="relative z-20 w-full">
      <div className="flex flex-col items-center justify-center px-6 pb-16">
        <p className="font-body mb-3 text-sm tracking-widest text-neutral-500 uppercase">
          Get in touch
        </p>
        <h2 className="font-heading mb-10 text-center text-4xl font-bold text-white md:text-6xl">
          Contact Me
        </h2>

        <a
          // href="mailto:complete after testing"
          className="group flex items-center gap-3 rounded-full border border-neutral-700 bg-neutral-900/60 px-8 py-4 text-lg font-medium text-neutral-200 backdrop-blur-sm transition-all duration-300 hover:border-neutral-500 hover:bg-neutral-800/80 hover:text-white"
        >
          <HiMail className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-white" />
          emailtemplate@example.com
        </a>

        <div className="mt-10 flex gap-8">
          <a
            href="https://github.com/ttrotta"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-neutral-500 transition-all duration-300 hover:scale-110 hover:text-white"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/thiago-trotta"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-neutral-500 transition-all duration-300 hover:scale-110 hover:text-white"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="h-px bg-neutral-800" />
      </div>

      <div className="flex items-center justify-center px-6 py-8">
        <p className="font-body text-sm text-neutral-600">
          &copy; {new Date().getFullYear()} - Thiago Trotta.
        </p>
      </div>
    </footer>
  );
}
