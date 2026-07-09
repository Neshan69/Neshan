import { useRef } from "react";
import Reveal from "../components/Reveal";
import MicroLabel from "../components/MicroLabel";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    tag: "SECURITY OPERATIONS",
    title: "Cyber-Ops Interface",
    cursorNone: true,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxi2pMmhLW2d3KEZLHyMP6Sg0rehnnt0TC3bcamaBvbyQtbOrk3TGGq74HUrloSIoOep87I9_-e2MiM-YXiajL0yOnprFP2xYMtD-Tb6s17Zs1WDHnQdeszEsX7oRcDI6HpS3initfp-aPsyB69ZOYVdSIEZv_VZ0bSEKW8flHPYhyUp6lGNBoXi-j-Qe8zsljwza0b19ec4uYe-U7pOLgC3ojxJW21Vt_Hfzo-QLLT887TdQuT0eNxnfnPf-IKE2wK1B0lw1ulEM",
  },
  {
    tag: "SPATIAL UI",
    title: "Ether Reality OS",
    cursorNone: false,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-S-AqMROGdiH3aOwvZ7RkXz3EAUzwBzFIT1VnAuMRPMN039yXEIC2VMIFouJGFDhsdt5MSXYjRg5wje9IjwMiCyJJhFc0m4gzoeAp7YC305YWypxFRy-G11HzQqkHvSO6R7rkK6eFvCnM2TX5blteU_qtm-LuvznhE2ObJ_xbNirw6jxyllJuFoqCFyRiu9x1pKQm0w9K1IePx3ZjSJPH0TXnEcwAEEcWh7bv3OglHLBZ-1bGFe4CtpzjAxgmYDuR6mCEQwmneg",
  },
  {
    tag: "ECOMMERCE",
    title: "Monolith Boutique",
    cursorNone: false,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZQDUNTeD3ytlpajfBVhkw6fBQLB6i4zkwTG0X2ooArO7tPjSpn4KnXSl9WFssJvdX0Fk5FhLIAa43N99d0eBRMsQFdboeSk-ce506ePaif5NwEaidumsK6N2k26G_SlFWgduhgTZYHjjYLmQdQgIqgIPyU7xIqgBVJTXrrOl0PcOqkWTr_Q4K3GvLnA5OxOoxQ5Ns4E6PDQKoBVMwp6w1Yt8BJgErYlLKcTiaWh4-Cc_M0RvahvP2UI_UrgowtWHb3NPgA3DhTFU",
  },
];

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
      className={`section-spread snap-center-force bg-[#0c0c0e]/40 ${
        active ? "active" : ""
      }`}
    >
      <Reveal className="w-full flex flex-col px-8 md:px-32">
        <div className="flex justify-between items-end mb-6">
          <div>
            <MicroLabel className="mb-4 block">02 / PORTFOLIO</MicroLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
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
          className="work-grid flex gap-6 overflow-x-auto pb-6 snap-x"
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
