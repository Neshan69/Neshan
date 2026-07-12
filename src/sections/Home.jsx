import { useEffect, useRef } from "react";
import Reveal from "../components/Reveal";
import SmartImage from "../components/SmartImage";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

export default function Home({ active, scrollerRef }) {
  const homeRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  // The code in this component does not change the vertical scroll (up/down),
  // it only attaches a scroll event to the passed-in `scrollerRef` to do parallax
  // image transforms based on horizontal scroll progress (rect.left).
  // Thus, per your instructions, nothing needs to be changed.

  useEffect(() => {
    if (reduced) return;
    const scroller = scrollerRef.current;
    const home = homeRef.current;
    if (!scroller || !home) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = home.getBoundingClientRect();
        const offset = (rect.left / window.innerWidth) * 100;
        const parallaxImages = home.querySelectorAll(".parallax-img");
        parallaxImages.forEach((img, i) => {
          const speed = (i + 1) * 0.5;
          img.style.transform = `translateX(${offset * speed}px) rotate(${
            i === 0 ? -10 : 15
          }deg)`;
        });
        ticking = false;
      });
    };

    scroller.addEventListener("scroll", onScroll);
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scrollerRef, reduced]);

  return (
    <section
      id="home"
      ref={homeRef}
      aria-label="Introduction"
      className={`section-spread snap-center-force px-8 md:px-16 ${
        active ? "active" : ""
      }`}
    >
      <Reveal className="relative z-20 text-center max-w-5xl mx-auto px-4">
        <span className="inline-block border border-secondary text-secondary px-4 py-1 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 shadow-[0_0_15px_rgba(60,215,255,0.3)]">
          Systemic Logic v4.0
        </span>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-4 tracking-tight leading-[0.95]">
          Architecting
          <br />
          Digital Logic
        </h1>
        <p className="text-base md:text-lg font-body text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-light">
          UI/UX Designer &amp; Systems Architect specializing in editorial
          aesthetics, precision systems, and high-impact digital experiences for
          forward-thinking brands.
        </p>

        {/* Floating Decorative Images */}
        <div
          className="absolute -left-16 -bottom-20 md:-left-32 md:-bottom-16 w-40 md:w-64 h-auto parallax-img hidden md:block"
          style={{ transform: "rotate(-10deg)" }}
        >
          <SmartImage
            className="w-full h-auto shadow-2xl grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 border border-white/5 opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvi7XmiRomqCVkoN0h2CxgzpINz8yNM2pwnMnUysd4ew--kjFppSd2sR0Y8dgi5JwnU9Cikdx52tD2nhwTza9O2NgWrXKC51A1S0jNB6yN2rF9HJK-qQIbW_pMn6dA_U0MbnJcfiGPEcc6s2_sUHxAK3vBoeZNNfm_wNMzkySMCAwmCEp7fbvL5Ui8m8DLcOlGekRvdFDPAN4i3PTngCqszlXYP_Hlec2KGOhhFtbd23x3iI8008RagEO6S5SP0fbTUplZxZha82c"
            alt="A high-end architectural model made of white paper and wood, minimalist studio lighting, clean shadows, premium editorial style."
          />
        </div>
        <div
          className="absolute -right-16 -top-20 md:-right-32 md:-top-16 w-40 md:w-64 h-auto parallax-img hidden md:block"
          style={{ transform: "rotate(15deg)" }}
        >
          <SmartImage
            className="w-full h-auto shadow-2xl grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 border border-white/5 opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLT02LbUlQM7G6AqMPtgFko31fyb65itqi-TTbI8EUSA-I7bKBu9ORHniF31c3i5WED6UG6QkTS6HlKFPbv5xV6KnyIJzWcarbx9dV2kIVlI2SNbABo-FOhjQV4GdO_eOFGFDV02hdjPUN2gNO6shimIScUtBf8AoxsavyLheQO_vf6LVi3y6bwqEBIZ9UhVHI7QPuuC4KIOeBDf6RsSKWgQ5RvdwvuXt_-dWlT_12eqnu9WNe3mcjmDqWTT0ob8QuPEpk_u7IR-M"
            alt="A stack of high-quality paper samples and a designer's brass ruler on a clean stone surface, soft natural light, editorial photography."
          />
        </div>
      </Reveal>
    </section>
  );
}
