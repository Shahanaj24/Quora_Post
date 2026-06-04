import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useToast } from '../../hooks/useToast.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login({ email, password });
      showToast('Login successful. Welcome back!');
      navigate('/');
    } catch (error) {
      showToast(error?.response?.data?.message || 'Unable to login. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-soft">
      <div className="mb-8 space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Welcome back</p>
        <h1 className="text-3xl font-semibold text-white">Login to your QuoraLite account</h1>
        <p className="text-slate-400">Sign in to browse, create, and manage posts in your community stream.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="you@example.com"
            className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="Enter your password"
            className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>

        <button type="submit" disabled={loading} className="w-full rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        New here?{' '}
        <Link to="/register" className="font-semibold text-cyan-300 hover:text-cyan-200">
          Create an account
        </Link>
      </p>
    </div>
  );
}
