import Hero from "@/components/ui/Hero";
import Experience from "@/components/ui/Experience";
import Education from "@/components/ui/Education";
import Projects from "@/components/ui/Projects";
import TechStack from "@/components/ui/TechStack";
import Footer from "@/components/ui/Footer";
import Background from "@/components/ui/Background";
import AboutMe from "@/components/ui/AboutMe";
import Logo from "@/components/ui/Logo";
import PageWrapper from "@/components/ui/PageWrapper";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <PageWrapper>
        <Background />
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <TechStack />
        <AboutMe />
        <Logo />
        <Footer />
      </PageWrapper>
    </main>
  );
}
