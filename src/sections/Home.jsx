import { useEffect, useRef } from "react";

export default function Home({ active, scrollerRef }) {
  const homeRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const home = homeRef.current;
    if (!scroller || !home) return;

    const onScroll = () => {
      const rect = home.getBoundingClientRect();
      const offset = (rect.left / window.innerWidth) * 100;
      const parallaxImages = home.querySelectorAll(".parallax-img");
      parallaxImages.forEach((img, i) => {
        const speed = (i + 1) * 0.5;
        img.style.transform = `translateX(${
          offset * speed
        }px) rotate(${i === 0 ? -10 : 15}deg)`;
      });
    };

    scroller.addEventListener("scroll", onScroll);
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [scrollerRef]);

  return (
    <section
      id="home"
      ref={homeRef}
      className={`section-spread snap-center-force px-8 md:px-16 ${
        active ? "active" : ""
      }`}
    >
      <div className="relative z-20 text-center max-w-5xl mx-auto section-fade-in">
        <span className="inline-block border border-secondary/40 text-secondary/80 px-4 py-1 text-[10px] font-bold tracking-[0.3em] uppercase mb-12 shadow-[0_0_12px_rgba(0,144,174,0.15)]">
          Systemic Logic v4.0
        </span>
        <h1 className="font-display text-7xl md:text-9xl font-bold text-primary mb-8 tracking-tight leading-[0.95]">
          Architecting
          <br />
          Digital Logic
        </h1>
        <p className="text-xl md:text-2xl font-body text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-light">
          Senior UI/UX Designer specializing in editorial aesthetics, precision
          systems, and high-impact digital experiences for forward-thinking
          brands.
        </p>

        {/* Floating Decorative Images */}
        <div
          className="absolute -left-20 -bottom-32 md:-left-40 md:-bottom-20 w-48 md:w-80 h-auto parallax-img hidden md:block"
          style={{ transform: "rotate(-10deg)" }}
        >
          <img
            className="w-full h-auto shadow-2xl grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 border border-white/5"
            src="https://lh3.googleusercontent.com/aida/AP1WRLv1ZNOW-ffT5l5JLbGGOHUwxq-ksRx1RpBs9BCSyaatAb3ZIYpPDQkixSohYfKy0rJvadciatz1LPsIUjoDOuHBFdxsXl3OuPOQDqrb04ltrJmMjIcT3GEgKfVESOcNPckU6xajqXzF01Onf9Oa33konG7U3IqjiTaSim4x2BJbM0wiILslqNs0WGpVaTt5kAyRZAcH1NcNObdEcLZID-jAG-i3aJlcoCtStjnb-ju_dtF7uHKpUp-w-gQ"
            alt="A high-end architectural model made of white paper and wood, minimalist studio lighting, clean shadows, premium editorial style."
          />
        </div>
        <div
          className="absolute -right-20 -top-32 md:-right-40 md:-top-20 w-48 md:w-80 h-auto parallax-img hidden md:block"
          style={{ transform: "rotate(15deg)" }}
        >
          <img
            className="w-full h-auto shadow-2xl grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 border border-white/5"
            src="https://lh3.googleusercontent.com/aida/AP1WRLvKEJ0PaI2zOAwE43pwBIrLgHUoliXBwgiLLMM9MLB4cPVgOc9EKYMK6hX8EtG5-eX-fbltFJwYvub_JRlaBf0d1WnXGZLd0PcjeHeGWgIHIb0PxDKe_lnMSj0xH8qlmS6Le8aHRl2UdYBJkGlOSBkPobd9DfqUwDDHDeXkp35pXQ6VVcUSLy4n7k8pdQ9buG5lEz3QIyvG-3Ncq7ODylt4-V8e0onvCuhko_uYDXnyZeF3dzyuMyUpmiY"
            alt="A stack of high-quality paper samples and a designer's brass ruler on a clean stone surface, soft natural light, editorial photography."
          />
        </div>
      </div>
    </section>
  );
}
