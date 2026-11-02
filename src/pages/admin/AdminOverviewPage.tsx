import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Boxes, 
  Inbox, 
  Compass, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  Clock,
  ChevronRight,
  Database
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';
import { Product, InventoryRecord, CustomerEnquiry, ProductCompatibility, Category } from '../../types';
import { 
  getProducts, 
  getInventory, 
  getEnquiries, 
  getCompatibilities, 
  getCategories,
  updateEnquiryStatus
} from '../../services/dataService';

export const AdminOverviewPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryRecord[]>([]);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [compatibilities, setCompatibilities] = useState<ProductCompatibility[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      const [prods, invs, enqs, comps, cats] = await Promise.all([
        getProducts(),
        getInventory(),
        getEnquiries(),
        getCompatibilities(),
        getCategories(),
      ]);
      setProducts(prods);
      setInventory(invs);
      setEnquiries(enqs);
      setCompatibilities(comps);
      setCategories(cats);
      setIsLoading(false);
    }
    loadStats();
  }, []);

  const lowStockCount = inventory.filter((i) => i.status === 'low_stock' || i.status === 'out_of_stock').length;
  const pendingEnquiriesCount = enquiries.filter((e) => e.status === 'new' || e.status === 'in_review').length;

  // Chart data: Monthly inquiry volume simulation
  const trendData = [
    { month: 'Nov', rfq: 12, samples: 4, oem: 3 },
    { month: 'Dec', rfq: 18, samples: 7, oem: 5 },
    { month: 'Jan', rfq: 24, samples: 9, oem: 6 },
    { month: 'Feb', rfq: 29, samples: 14, oem: 8 },
    { month: 'Mar', rfq: 38, samples: 18, oem: 12 },
  ];

  // Category distribution data
  const categoryData = categories.map((cat) => ({
    name: cat.name.split(' ')[0],
    count: products.filter((p) => p.category_id === cat.id).length,
  }));

  const BAR_COLORS = ['#38BDF8', '#0284C7', '#2563EB', '#6366F1', '#EC4899', '#F59E0B'];

  const handleQuickStatusChange = async (enquiryId: string, newStatus: any) => {
    await updateEnquiryStatus(enquiryId, newStatus);
    const updated = await getEnquiries();
    setEnquiries(updated);
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-slate-400 font-mono">Aggregating AutoLuma Operational Metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            System Operations & Telemetry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status of lighting SKUs, fitment matrices, inventory levels, and customer RFQ pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Product SKU</span>
          </Link>
          <Link
            to="/admin/compatibility"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Map Compatibility</span>
          </Link>
        </div>
      </div>

      {/* 4 Core KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase">Active Products</span>
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {products.length}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">100% active</span> in live catalogue
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase">Stock Alerts</span>
            <div className={`p-2 rounded-lg ${lowStockCount > 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {lowStockCount}
          </div>
          <div className="text-xs text-slate-400">
            {lowStockCount > 0 ? (
              <span className="text-amber-400 font-medium">Reorder required below threshold</span>
            ) : (
              <span className="text-emerald-400">All inventory normal</span>
            )}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase">Pending RFQs</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {pendingEnquiriesCount}
          </div>
          <div className="text-xs text-slate-400">
            {enquiries.length} total customer inquiries logged
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase">Verified Fitments</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {compatibilities.length}
          </div>
          <div className="text-xs text-slate-400">
            Cross-platform vehicle mappings
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Trend Area Chart (8 cols) */}
        <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Monthly Inbound Inquiry & RFQ Pipeline
              </h3>
              <p className="text-xs text-slate-400">
                Commercial volume tenders, lab samples, and custom OEM inquiries
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-semibold">+34% vs Last Quarter</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rfqGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="sampleGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                />
                <Area type="monotone" dataKey="rfq" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#rfqGlow)" name="Commercial RFQs" />
                <Area type="monotone" dataKey="samples" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#sampleGlow)" name="Lab Samples" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Category Distribution (4 cols) */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Category Distribution
            </h3>
            <p className="text-xs text-slate-400">
              Lighting assemblies indexed per line
            </p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#f8fafc',
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Products">
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Quick Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Customer Enquiries & RFQs</h3>
            <p className="text-xs text-slate-400">Manage inbound requests from OEMs, fleets, and distributors</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Contact & Company</th>
                <th className="p-3">Enquiry Type</th>
                <th className="p-3">Target Platform</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Quick Transition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {enquiries.slice(0, 5).map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-sky-400">
                    {enq.id}
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-white">{enq.name}</div>
                    <div className="text-[11px] text-slate-400">{enq.company || enq.email}</div>
                  </td>
                  <td className="p-3 capitalize font-mono text-slate-300">
                    {enq.enquiry_type.replace('_', ' ')}
                  </td>
                  <td className="p-3 text-slate-300 truncate max-w-xs">
                    {enq.vehicle_interest || 'General'}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      enq.status === 'new'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : enq.status === 'in_review'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : enq.status === 'quoted'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <select
                      value={enq.status}
                      onChange={(e) => handleQuickStatusChange(enq.id, e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-[11px] text-white rounded px-2 py-1 focus:outline-none focus:border-sky-500"
                    >
                      <option value="new">New</option>
                      <option value="in_review">In Review</option>
                      <option value="quoted">Quoted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
