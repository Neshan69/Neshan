export default function Header({ onContact }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-6">
      <div className="font-display font-bold text-xl md:text-2xl tracking-tight text-primary uppercase">
        Neshan Niroula
      </div>
      <button
        type="button"
        onClick={onContact}
        aria-label="Start a conversation — go to contact"
        className="bg-primary text-surface px-4 md:px-6 py-2 text-[10px] font-bold tracking-widest hover:bg-secondary hover:text-white transition-all duration-500"
      >
        LET'S TALK
      </button>
    </header>
  );
}
