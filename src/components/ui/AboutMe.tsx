export default function AboutMe() {
  return (
    <section className="min-h-screen w-full py-20 border-b border-neutral-800 relative z-10">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-6xl font-heading font-bold mb-10 text-white">
          Who am I?
        </h2>
        <div className="max-w-3xl flex text-lg md:text-xl text-neutral-300 flex-col gap-6 leading-relaxed">
          <p>
            My name is Thiago Trotta. I got into programming and the IT world
            when I was 16. That&apos;s why I&apos;m currently in my fifth year
            studying Systems Engineering and working on personal projects in my
            free time.
          </p>
          <p>
            I have a Full Stack profile, since one of the things I enjoy most is
            backend development, but I have a strong appreciation for frontend
            because I&apos;m a believer in the phrase: everything enters through
            the eyes. That&apos;s why I keep myself updated with the latest
            technologies in both areas.
          </p>
          <p>
            I love working in teams and exchanging ideas with people around me,
            which is why I&apos;ve worked as a teaching assistant during my time
            in college.
          </p>
        </div>
      </div>
    </section>
  );
}
