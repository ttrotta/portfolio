"use client";

import ProjectPresenter from "../projects/ProjectPresenter";

export default function Projects() {
  return (
    <section className="relative z-10 h-[200vh] w-full">
      <div className="flex w-full flex-col items-center justify-center overflow-hidden px-10">
        <h2 className="font-heading py-8 text-8xl font-bold tracking-tight text-white">
          Projects
        </h2>

        <div className="flex w-full flex-col gap-6">
          <ProjectPresenter />
        </div>
      </div>
    </section>
  );
}
