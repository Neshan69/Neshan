// MicroLabel: the canonical uppercase, tracked-out micro-label used across
// sections (01 / CAPABILITIES, etc). Extracted per component-rules.md.
// `muted` softens the label opacity on certain backgrounds.
export default function MicroLabel({ children, className = "", muted = false }) {
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
