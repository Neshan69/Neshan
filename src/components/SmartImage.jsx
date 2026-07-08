import { useState } from "react";

// SmartImage: applies performance + asset-management skills.
// - lazy + async decode to keep the main thread free (image-optimization.md)
// - onError fallback to a local placeholder so external hotlinks never break
//   the layout (asset-management.md ADR-6)
export default function SmartImage({ src, alt, className = "", fallback = "/placeholder.svg", ...rest }) {
  const [errored, setErrored] = useState(false);

  return (
    <img
      src={errored ? fallback : src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
      {...rest}
    />
  );
}
