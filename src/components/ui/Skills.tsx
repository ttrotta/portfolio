export default function Skills() {
  return (
    <section className="z-10 h-screen w-full border-b border-neutral-800 py-20">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="font-heading mb-10 text-4xl font-bold text-white">
          Skills
        </h2>
        <div className="grid grid-cols-2"></div>
        <div className="space-y-4">
          <h3 className="font-body text-xl font-medium text-white md:text-2xl">
            Programming Languages
          </h3>
          <p className="font-body text-sm font-light text-neutral-400">
            Java, Python, C, JavaScript, TypeScript, SQL
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-body text-xl font-medium text-white md:text-2xl">
            Frameworks & Tools
          </h3>
          <p className="font-body text-sm font-light text-neutral-400">
            React, Node.js, Express, Git, Docker, Linux
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-body text-xl font-medium text-white md:text-2xl">
            Soft Skills
          </h3>
          <p className="font-body text-sm font-light text-neutral-400">
            Problem-solving, teamwork, communication, adaptability
          </p>
        </div>
      </div>
    </section>
  );
}
