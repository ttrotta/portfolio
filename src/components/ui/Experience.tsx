export default function Experience() {
  return (
    <section className="w-full min-h-screen py-20 border border-neutral-800 relative z-10">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-12 text-white">
          Experience
        </h2>

        <div className="max-w-3xl space-y-10">
          <article className="border-l-2 border-neutral-700 pl-6">
            <h3 className="text-md md:text-xl font-semibold text-white">
              Teaching Assistant in Software Modeling
            </h3>
            <time className="text-neutral-400 text-sm md:text-base">2025</time>
            <p className="text-neutral-500 text-sm">
              Universidad Nacional del Sur
            </p>
          </article>

          <article className="border-l-2 border-neutral-700 pl-6">
            <h3 className="text-md md:text-xl font-semibold text-white">
              Teaching Assistant in Formal Methods for Software Engineering
            </h3>
            <time className="text-neutral-400 text-sm md:text-base">2025</time>
            <p className="text-neutral-500 text-sm">
              Universidad Nacional del Sur
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
