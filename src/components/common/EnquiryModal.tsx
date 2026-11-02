import React, { useState } from 'react';
import { X, Send, CheckCircle2, Building, Mail, Phone, Car, FileText } from 'lucide-react';
import { Product, EnquiryType } from '../../types';
import { submitEnquiry } from '../../services/dataService';

interface EnquiryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  product,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [enquiryType, setEnquiryType] = useState<EnquiryType>('rfq_quote');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [vehicleInterest, setVehicleInterest] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await submitEnquiry({
        enquiry_type: enquiryType,
        name,
        email,
        phone,
        company,
        vehicle_interest: vehicleInterest,
        product_id: product?.id,
        message: product 
          ? `[Product: ${product.name} (SKU: ${product.sku})]\n\n${message}` 
          : message,
      });

      setSubmittedId(res.id);
      if (onSuccess) onSuccess();
    } catch {
      setErrorMsg('Failed to dispatch enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedId(null);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setVehicleInterest('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedId ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Enquiry Dispatched to Engineering
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Your inquiry has been assigned Reference ID{' '}
              <span className="font-mono text-sky-400 font-semibold">{submittedId}</span> and recorded into the AutoLuma technical CRM. Our optical application engineers will respond within 24 business hours.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-lg shadow-lg shadow-sky-500/20 transition-all"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded">
                OEM RFQ & Technical Inquiry
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-2">
                Request Specifications & Commercial RFQ
              </h3>
              {product && (
                <div className="mt-2 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div className="truncate">
                    <span className="text-slate-400 font-medium">Part: </span>
                    <span className="text-white font-semibold">{product.name}</span>
                  </div>
                  <span className="font-mono text-sky-400 font-bold ml-2 shrink-0">
                    {product.sku}
                  </span>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Inquiry Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1 font-mono">
                  Enquiry Nature *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'rfq_quote', label: 'Commercial RFQ' },
                    { id: 'sample_request', label: 'Lab Sample' },
                    { id: 'oem_development', label: 'OEM Custom' },
                    { id: 'general', label: 'Technical' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEnquiryType(t.id as EnquiryType)}
                      className={`py-2 px-2.5 rounded-lg border text-center transition-all ${
                        enquiryType === t.id
                          ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-semibold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Mehta"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company / OEM Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Auto Systems"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Vehicle Model / Platform */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Vehicle Model / Segment
                </label>
                <input
                  type="text"
                  value={vehicleInterest}
                  onChange={(e) => setVehicleInterest(e.target.value)}
                  placeholder="e.g. Tata Harrier 2024 / M&HCV 24V Platform"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Project Requirements & Volume *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail expected annual volumes, target SOP dates, photometric compliance criteria, or sample verification requirements..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-sky-500 resize-none"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-sky-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
