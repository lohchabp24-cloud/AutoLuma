import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Compass, 
  Boxes, 
  Inbox, 
  BarChart3, 
  LogOut, 
  ExternalLink, 
  Lightbulb, 
  ShieldCheck,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminLayout: React.FC = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login if unauthenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Products & SKUs', path: '/admin/products', icon: Package },
    { label: 'Taxonomy & Categories', path: '/admin/categories', icon: Layers },
    { label: 'Vehicle Compatibility', path: '/admin/compatibility', icon: Compass },
    { label: 'Inventory & Stock', path: '/admin/inventory', icon: Boxes },
    { label: 'Enquiries & RFQs', path: '/admin/enquiries', icon: Inbox },
    { label: 'Analytics & Database', path: '/admin/analytics', icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-md">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight">
                  Auto<span className="text-sky-400">Luma</span>
                </span>
                <span className="block text-[10px] font-mono text-slate-400 uppercase">
                  Control Center
                </span>
              </div>
            </Link>
          </div>

          {/* Database Engine Status Pill */}
          <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/40">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>DB Engine</span>
              </span>
              {isSupabaseConfigured ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Supabase Live
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  Local Storage
                </span>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-inner-glow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-mono text-xs font-bold">
              {user?.full_name ? user.full_name[0] : 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">
                {user?.full_name || 'System Admin'}
              </div>
              <div className="text-[11px] font-mono text-slate-400 truncate">
                {user?.email || 'admin@autoluma.com'}
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Store</span>
            </Link>

            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 bg-slate-950 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
