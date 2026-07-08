import { useCallback, useEffect, useRef, useState } from "react";
import ShaderBackground from "./components/ShaderBackground";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Expertise from "./sections/Expertise";
import Work from "./sections/Work";
import Home from "./sections/Home";
import About from "./sections/About";
import Contact from "./sections/Contact";

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

  const scrollToSection = useCallback((index) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({
      left: window.innerWidth * index,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const index = Math.round(scroller.scrollLeft / window.innerWidth);
        setActiveIndex(index);
        ticking = false;
      });
    };
    scroller.addEventListener("scroll", onScroll);

    // Start at Home (Index 2)
    scrollToSection(2);

    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scrollToSection]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" && activeIndex < SECTIONS.length - 1) {
        scrollToSection(activeIndex + 1);
      } else if (e.key === "ArrowLeft" && activeIndex > 0) {
        scrollToSection(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, scrollToSection]);

  useEffect(() => {
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        scrollerRef.current?.scrollBy({ left: e.deltaY, behavior: "auto" });
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <>
      <ShaderBackground />
      <Header />
      <main className="horizontal-scroller z-10 relative" ref={scrollerRef}>
        <Expertise active={activeIndex === 0} />
        <Work active={activeIndex === 1} />
        <Home active={activeIndex === 2} scrollerRef={scrollerRef} />
        <About active={activeIndex === 3} />
        <Contact active={activeIndex === 4} />
      </main>
      <NavBar
        sections={SECTIONS}
        activeIndex={activeIndex}
        onNavigate={scrollToSection}
      />
    </>
  );
}
