export default function Loader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/90 px-6 py-5 shadow-soft">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400/70 border-t-transparent"></div>
        <div>
          <p className="text-sm font-semibold text-slate-100">Loading content…</p>
          <p className="text-xs text-slate-400">Please wait while we fetch the latest posts.</p>
        </div>
      </div>
    </div>
  );
}
