import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <p className="text-secondary font-bold text-[10px] tracking-[0.2em] uppercase mb-4">404</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">Page not found</h1>
          <p className="text-on-surface-variant mb-8">The page you are looking for doesn't exist or has been moved.</p>
          <Link to="/" className="inline-block bg-secondary text-surface px-8 py-3 rounded-xl font-bold text-xs tracking-widest hover:brightness-110 transition-all">GO HOME</Link>
        </div>
      </div>
      <footer className="sr-only">© 2024 Neshan Niroula</footer>
    </>
  );
}
