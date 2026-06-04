export default function SkeletonLoader({ count = 3 }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-3xl bg-slate-900/80 p-6 shadow-soft">
          <div className="mb-4 h-6 w-3/4 rounded-full bg-slate-700"></div>
          <div className="mb-3 h-4 w-2/3 rounded-full bg-slate-700"></div>
          <div className="grid gap-3">
            <div className="h-3 rounded-full bg-slate-700" />
            <div className="h-3 rounded-full bg-slate-700" />
            <div className="h-3 w-5/6 rounded-full bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
