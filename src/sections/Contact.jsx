import { useState } from "react";
import Reveal from "../components/Reveal";
import MicroLabel from "../components/MicroLabel";

export default function Contact({ active }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // No backend yet (api-design.md). Simulate a stubbed submit.
    setTimeout(() => setStatus("sent"), 600);
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className={`section-spread snap-center-force bg-[#050506] ${
        active ? "active" : ""
      }`}
    >
      <Reveal className="max-w-4xl w-full px-8 md:px-16">
        <MicroLabel className="mb-12 block">04 / INITIATE CONNECTION</MicroLabel>
        <h2 className="font-display text-6xl md:text-8xl font-bold mb-20 leading-none text-primary">
          Let's define the future.
        </h2>

        {status === "sent" ? (
          <p
            role="status"
            aria-live="polite"
            className="text-2xl font-display text-secondary"
          >
            Thank you — your proposal is on its way. (Demo form; not yet wired to
            a backend.)
          </p>
        ) : (
          <form className="space-y-12" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="text-[10px] font-bold tracking-widest text-on-surface-variant/60 uppercase"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full bg-transparent border-b-2 border-outline-variant py-4 focus:border-secondary hover:border-secondary outline-none transition-colors text-xl font-display text-primary placeholder:text-outline/30"
                  placeholder="Alexander Morgan"
                  type="text"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="text-[10px] font-bold tracking-widest text-on-surface-variant/60 uppercase"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b-2 border-outline-variant py-4 focus:border-secondary hover:border-secondary outline-none transition-colors text-xl font-display text-primary placeholder:text-outline/30"
                  placeholder="alex@studio.com"
                  type="email"
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="inquiry"
                className="text-[10px] font-bold tracking-widest text-on-surface-variant/60 uppercase"
              >
                Your Inquiry
              </label>
              <textarea
                id="inquiry"
                name="inquiry"
                rows={3}
                className="w-full bg-transparent border-b-2 border-outline-variant py-4 focus:border-secondary hover:border-secondary outline-none transition-colors text-xl font-display h-32 resize-none text-primary placeholder:text-outline/30"
                placeholder="How can we collaborate?"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex items-center gap-4 text-3xl font-display font-bold text-primary hover:text-secondary transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "SENDING…" : "SEND PROPOSAL"}
              <span className="material-symbols-outlined text-4xl group-hover:translate-x-4 transition-transform">
                arrow_forward
              </span>
            </button>
          </form>
        )}

        <div className="mt-32 pt-12 border-t border-outline-variant flex flex-col md:flex-row justify-between text-[10px] font-bold tracking-widest text-on-surface-variant/60">
          <p>© 2024 NESHAN NIROULA</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a className="hover:text-secondary transition-colors" href="#">
              LINKEDIN
            </a>
            <a className="hover:text-secondary transition-colors" href="#">
              DRIBBBLE
            </a>
            <a className="hover:text-secondary transition-colors" href="#">
              INSTAGRAM
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
