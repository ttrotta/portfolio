import Hero from "@/components/ui/Hero";
import Experience from "@/components/ui/Experience";
import Education from "@/components/ui/Education";
import Projects from "@/components/ui/Projects";
import Skills from "@/components/ui/Skills";
import Footer from "@/components/ui/Footer";
import Background from "@/components/ui/Background";
import AboutMe from "@/components/ui/AboutMe";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <Background />
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <AboutMe />
      <Footer />
    </main>
  );
}
