import { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let raf;
    let running = true;

    function resize() {
      // Cap DPR for performance (performance.md). The glow is soft, so 2x is plenty.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      time += 0.005;

      for (let i = 0; i < 3; i++) {
        const x = window.innerWidth / 2 + Math.cos(time + i) * 300;
        const y = window.innerHeight / 2 + Math.sin(time * 0.8 + i) * 150;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, 600);
        // Softened cyan glow
        grad.addColorStop(0, "rgba(60, 215, 255, 0.12)");
        grad.addColorStop(1, "rgba(8, 8, 10, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }
      if (prefersReduced) return;
      raf = requestAnimationFrame(draw);
    }

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        draw();
      }
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[#08080a]" />
      <div className="absolute inset-0 opacity-30 mix-blend-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" id="bg-canvas" />
      </div>
      <img
        alt=""
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none"
        src="https://lh3.googleusercontent.com/aida/AP1WRLsaLWX2cSlhXe-oT3Uo4oL9L-gc-AIjHRo4zzI3zeLsbe3zGDxtoJXfaLcWkqQ0KArurPLHpKtVpeAk38Ay7LXHTNS8nE5Cp4MR7mMhz4FvzrpR8-HjZ7qK71U0HHDOaUPJpXFiwtnwBdo8zrPlN4Pjsaan5z1VpZU_JG5Mnq0-cPVp07t5P4CjBPGa9bOGjhxAluI-1mYZUWi7lW_g2HaGjrJlyAO9HOujChU2SPxGsvvznKijVyZT7w"
      />
      <img
        alt=""
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        src="https://lh3.googleusercontent.com/aida/AP1WRLsaLWX2cSlhXe-oT3Uo4oL9L-gc-AIjHRo4zzI3zeLsbe3zGDxtoJXfaLcWkqQ0KArurPLHpKtVpeAk38Ay7LXHTNS8nE5Cp4MR7mMhz4FvzrpR8-HjZ7qK71U0HHDOaUPJpXFiwtnwBdo8zrPlN4Pjsaan5z1VpZU_JG5Mnq0-cPVp07t5P4CjBPGa9bOGjhxAluI-1mYZUWi7lW_g2HaGjrJlyAO9HOujChU2SPxGsvvznKijVyZT7w"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-surface/90 pointer-events-none" />
    </div>
  );
}
