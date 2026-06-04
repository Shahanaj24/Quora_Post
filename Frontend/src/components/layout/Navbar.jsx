import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaHome, FaMoon, FaPlus, FaSun, FaTachometerAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('quoralite_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('quoralite_theme', nextTheme);
    document.documentElement.classList.toggle('light', nextTheme === 'light');
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-bold text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-400/20">
            Q
          </div>
          <div>
            <p>QuoraLite</p>
            <span className="text-sm text-slate-400">Community-backed post hub</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {isAuthenticated && (
            <>
              <NavLink to="/" className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'}`}>
                <FaHome className="mr-2 inline-block" /> Home
              </NavLink>
              <NavLink to="/posts/new" className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-cyan-500 text-slate-950' : 'text-cyan-300 hover:bg-cyan-500/15 hover:text-white'}`}>
                <FaPlus className="mr-2 inline-block" /> New Post
              </NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'}`}>
                <FaTachometerAlt className="mr-2 inline-block" /> Dashboard
              </NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" onClick={handleThemeToggle} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-300">
            {theme === 'dark' ? <FaMoon /> : <FaSun />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 rounded-2xl bg-slate-900/80 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10">
              <span>{user?.username || user?.email || 'Member'}</span>
              <button type="button" onClick={handleLogout} className="rounded-full bg-cyan-500 px-3 py-2 text-slate-950 transition hover:bg-cyan-400">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700">
                Login
              </Link>
              <Link to="/register" className="rounded-full bg-cyan-500 px-4 py-2 text-sm text-slate-950 transition hover:bg-cyan-400">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
