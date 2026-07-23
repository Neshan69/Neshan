import { useRef } from "react";
import Reveal from "../components/Reveal";
import MicroLabel from "../components/MicroLabel";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Work({ active }) {
  const gridRef = useRef(null);

  const scrollByCard = (direction) => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.scrollBy({ left: direction * grid.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section
      id="work"
      aria-label="Selected work"
      className={`section-spread snap-center-force bg-surface-container/40 ${
        active ? "active" : ""
      }`}
    >
      <Reveal className="w-full flex flex-col px-6 md:px-16 lg:px-24">
        <div className="flex justify-between items-end mb-6">
          <div>
            <MicroLabel className="mb-4 block">02 / PORTFOLIO</MicroLabel>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
              Selected Work
            </h2>
          </div>
          <div className="hidden md:flex gap-4">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous projects"
              className="p-4 border border-outline/40 rounded-full hover:border-secondary hover:text-secondary cursor-pointer transition-colors text-primary"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next projects"
              className="p-4 border border-outline/40 rounded-full hover:border-secondary hover:text-secondary cursor-pointer transition-colors text-primary"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <div
          ref={gridRef}
          className="work-grid flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
          tabIndex={0}
          aria-label="Project list"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
