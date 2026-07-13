export default function LoadingFallback() {
  return (
    <div className="w-full flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
