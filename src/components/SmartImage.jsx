import { useState } from "react";

// SmartImage: applies performance + asset-management skills.
// - lazy + async decode to keep the main thread free (image-optimization.md)
// - explicit width/height when provided to reserve space and avoid CLS
// - onError fallback to a local placeholder so external hotlinks never break
//   the layout (asset-management.md ADR-6)
export default function SmartImage({
  src,
  alt,
  className = "",
  width,
  height,
  fetchPriority,
  fallback = "/placeholder.svg",
  ...rest
}) {
  const [errored, setErrored] = useState(false);

  return (
    <img
      src={errored ? fallback : src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => setErrored(true)}
      className={className}
      {...rest}
    />
  );
}
