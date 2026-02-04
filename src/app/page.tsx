"use client";

import Hero from "@/components/ui/Hero";
import Experience from "@/components/ui/Experience";
import Education from "@/components/ui/Education";
import Projects from "@/components/ui/Projects";
import Skills from "@/components/ui/Skills";
import Footer from "@/components/ui/Footer";
import ModelBackground from "@/components/ui/ModelBackground";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <ModelBackground />
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
}
