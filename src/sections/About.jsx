import Reveal from "../components/Reveal";
import MicroLabel from "../components/MicroLabel";
import SmartImage from "../components/SmartImage";

export default function About({ active }) {
  return (
    <section
      id="about"
      aria-label="Philosophy"
      className={`section-spread snap-center-force bg-surface/30 backdrop-blur-sm ${
        active ? "active" : ""
      }`}
    >
      <Reveal className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-16 lg:px-24 items-center">
          <div className="md:col-span-5 relative">
            <div className="aspect-[3/4] bg-outline-variant/30 overflow-hidden rounded-lg border border-outline-variant/10">
              <SmartImage
                className="w-full h-full object-cover grayscale brightness-75"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxBRQzHYlnxt10ZHIlpblZijaSZFkmur-2F0yXzkOCdGjQHK5dVfLpAuXt2xKIJYoHjp0PzT-SV4Tfy4wG-4FqCBAbseN20I4kStJ7Jahf8RmJqJLqJly1ySibnD8l3rjHyFDRYR264xUTHYffXdTSqYpIEN_oYczCqH2dfwBzhGGgBL8tB_8hkf1gZikM6oqxeOj3IG2562n8SrqGF91uM9zbbDjBF50wj6VSMWayJrDKRD_mVNi1iC0723wT3Wji7iIuUY0IC-s"
                alt="Professional portrait of a high-end UI designer in a minimalist studio environment, soft side lighting, monochrome aesthetic."
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary text-surface p-6 hidden md:block shadow-[0_0_20px_rgba(60,215,255,0.4)]">
              <p className="text-[10px] font-bold tracking-widest mb-2 uppercase">EXPERIENCE</p>
              <p className="text-3xl font-display font-bold">12+</p>
              <p className="text-[10px] font-bold uppercase opacity-80">YEARS OF CRAFT</p>
            </div>
          </div>
         <div className="md:col-span-7 space-y-6">
            <h2>
              <MicroLabel className="block" muted={false}>03 / PHILOSOPHY</MicroLabel>
            </h2>
           <blockquote className="font-display text-2xl md:text-3xl italic font-light text-primary border-l-4 border-secondary pl-6 py-2">
             "Design is the logic of the interface; security is the logic of the
             system. I build at the intersection of both."
           </blockquote>
           <div className="space-y-4 text-on-surface-variant text-lg max-w-xl font-light">
             <p>
               I approach digital products through the combined lens of
               architectural rhythm and technical rigor. My background spans
               UI/UX design, frontend engineering, and network security.
             </p>
             <p>
               I believe that the most powerful interfaces are those that are as
               secure and logically sound as they are aesthetically precise,
               ensuring a seamless bridge between human intent and machine logic.
             </p>
           </div>
           <div className="flex gap-8 pt-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/80 mb-2">
                Location
              </p>
              <p className="font-semibold text-primary">Remote / Worldwide</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/80 mb-2">
                Education
              </p>
              <p className="font-semibold text-primary">Master of Digital Design</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
