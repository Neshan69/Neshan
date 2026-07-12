import Reveal from "../components/Reveal";
import MicroLabel from "../components/MicroLabel";

export default function Expertise({ active }) {
  const items = [
    {
      title: "UI/UX Design",
      body: "Editorial aesthetics and precision systems that bridge the gap between vision and engineering.",
    },
    {
      title: "Frontend",
      body: "Building robust interfaces with React, Core JavaScript, and TypeScript for seamless performance.",
    },
    {
      title: "Infrastructure",
      body: "Deep expertise in Networking, Network OS, and Linux environments for scalable digital foundations.",
    },
    {
      title: "Security",
      body: "SOC L1 Analyst background ensuring every design and system is built with a security-first mindset.",
    },
  ];

  return (
    <section
      id="expertise"
      aria-label="Capabilities"
      className={`section-spread snap-center-force bg-surface/40 backdrop-blur-sm px-6 md:px-16 lg:px-24 ${
        active ? "active" : ""
      }`}
    >
      <Reveal className="max-w-6xl w-full">
        <MicroLabel className="mb-2 block">01 / CAPABILITIES</MicroLabel>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8 leading-tight">
          Mastering
          <br />
          Complexity
        </h2>
        <div className="grid grid-cols-1 gap-8 border-t border-outline-variant pt-6 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="space-y-4">
              <div className="w-12 h-1 bg-secondary mb-6 shadow-[0_0_10px_#3cd7ff]" />
              <h3 className="font-display text-2xl font-semibold text-primary">
                {item.title}
              </h3>
              <p className="text-on-surface-variant text-base leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
