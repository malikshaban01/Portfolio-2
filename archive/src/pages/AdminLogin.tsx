import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import supabase from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(''); setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    nav('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 radial-fade" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-teal-400 text-sm mb-6 font-mono">
          <ArrowLeft size={14} /> back to site
        </Link>

        <div className="bg-navy-900/60 backdrop-blur border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-teal-400/10 flex items-center justify-center text-teal-400">
              <Lock size={18} />
            </div>
            <div>
              <h1 className="font-bold text-slate-100 text-lg">Admin Access</h1>
              <p className="text-slate-500 text-xs font-mono">/admin</p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="font-mono text-xs text-teal-400 mb-1.5 block">email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-navy-950/60 border border-white/10 rounded-lg text-slate-100 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-teal-400 mb-1.5 block">password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-navy-950/60 border border-white/10 rounded-lg text-slate-100 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                placeholder="••••••••"
              />
            </div>

            {err && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                <AlertCircle size={14} /> {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-400 text-navy-950 rounded-lg font-semibold hover:bg-teal-300 transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Lock size={16} />}
              Sign In
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
