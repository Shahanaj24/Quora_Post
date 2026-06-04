export default function SearchBar({ value, onChange }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-3 shadow-soft">
      <label className="sr-only" htmlFor="search">
        Search posts
      </label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search posts by author, content, or keyword"
        className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
      />
    </div>
  );
}
