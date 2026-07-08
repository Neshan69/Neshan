export default function About({ active }) {
  return (
    <section
      id="about"
      className={`section-spread snap-center-force bg-surface/30 backdrop-blur-sm ${
        active ? "active" : ""
      }`}
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-16 px-8 md:px-32 items-center section-fade-in">
        <div className="md:col-span-5 relative">
          <div className="aspect-[3/4] bg-outline-variant/30 overflow-hidden rounded-lg border border-white/5">
            <img
              className="w-full h-full object-cover grayscale brightness-75"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxBRQzHYlnxt10ZHIlpblZijaSZFkmur-2F0yXzkOCdGjQHK5dVfLpAuXt2xKIJYoHjp0PzT-SV4Tfy4wG-4FqCBAbseN20I4kStJ7Jahf8RmJqJLqJly1ySibnD8l3rjHyFDRYR264xUTHYffXdTSqYpIEN_oYczCqH2dfwBzhGGgBL8tB_8hkf1gZikM6oqxeOj3IG2562n8SrqGF91uM9zbbDjBF50wj6VSMWayJrDKRD_mVNi1iC0723wT3Wji7iIuUY0IC-s"
              alt="Professional portrait of a high-end UI designer in a minimalist studio environment, soft side lighting, monochrome aesthetic, wearing a clean charcoal sweater, serious but creative expression, depth of field."
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-secondary text-white p-8 hidden md:block shadow-[0_0_25px_rgba(0,144,174,0.2)]">
            <p className="text-[10px] font-bold tracking-widest mb-2 uppercase">EXPERIENCE</p>
            <p className="text-4xl font-display font-bold">12+</p>
            <p className="text-[10px] font-bold uppercase opacity-80">YEARS OF CRAFT</p>
          </div>
        </div>
        <div className="md:col-span-7 space-y-10">
          <span className="text-secondary font-bold text-[10px] tracking-[0.2em] block uppercase opacity-80">
            03 / PHILOSOPHY
          </span>
          <blockquote className="font-display text-4xl md:text-5xl italic font-light text-primary border-l-2 border-secondary/50 pl-8 py-2">
            "Good design is not just a visual solution, but a logical
            architecture that guides human emotion."
          </blockquote>
          <div className="space-y-6 text-on-surface-variant text-xl max-w-xl font-light">
            <p>
              With over a decade of experience across London and Tokyo, I
              approach digital products through the lens of Swiss typography and
              architectural rhythm.
            </p>
          </div>
          <div className="flex gap-12 pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mb-2">
                Location
              </p>
              <p className="font-semibold text-primary">Remote / Worldwide</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mb-2">
                Education
              </p>
              <p className="font-semibold text-primary">Master of Digital Design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
