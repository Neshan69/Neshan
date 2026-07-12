import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ShaderBackground from "./components/ShaderBackground";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const Expertise = lazy(() => import("./sections/Expertise"));
const Work = lazy(() => import("./sections/Work"));
const Home = lazy(() => import("./sections/Home"));
const About = lazy(() => import("./sections/About"));
const Contact = lazy(() => import("./sections/Contact"));
const Chat = lazy(() => import("./sections/Chat"));

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
  const [view, setView] = useState("portfolio");
  const pendingIndexRef = useRef(null);
  const [hasScrolledToHome, setHasScrolledToHome] = useState(false);

  const viewport = typeof window !== "undefined" ? window.innerWidth : 1000;

  const handleScrollerMount = useCallback((element) => {
    scrollerRef.current = element;
    if (element && !hasScrolledToHome) {
      setTimeout(() => {
        if (element && element.scrollLeft === 0) {
          element.scrollTo({
            left: viewport * 2,
            behavior: "instant",
          });
          setHasScrolledToHome(true);
        }
      }, 150);
    }
  }, [hasScrolledToHome, viewport]);

  const scrollToSection = useCallback(
    (index, smooth = true) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      scroller.scrollTo({
        left: viewport * index,
        behavior: smooth ? "smooth" : "instant",
      });
    },
    [viewport]
  );

  useEffect(() => {
    if (view !== "portfolio") return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const targetIndex = pendingIndexRef.current ?? 2;
    pendingIndexRef.current = null;

    indexRef.current = targetIndex;
    setActiveIndex(targetIndex);

    const scrollTimer = setTimeout(() => {
      if (!scrollerRef.current) return;
      scrollerRef.current.scrollTo({
        left: viewport * targetIndex,
        behavior: "instant",
      });
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [view, viewport]);

  useEffect(() => {
    if (view !== "portfolio") return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPos = scroller.scrollLeft;
        const index = Math.round(scrollPos / viewport);
        indexRef.current = index;
        setActiveIndex(index);
        ticking = false;
      });
    };
    scroller.addEventListener("scroll", onScroll);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [view, viewport]);

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
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (view !== "portfolio") return;

    let lockUntil = 0;
    const onWheel = (e) => {
      const verticalIntent = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      const delta = verticalIntent ? e.deltaY : e.deltaX;
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
  }, [view, scrollToSection]);

  const openChat = useCallback(() => setView("chat"), []);
  const closeChat = useCallback(() => setView("portfolio"), []);
  const goToSection = useCallback((i) => {
    pendingIndexRef.current = i;
    setView("portfolio");
  }, []);

  return (
    <>
      <ShaderBackground />
      <AnimatePresence>
        {view === "chat" ? (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Suspense fallback={null}>
              <Chat onBack={closeChat} onExit={goToSection} />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Header onContact={openChat} />
            <main className="horizontal-scroller z-10 relative" ref={handleScrollerMount}>
              <Suspense fallback={null}>
                <Expertise active={activeIndex === 0} />
                <Work active={activeIndex === 1} />
                <Home active={activeIndex === 2} scrollerRef={scrollerRef} />
                <About active={activeIndex === 3} />
                <Contact active={activeIndex === 4} />
              </Suspense>
            </main>
            <NavBar
              sections={SECTIONS}
              activeIndex={activeIndex}
              onNavigate={scrollToSection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
