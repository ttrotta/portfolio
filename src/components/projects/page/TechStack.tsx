import { Project } from "../projectsData";

interface TechStackProps {
  stack: Project["stack"];
}

export default function TechStack({ stack }: TechStackProps) {
  const NUM_STRIPS = 5;

  return (
    <>
      <div className="mt-2 flex flex-wrap gap-2">
        {stack.map((tech, index) => (
          <span key={index} className="tech-tag">
            {[...Array(NUM_STRIPS)].map((_, i) => (
              <span
                key={i}
                className="blind-strip"
                style={{
                  height: `${100 / NUM_STRIPS}%`,
                  top: `${(i * 100) / NUM_STRIPS}%`,
                  transitionDelay: `${i * 25}ms`,
                }}
              />
            ))}
            <span className="label">{tech}</span>
          </span>
        ))}
      </div>
    </>
  );
}
