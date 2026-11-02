import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Trash2, 
  Eye, 
  X, 
  CheckCircle2, 
  Clock, 
  Mail, 
  Phone, 
  Building, 
  Car, 
  FileText,
  Save
} from 'lucide-react';
import { CustomerEnquiry, Product, EnquiryStatus } from '../../types';
import { getEnquiries, getProducts, updateEnquiryStatus, deleteEnquiry } from '../../services/dataService';

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Selected enquiry for details modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<CustomerEnquiry | null>(null);
  const [modalStatus, setModalStatus] = useState<EnquiryStatus>('new');
  const [modalAdminNotes, setModalAdminNotes] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [enqs, prods] = await Promise.all([getEnquiries(), getProducts()]);
    setEnquiries(enqs);
    setProducts(prods);
    setIsLoading(false);
  };

  const openDetailsModal = (enq: CustomerEnquiry) => {
    setSelectedEnquiry(enq);
    setModalStatus(enq.status);
    setModalAdminNotes(enq.admin_notes || '');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    await updateEnquiryStatus(selectedEnquiry.id, modalStatus, modalAdminNotes);
    setSelectedEnquiry(null);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await deleteEnquiry(id);
    if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    await loadData();
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    if (statusFilter && enq.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = enq.name.toLowerCase().includes(q);
      const matchEmail = enq.email.toLowerCase().includes(q);
      const matchCompany = enq.company?.toLowerCase().includes(q);
      const matchMsg = enq.message.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchCompany && !matchMsg) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Customer Enquiries & OEM RFQ Tracking
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review inbound technical inquiries, sample requests, and fleet quotations logged in real-time.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Total Inquiries: <span className="text-white font-bold">{enquiries.length}</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by contact name, email, company or message content..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
        >
          <option value="">All Workflow Statuses ({enquiries.length})</option>
          <option value="new">New (Unreviewed)</option>
          <option value="in_review">In Review / Engineering</option>
          <option value="quoted">Quoted / RFQ Dispatched</option>
          <option value="resolved">Resolved / Closed</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Ref ID</th>
                <th className="p-3.5">Client & Organization</th>
                <th className="p-3.5">Nature</th>
                <th className="p-3.5">Target Platform / Product</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Submitted</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No customer enquiries found matching filter.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => {
                  const prod = products.find((p) => p.id === enq.product_id);
                  return (
                    <tr key={enq.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-sky-400">
                        {enq.id}
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-white">{enq.name}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                          {enq.company || enq.email}
                        </div>
                      </td>

                      <td className="p-3.5 capitalize font-mono text-slate-300">
                        {enq.enquiry_type.replace('_', ' ')}
                      </td>

                      <td className="p-3.5 text-slate-300">
                        <div className="truncate max-w-[200px] font-medium">
                          {enq.vehicle_interest || prod?.name || 'General Inquiry'}
                        </div>
                        {prod && (
                          <div className="text-[10px] font-mono text-sky-400 truncate">
                            SKU: {prod.sku}
                          </div>
                        )}
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          enq.status === 'new'
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            : enq.status === 'in_review'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : enq.status === 'quoted'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {enq.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3.5 font-mono text-slate-400 text-[11px]">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openDetailsModal(enq)}
                            className="px-2.5 py-1 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 rounded text-sky-400 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Inspect</span>
                          </button>
                          <button
                            onClick={() => handleDelete(enq.id)}
                            className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-slate-800 ml-1"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Status Update Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-sky-400">
                  Enquiry ID: {selectedEnquiry.id}
                </span>
                <h3 className="text-lg font-bold text-white">
                  Customer RFQ Specification
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block">Client Contact:</span>
                <span className="font-semibold text-white text-sm">{selectedEnquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Email Address:</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-sky-400 hover:underline">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">Company / OEM:</span>
                <span className="text-slate-200">{selectedEnquiry.company || 'Not Specified'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Phone / WhatsApp:</span>
                <span className="text-slate-200">{selectedEnquiry.phone || 'Not Specified'}</span>
              </div>
            </div>

            {/* Target Vehicle & Message */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-mono">Target Platform: </span>
                <span className="text-white font-semibold">
                  {selectedEnquiry.vehicle_interest || 'General'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 whitespace-pre-wrap text-slate-300 leading-relaxed font-sans">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Status Update Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-2 border-t border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Workflow Status
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as EnquiryStatus)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="new">New (Unprocessed)</option>
                    <option value="in_review">In Review (With Engineering)</option>
                    <option value="quoted">Quoted (Commercial RFQ Sent)</option>
                    <option value="resolved">Resolved / Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Submitted Date
                  </label>
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-400 font-mono">
                    {new Date(selectedEnquiry.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Internal Application Engineering Notes
                </label>
                <textarea
                  rows={2}
                  value={modalAdminNotes}
                  onChange={(e) => setModalAdminNotes(e.target.value)}
                  placeholder="e.g. Sent quotation Q-2026-088. Photometric goniometer CAD files dispatched to customer optical team."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Workflow Status</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
