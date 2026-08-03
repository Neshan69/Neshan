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
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-nav rounded-[20px] px-3 md:px-6 py-2 md:py-3 flex items-center gap-1 md:gap-5 !shadow-[0_10px_30px_0_rgba(0,0,0,0.11)] dark:!shadow-[0_8px_28px_0_rgba(255,255,255,0.07)] transition-all duration-300 ease-out scale-[0.4] group hover:scale-100 hover:!shadow-[0_16px_42px_0_rgba(0,0,0,0.2)] dark:hover:!shadow-[0_12px_36px_0_rgba(255,255,255,0.13)] motion-reduce:hover:scale-100"
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
              className={`nav-item relative invisible group-hover:visible opacity-0 group-hover:opacity-100 text-[9px] md:text-[10px] font-bold tracking-widest px-2 md:px-4 py-1 md:py-2 transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-secondary"
              }`}
            >
              {section.label}
            </a>
          );
        })}
      <span
        ref={underlineRef}
        aria-hidden="true"
        className="absolute bottom-0 h-0.5 bg-secondary rounded-full transition-all duration-300 ease-out"
        style={{ left: 0, width: 0 }}
      />
    </nav>
  );
}
