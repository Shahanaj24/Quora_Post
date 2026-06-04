import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-12 text-center shadow-soft">
      <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Page not found</p>
      <h1 className="mt-6 text-4xl font-semibold text-white">404 — You’ve reached a blank page</h1>
      <p className="mt-4 text-sm leading-7 text-slate-400">The page you are looking for does not exist or has been moved. Return to the home feed to continue browsing.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
        Back to home
      </Link>
    </div>
  );
}
