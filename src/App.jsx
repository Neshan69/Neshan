import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import ShaderBackground from "./components/ShaderBackground";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import useIsVertical from "./hooks/useIsVertical";

const Expertise = lazy(() => import("./sections/Expertise"));
const Work = lazy(() => import("./sections/Work"));
const Home = lazy(() => import("./sections/Home"));
const About = lazy(() => import("./sections/About"));
const Contact = lazy(() => import("./sections/Contact"));

const SECTIONS = [
  { id: "expertise", label: "EXPERTISE" },
  { id: "work", label: "WORK" },
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

export default function App() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const indexRef = useRef(2);
  const isVertical = useIsVertical();

  const scrollToSection = useCallback(
    (index) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const viewport = isVertical ? window.innerHeight : window.innerWidth;
      const axis = isVertical ? "top" : "left";
      scroller.scrollTo({ [axis]: viewport * index, behavior: "smooth" });
    },
    [isVertical]
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const viewport = isVertical ? window.innerHeight : window.innerWidth;
        const index = Math.round(scroller.scrollLeft / viewport) ||
          Math.round(scroller.scrollTop / viewport);
        indexRef.current = index;
        setActiveIndex(index);
        ticking = false;
      });
    };
    scroller.addEventListener("scroll", onScroll);

    // Start at Home (Index 2)
    scrollToSection(2);

    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scrollToSection, isVertical]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" && !isVertical && activeIndex < SECTIONS.length - 1) {
        scrollToSection(activeIndex + 1);
      } else if (e.key === "ArrowLeft" && !isVertical && activeIndex > 0) {
        scrollToSection(activeIndex - 1);
      } else if (e.key === "ArrowDown" && isVertical && activeIndex < SECTIONS.length - 1) {
        scrollToSection(activeIndex + 1);
      } else if (e.key === "ArrowUp" && isVertical && activeIndex > 0) {
        scrollToSection(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, scrollToSection, isVertical]);

  // Paginated wheel: advance exactly ONE section per scroll gesture (up/down on
  // the vertical layout, right/left on the horizontal layout). A short lock
  // ignores momentum so a single fling can't skip to the end (accessibility.md).
  // Touch devices keep native scrolling so the experience is never trapped.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let lockUntil = 0;
    const onWheel = (e) => {
      const verticalIntent = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      const delta = isVertical ? e.deltaY : verticalIntent ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 8) return;
      e.preventDefault();

      const now = Date.now();
      if (now < lockUntil) return;
      lockUntil = now + 800;

      const dir = delta > 0 ? 1 : -1;
      const current = indexRef.current;
      const next = Math.min(Math.max(current + dir, 0), SECTIONS.length - 1);
      if (next !== current) scrollToSection(next);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isVertical, scrollToSection]);

  return (
    <>
      <ShaderBackground />
      <Header onContact={() => scrollToSection(4)} />
      <main className="horizontal-scroller z-10 relative" ref={scrollerRef}>
        <Suspense fallback={null}>
          <Expertise active={activeIndex === 0} />
          <Work active={activeIndex === 1} />
          <Home active={activeIndex === 2} scrollerRef={scrollerRef} />
          <About active={activeIndex === 3} />
          <Contact active={activeIndex === 4} />
        </Suspense>
      </main>
      <NavBar sections={SECTIONS} activeIndex={activeIndex} onNavigate={scrollToSection} />
    </>
  );
}
