const projects = [
  {
    tag: "FINTECH SYSTEMS",
    title: "Nexus Core Interface",
    cursorNone: true,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvIQSMBf6Bh6hjdKwFUyMVIJIOEbXL_fuuJSfe8oYFLn9S9e2AICwGtXeg25QU1q_PE4xnxB2Z9s5sjLNmrNCJvFhOi263ysOt0OA5xGcjg4prJZEsoSKwdlm6PwOrLymljkBkQesPGYt56xeC2ywq2GCr-g9cOq0m61csqLGLQ4y8ANR2C8C1DRni0aVaoZg3U6qjFP1x_mxBEQ_FAh-3trspEOv6JgyQBelf6g_LhNkbaZfVyrhMZS6n2E2xFmz7yoNGILfkxfk",
  },
  {
    tag: "SPATIAL UI",
    title: "Ether Reality OS",
    cursorNone: false,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-S-AqMROGdiH3aOwvZ7RkXz3EAUzwBzFIT1VnAuMRPMN039yXEIC2VMIFouJGFDhsdt5MSXYjRg5wje9IjwMiCyJJhFc0m4gzoeAp7YC305YWypxFRy-G11HzQqkHvjSO6R7rkK6eFvCnM2TX5blteU_qtm-LuvznhE2ObJ_xbNirw6jxyllJuFoqCFyRiu9x1pKQm0w9K1IePx3ZjSJPH0TXnEcwAEEcWh7bv3OglHLBZ-1bGFe4CtpzjAxgmYDuR6mCEQwmneg",
  },
  {
    tag: "ECOMMERCE",
    title: "Monolith Boutique",
    cursorNone: false,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZQDUNTeD3ytlpajfBVhkw6fBQLB6i4zkwTG0X2ooArO7tPjSpn4KnXSl9WFssJvdX0Fk5FhLIAa43N99d0eBRMsQFdboeSk-ce506ePaif5NwEaidumsK6N2k26G_SlFWgduhgTZYHjjYLmQdQgIqgIPyU7xIqgBVJTXrrOl0PcOqkWTr_Q4K3GvLnA5OxOoxQ5Ns4E6PDQKoBVMwp6w1Yt8BJgErYlLKcTiaWh4-Cc_M0RvahvP2UI_UrgowtWHb3NPgA3DhTFU",
  },
];

export default function Work({ active }) {
  return (
    <section
      id="work"
      className={`section-spread snap-center-force bg-[#0c0c0e]/40 ${
        active ? "active" : ""
      }`}
    >
      <div className="w-full flex flex-col px-8 md:px-32 section-fade-in">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-secondary font-bold text-[10px] tracking-[0.2em] mb-4 block uppercase opacity-80">
              02 / PORTFOLIO
            </span>
            <h2 className="font-display text-6xl md:text-7xl font-bold text-primary">
              Selected Work
            </h2>
          </div>
          <div className="hidden md:flex gap-4">
            <div className="p-4 border border-outline/20 rounded-full hover:border-secondary/40 hover:text-secondary cursor-pointer transition-colors text-primary/60">
              <span className="material-symbols-outlined">arrow_back</span>
            </div>
            <div className="p-4 border border-outline/20 rounded-full hover:border-secondary/40 hover:text-secondary cursor-pointer transition-colors text-primary/60">
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
        </div>

        <div className="work-grid flex gap-8 overflow-x-auto pb-12 snap-x">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`min-w-[320px] md:min-w-[500px] snap-start group ${
                project.cursorNone ? "cursor-none" : ""
              }`}
            >
              <div className="relative overflow-hidden aspect-[4/5] bg-outline-variant/30 border border-white/5">
                <img
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
                  src={project.src}
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-primary text-surface px-6 py-3 font-label text-[10px] font-bold tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    VIEW CASE
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-[10px] font-bold tracking-widest text-secondary/70 mb-2">
                  {project.tag}
                </p>
                <h4 className="font-display text-3xl font-semibold text-primary">
                  {project.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
