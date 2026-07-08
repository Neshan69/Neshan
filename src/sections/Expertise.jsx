export default function Expertise({ active }) {
  const items = [
    {
      title: "Systems Design",
      body: "Developing scalable design languages that bridge the gap between aesthetic vision and engineering constraints.",
    },
    {
      title: "Spatial Strategy",
      body: "Applying architectural principles to digital environments to create intuitive flows and rhythmic interactions.",
    },
    {
      title: "Interaction Logic",
      body: "Crafting high-fidelity prototypes and motion systems that define the emotional signature of a product.",
    },
  ];

  return (
    <section
      id="expertise"
      className={`section-spread snap-center-force bg-surface/40 backdrop-blur-sm px-8 md:px-32 ${
        active ? "active" : ""
      }`}
    >
      <div className="max-w-6xl w-full section-fade-in">
        <span className="text-secondary font-bold text-[10px] tracking-[0.2em] mb-4 block uppercase opacity-80">
          01 / CAPABILITIES
        </span>
        <h2 className="font-display text-7xl md:text-8xl font-bold text-primary mb-16 leading-tight">
          Mastering
          <br />
          Complexity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-outline-variant pt-12">
          {items.map((item) => (
            <div key={item.title} className="space-y-4">
              <div className="w-12 h-1 bg-secondary mb-6 shadow-[0_0_8px_rgba(0,144,174,0.3)] opacity-80" />
              <h3 className="font-display text-2xl font-semibold text-primary">
                {item.title}
              </h3>
              <p className="text-on-surface-variant text-base leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
