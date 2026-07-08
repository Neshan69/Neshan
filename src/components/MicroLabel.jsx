// MicroLabel: the canonical uppercase, tracked-out micro-label used across
// sections (01 / CAPABILITIES, etc). Extracted per component-rules.md.
// `muted` (default true) applies the softened opacity used on most labels.
export default function MicroLabel({ children, className = "", muted = true }) {
  return (
    <span
      className={`text-secondary font-bold text-[10px] tracking-[0.2em] uppercase ${
        muted ? "opacity-80" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}
