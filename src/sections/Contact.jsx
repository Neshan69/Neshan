export default function Contact({ active }) {
  return (
    <section
      id="contact"
      className={`section-spread snap-center-force bg-[#050506] ${
        active ? "active" : ""
      }`}
    >
      <div className="max-w-4xl w-full px-8 md:px-16 section-fade-in">
        <span className="text-secondary font-bold text-[10px] tracking-[0.2em] mb-12 block uppercase opacity-80">
          04 / INITIATE CONNECTION
        </span>
        <h2 className="font-display text-6xl md:text-8xl font-bold mb-20 leading-none text-primary">
          Let's define the future.
        </h2>
        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative">
              <label className="text-[10px] font-bold tracking-widest text-on-surface-variant/60 uppercase">
                Your Name
              </label>
              <input
                className="w-full bg-transparent border-b border-outline-variant py-4 focus:border-secondary/60 outline-none transition-colors text-xl font-display text-primary placeholder:text-outline/20"
                placeholder="Alexander Morgan"
                type="text"
              />
            </div>
            <div className="relative">
              <label className="text-[10px] font-bold tracking-widest text-on-surface-variant/60 uppercase">
                Email Address
              </label>
              <input
                className="w-full bg-transparent border-b border-outline-variant py-4 focus:border-secondary/60 outline-none transition-colors text-xl font-display text-primary placeholder:text-outline/20"
                placeholder="alex@studio.com"
                type="email"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group flex items-center gap-4 text-3xl font-display font-bold text-primary hover:text-secondary transition-colors"
          >
            SEND PROPOSAL
            <span className="material-symbols-outlined text-4xl group-hover:translate-x-4 transition-transform text-secondary/40">
              arrow_forward
            </span>
          </button>
        </form>
        <div className="mt-32 pt-12 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between text-on-surface-variant/30 text-[10px] font-bold tracking-widest">
          <p>© 2024 LUMINA EDITORIAL</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a className="hover:text-secondary/60 transition-colors" href="#">
              LINKEDIN
            </a>
            <a className="hover:text-secondary/60 transition-colors" href="#">
              DRIBBBLE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
