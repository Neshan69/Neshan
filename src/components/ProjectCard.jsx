import SmartImage from "../components/SmartImage";

export default function ProjectCard({ project }) {
  return (
    <article
      className={`min-w-[320px] md:min-w-[500px] snap-start group ${
        project.cursorNone ? "cursor-none" : ""
      }`}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-outline-variant/30 border border-white/5">
        <SmartImage
          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
          src={project.src}
          alt={`${project.title} — ${project.tag} project preview`}
        />
        <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-primary text-surface px-6 py-3 font-label text-[10px] font-bold tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            VIEW CASE
          </span>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-[10px] font-bold tracking-widest text-secondary mb-2">
          {project.tag}
        </p>
        <h4 className="font-display text-3xl font-semibold text-primary">
          {project.title}
        </h4>
      </div>
    </article>
  );
}
