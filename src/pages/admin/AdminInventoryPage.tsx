import React, { useState, useEffect } from 'react';
import { 
  Boxes, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Plus, 
  Minus, 
  Edit3, 
  X,
  PackageCheck
} from 'lucide-react';
import { InventoryRecord, Product, InventoryStatus } from '../../types';
import { getInventory, getProducts, updateInventoryStock } from '../../services/dataService';

export const AdminInventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Edit bin modal
  const [editingItem, setEditingItem] = useState<{ record: InventoryRecord; product: Product } | null>(null);
  const [editQty, setEditQty] = useState<number>(0);
  const [editBin, setEditBin] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [invs, prods] = await Promise.all([getInventory(), getProducts()]);
    setInventory(invs);
    setProducts(prods);
    setIsLoading(false);
  };

  const handleAdjustStock = async (productId: string, currentQty: number, delta: number) => {
    const nextQty = Math.max(0, currentQty + delta);
    await updateInventoryStock(productId, nextQty);
    await loadData();
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    await updateInventoryStock(editingItem.record.product_id, editQty, editBin);
    setEditingItem(null);
    await loadData();
  };

  const lowStockCount = inventory.filter((i) => i.status === 'low_stock' || i.status === 'out_of_stock').length;

  const filteredInventory = inventory.filter((item) => {
    const prod = products.find((p) => p.id === item.product_id);
    if (statusFilter && item.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchSku = prod?.sku.toLowerCase().includes(q);
      const matchName = prod?.name.toLowerCase().includes(q);
      const matchBin = item.warehouse_bin.toLowerCase().includes(q);
      if (!matchSku && !matchName && !matchBin) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Inventory & Warehouse Stock Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time optical parts inventory, bin storage locations, and automated reorder alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {lowStockCount > 0 && (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>{lowStockCount} Parts Below Reorder Threshold</span>
            </div>
          )}
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
            placeholder="Search by SKU, product name or warehouse bin..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
        >
          <option value="">All Stock Statuses ({inventory.length})</option>
          <option value="in_stock">In Stock (Healthy)</option>
          <option value="low_stock">Low Stock (Alert)</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {/* Inventory Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">SKU & Assembly</th>
                <th className="p-3.5">Warehouse Bin</th>
                <th className="p-3.5">On-Hand Stock</th>
                <th className="p-3.5">Min Threshold</th>
                <th className="p-3.5">Stock Status</th>
                <th className="p-3.5">Last Restocked</th>
                <th className="p-3.5 text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No matching inventory records.
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => {
                  const prod = products.find((p) => p.id === item.product_id);
                  const isLow = item.stock_quantity <= item.min_threshold;
                  return (
                    <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5">
                        <div className="font-mono text-sky-400 font-bold">
                          {prod?.sku || item.product_id}
                        </div>
                        <div className="text-white font-medium truncate max-w-xs">
                          {prod?.name || 'Assembly'}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-mono text-slate-300 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                          {item.warehouse_bin}
                        </span>
                      </td>

                      <td className="p-3.5 font-mono">
                        <span className={`text-base font-bold ${
                          item.stock_quantity === 0
                            ? 'text-red-400'
                            : isLow
                            ? 'text-amber-400'
                            : 'text-white'
                        }`}>
                          {item.stock_quantity}
                        </span>
                        <span className="text-slate-400 text-[11px] ml-1">units</span>
                      </td>

                      <td className="p-3.5 font-mono text-slate-400">
                        {item.min_threshold} units
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          item.status === 'in_stock'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : item.status === 'low_stock'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                          {item.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                        {new Date(item.last_restocked_at).toLocaleDateString()}
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleAdjustStock(item.product_id, item.stock_quantity, -5)}
                            disabled={item.stock_quantity <= 0}
                            className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded text-slate-300 hover:text-white disabled:opacity-30"
                            title="Decrement 5 units"
                          >
                            -5
                          </button>
                          <button
                            onClick={() => handleAdjustStock(item.product_id, item.stock_quantity, +5)}
                            className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded text-slate-300 hover:text-white"
                            title="Increment 5 units"
                          >
                            +5
                          </button>
                          <button
                            onClick={() => handleAdjustStock(item.product_id, item.stock_quantity, +25)}
                            className="px-2 py-1 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 rounded text-sky-400 font-semibold"
                            title="Increment 25 units"
                          >
                            +25
                          </button>
                          <button
                            onClick={() => {
                              if (prod) {
                                setEditingItem({ record: item, product: prod });
                                setEditQty(item.stock_quantity);
                                setEditBin(item.warehouse_bin);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 ml-1"
                            title="Edit Stock & Bin Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
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

      {/* Edit Bin & Custom Stock Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                Adjust Inventory: {editingItem.product.sku}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  On-Hand Stock Units *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={editQty}
                  onChange={(e) => setEditQty(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Warehouse Location / Bin Code *
                </label>
                <input
                  type="text"
                  required
                  value={editBin}
                  onChange={(e) => setEditBin(e.target.value)}
                  placeholder="e.g. BIN-HL-A01"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-lg"
                >
                  Save Stock Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
