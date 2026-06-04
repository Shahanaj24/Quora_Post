export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 py-8 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} QuoraLite. Built for modern community Q&A experiences.</p>
        <p>Responsive UI · Tailwind · Vite · JWT-ready</p>
      </div>
    </footer>
  );
}
