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
import { getDictionary, hasLocale } from "../../lib/dictionaries";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="flex min-h-screen w-full flex-col">
      <PageWrapper dict={dict.preloader}>
        <Background />
        <Hero dict={dict.hero} />
        <Experience dict={dict.experience} />
        <Education dict={dict.education} />
        <Projects dict={dict.projects} />
        <TechStack dict={dict.techStack} />
        <AboutMe dict={dict.about} />
        <Logo />
        <Footer dict={{ ...dict.footer, contactForm: dict.contactForm }} />
      </PageWrapper>
    </main>
  );
}
