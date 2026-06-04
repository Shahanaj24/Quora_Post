import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
