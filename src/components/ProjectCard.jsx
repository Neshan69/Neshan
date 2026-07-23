import SmartImage from "../components/SmartImage";

export default function ProjectCard({ project }) {
  return (
    <article
      className={`min-w-[220px] md:min-w-[280px] snap-start snap-center cursor-default`}
    >
      <div className="relative overflow-hidden aspect-[16/10] bg-outline-variant/30 border border-outline-variant/10">
        <SmartImage
          className="w-full h-full object-cover grayscale brightness-75 dark:brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-300 hover:scale-105"
          src={project.src}
          alt={`${project.title} — ${project.tag} project preview`}
        />
      </div>
      <div className="mt-4">
        <p className="text-[10px] font-bold tracking-widest text-secondary mb-2">
          {project.tag}
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary">
          {project.title}
        </h3>
      </div>
    </article>
  );
}
