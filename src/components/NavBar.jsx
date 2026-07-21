import { useCallback, useEffect, useRef } from "react";

export default function NavBar({ sections, activeIndex, onNavigate }) {
  const underlineRef = useRef(null);
  const itemsRef = useRef([]);

  const positionUnderline = useCallback(() => {
    const activeItem = itemsRef.current[activeIndex];
    const underline = underlineRef.current;
    if (!activeItem || !underline) return;
    underline.style.left = `${activeItem.offsetLeft}px`;
    underline.style.width = `${activeItem.offsetWidth}px`;
  }, [activeIndex]);

  useEffect(() => {
    const id = requestAnimationFrame(positionUnderline);
    return () => cancelAnimationFrame(id);
  }, [positionUnderline]);

  useEffect(() => {
    const onResize = () => positionUnderline();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positionUnderline]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 glass-nav px-3 md:px-8 py-2 md:py-4 rounded-full flex items-center gap-1 md:gap-6 shadow-2xl"
    >
      {sections
        .filter((section) => section.id !== "profile")
        .map((section) => {
          const globalIndex = sections.findIndex((s) => s.id === section.id);
          const isActive = globalIndex === activeIndex;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              ref={(el) => (itemsRef.current[globalIndex] = el)}
              aria-current={isActive ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(globalIndex);
              }}
              className={`nav-item relative text-[9px] md:text-[10px] font-bold tracking-widest px-2 md:px-4 py-1 md:py-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-secondary/80"
              }`}
            >
              {section.label}
            </a>
          );
        })}
      <span
        ref={underlineRef}
        aria-hidden="true"
        className="absolute bottom-0 h-[2px] bg-secondary rounded-full transition-all duration-300 ease-out"
        style={{ left: 0, width: 0 }}
      />
    </nav>
  );
}
