import { useCallback, useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// How long the island lingers open after the cursor/focus leaves before
// collapsing back into its idle capsule. Deliberately intentional-feeling.
const COLLAPSE_DELAY_MS = 6500;

export default function NavBar({ sections, activeIndex, onNavigate }) {
  const underlineRef = useRef(null);
  const itemsRef = useRef([]);
  const [expanded, setExpanded] = useState(false);
  const collapseTimer = useRef(null);
  const reduced = usePrefersReducedMotion();

  const positionUnderline = useCallback(() => {
    const activeItem = itemsRef.current[activeIndex];
    const underline = underlineRef.current;
    if (!activeItem || !underline) return;
    underline.style.left = `${activeItem.offsetLeft}px`;
    underline.style.width = `${activeItem.offsetWidth}px`;
  }, [activeIndex]);

  // Keep the active underline aligned whenever the active section *or* the
  // expanded layout state changes (items are measured even while invisible).
  useEffect(() => {
    const id = requestAnimationFrame(positionUnderline);
    return () => cancelAnimationFrame(id);
  }, [positionUnderline, expanded]);

  useEffect(() => {
    const onResize = () => positionUnderline();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positionUnderline]);

  const openIsland = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    setExpanded(true);
  };

  const closeIsland = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = window.setTimeout(
      () => setExpanded(false),
      COLLAPSE_DELAY_MS
    );
  };

  // Clear any pending collapse timer if the component unmounts.
  useEffect(() => () => collapseTimer.current && clearTimeout(collapseTimer.current), []);

  const caps = sections.filter((section) => section.id !== "profile");

  // Reveal strategy: under reduced motion we keep only opacity transitions
  // (no horizontal scale transform), otherwise a subtle scale-x draw.
  const itemReveal = expanded ? "opacity-100" : "opacity-0";
  const underlineReveal = reduced
    ? expanded
      ? "opacity-100"
      : "opacity-0"
    : expanded
    ? "opacity-100 scale-x-100"
    : "opacity-0 scale-x-0";

  return (
    <nav
      aria-label="Section navigation"
      aria-expanded={expanded}
      onMouseEnter={openIsland}
      onMouseLeave={closeIsland}
      onFocus={openIsland}
      onBlur={closeIsland}
      className={[
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-nav overflow-hidden",
        "transition-[max-width,max-height,border-radius,box-shadow,opacity,filter] duration-500",
        "ease-[cubic-bezier(0.22,1,0.36,1)]",
        expanded
          ? "max-w-[640px] max-h-[220px] rounded-[20px] island-shadow-expanded brightness-105"
          : "max-w-[170px] max-h-[14px] rounded-full island-shadow",
        !expanded && !reduced ? "island-breathe" : "",
      ].filter(Boolean).join(" ")}
    >
      {caps.map((section) => {
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
            className={[
              "nav-item relative text-[9px] md:text-[10px] font-bold tracking-widest px-2 md:px-4 py-1 md:py-2 whitespace-nowrap",
              "opacity-0 transition-[opacity,color] duration-300 hover:text-secondary",
              isActive ? "text-primary" : "text-on-surface-variant",
              itemReveal,
            ].join(" ")}
            style={{ transitionDelay: `${globalIndex * 45}ms` }}
          >
            {section.label}
          </a>
        );
      })}
      {/* Active underline: hidden in the collapsed capsule, reveals on expand */}
      <span
        ref={underlineRef}
        aria-hidden="true"
        className={[
          "absolute bottom-0 left-0 h-0.5 w-auto min-w-[4px] bg-secondary rounded-full",
          "transition-[opacity,transform,left,width] duration-300 ease-out origin-left",
          underlineReveal,
        ].join(" ")}
        style={{ width: 0 }}
      />
    </nav>
  );
}
