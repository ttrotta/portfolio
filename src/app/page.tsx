import Hero from "@/components/ui/Hero";
import Experience from "@/components/ui/Experience";
import Education from "@/components/ui/Education";
import Projects from "@/components/ui/Projects";
import Skills from "@/components/ui/Skills";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
}
