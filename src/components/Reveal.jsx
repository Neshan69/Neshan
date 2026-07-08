import { motion, useReducedMotion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// Reveal wraps section content in a transform/opacity fade-in.
// Honors prefers-reduced-motion (animation-guidelines.md + accessibility.md).
export default function Reveal({ children, className = "", delay = 0 }) {
  const systemReduced = useReducedMotion();
  const userReduced = usePrefersReducedMotion();
  const reduced = systemReduced || userReduced;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
