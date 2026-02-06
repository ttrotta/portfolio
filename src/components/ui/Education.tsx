import Link from "next/link";

export default function Education() {
  return (
    <section className="w-full py-20 border-b border-neutral-800 relative z-10">
      <div className="grid justify-items-end">
        <div className="container px-4 md:px-10 text-right">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-12 text-white">
            Education
          </h2>

          <div className="max-w-3xl space-y-8">
            <article className="border-r-2 border-neutral-700 pr-6">
              <h3 className="text-xl font-semibold text-white">
                Software Engineering (5th Year)
              </h3>
              <time className="text-neutral-400 text-sm md:text-base">
                2022 - Present
              </time>
              <p className="text-neutral-500 text-sm">
                <Link href="https://www.uns.edu.ar/" target="_blank">
                  Universidad Nacional del Sur
                </Link>
              </p>
            </article>

            <article className="border-r-2 border-neutral-700 pr-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Outside the Classroom
              </h3>
              <p>
                Learning doesn&apos;t stop at university. I dedicate time to
                personal projects where I can experiment with new frameworks and
                push my skills forward.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
