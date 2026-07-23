import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="relative w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:border-secondary transition-colors"
    >
      <span className="material-symbols-outlined text-lg">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
