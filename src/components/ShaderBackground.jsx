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

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      for (let i = 0; i < 3; i++) {
        const x = canvas.width / 2 + Math.cos(time + i) * 300;
        const y = canvas.height / 2 + Math.sin(time * 0.8 + i) * 150;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, 600);
        // Softened cyan glow
        grad.addColorStop(0, "rgba(0, 100, 120, 0.08)");
        grad.addColorStop(1, "rgba(8, 8, 10, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[#08080a]" />
      <div className="absolute inset-0 opacity-30 mix-blend-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" id="bg-canvas" />
      </div>
      <img
        alt="Dark Moon Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuDTvRY15pZeLaNcj09Apz-R9w-MFTO_T0rNoLvqPwpdYDjMlGQy1hyeQwZf6X3-8umqlBYyMMVd0gyZuQNoKOkBEy-klL5CvYLNdyeppvODbBYx-8-WDtw25FDZPB1S36ThkhApFg7TmelA5rXXX_RAkrAp-6ylyNF-QSDlS8GVNuQ3MS4w5VTIQhaHCzprXt_EpdcPA4NWIYVIA_rN488u-oS0RIcRyeCJHuBwXJQhHdKDnkJuS8s--TXCINdshN5weiOQ1-OYs"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-surface/90 pointer-events-none" />
    </div>
  );
}
