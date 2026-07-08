export default function NavBar({ sections, activeIndex, onNavigate }) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 glass-nav px-8 py-4 rounded-full flex items-center gap-2 md:gap-8 shadow-2xl"
    >
      {sections.map((section, i) => {
        const isActive = i === activeIndex;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "true" : undefined}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(i);
            }}
            className={`nav-item text-[10px] font-bold tracking-widest px-4 py-2 transition-all ${
              isActive
                ? "text-primary font-bold border-b border-secondary"
                : "text-on-surface-variant hover:text-secondary/80"
            }`}
          >
            {section.label}
          </a>
        );
      })}
    </nav>
  );
}
