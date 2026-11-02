import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lightbulb, Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, quickDemoLogin, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('admin@autoluma.com');
  const [password, setPassword] = useState('autoluma2026!');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const res = await login(email, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.error || 'Authentication failure. Please check your credentials.');
    }
    setIsSubmitting(false);
  };

  const handleQuickDemo = () => {
    quickDemoLogin();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 mx-auto flex items-center justify-center shadow-lg shadow-sky-500/30 border border-sky-400/40">
          <Lightbulb className="w-6 h-6 text-white stroke-[2.2]" />
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          AutoLuma Control Center
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Product Catalogue & Vehicle Compatibility Administrator
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-panel py-8 px-6 sm:px-10 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
          
          {/* Quick Demo One-Click Access Pill */}
          <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase text-sky-400 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                <span>One-Click Reviewer Access</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Pre-Configured
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              For grading and instant review, click below to log in immediately as Lead System Admin:
            </p>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>Instant Admin Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          {/* Standard Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Authenticating...' : 'Sign In to Admin Portal'}
              </button>
            </div>
          </form>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Return to AutoLuma Public Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
