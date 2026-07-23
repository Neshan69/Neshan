export default function Avatar({
  src,
  alt,
  name,
  className = "",
  size = "md",
}) {
  const fallback = "/placeholder.svg";

  const handleError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallback;
  };

  const initials =
    name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => (p?.[0] ?? "").toUpperCase())
      .join("") || "?";

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-24 h-24 text-lg",
  };

  const validSrc =
    typeof src === "string" && src.trim() !== "" && !src.includes("lh3.googleusercontent.com");

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-surface-container-high shrink-0 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {validSrc ? (
        <img
          src={src.trim()}
          alt={alt || name || "Avatar"}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-bold text-secondary uppercase">{initials}</span>
        </div>
      )}
    </div>
  );
}
