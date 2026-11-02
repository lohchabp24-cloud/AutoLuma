import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Building2, 
  Clock, 
  ShieldCheck,
  FileCheck,
  Lock,
  ArrowRight
} from 'lucide-react';
import { EnquiryType } from '../types';
import { submitEnquiry } from '../services/dataService';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [enquiryType, setEnquiryType] = useState<EnquiryType>(
    (searchParams.get('type') as EnquiryType) || 'rfq_quote'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [vehicleInterest, setVehicleInterest] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle prefilled SKU/Product from URL params
  useEffect(() => {
    const sku = searchParams.get('sku');
    const product = searchParams.get('product');
    if (sku || product) {
      setMessage(`Enquiry regarding: ${product || ''} (SKU: ${sku || ''})\n\nRequirement details: `);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await submitEnquiry({
        enquiry_type: enquiryType,
        name,
        email,
        phone,
        company,
        vehicle_interest: vehicleInterest,
        message,
      });

      setSubmittedReference(res.id);
    } catch {
      setErrorMessage('Failed to submit enquiry. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedReference(null);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setVehicleInterest('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
          <Mail className="w-3.5 h-3.5" />
          <span>OEM Technical Sales & Application Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact Engineering & Submit Commercial RFQ
        </h1>
        <p className="text-sm text-slate-300">
          Whether you need a commercial quotation for bulk fleet replacements, photometric laboratory test samples, or bespoke OEM lighting design, our application engineers are standing by.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Information & Operational Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Application Engineering Facilities
            </h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Lighting R&D & Test Center</div>
                  <div className="text-xs text-slate-400 leading-relaxed mt-0.5">
                    AutoLuma Technological Campus, Optical Corridor, Sector 34, Gurugram / Pune Manufacturing Hub, India
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Technical RFQ Desk</div>
                  <a href="mailto:oem-engineering@autoluma.tech" className="text-xs text-sky-400 hover:underline">
                    oem-engineering@autoluma.tech
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Direct Engineering Hotline</div>
                  <div className="text-xs text-slate-400">+91 (0124) 480-LUMA (5862)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Engineering Response SLA</div>
                  <div className="text-xs text-slate-400">Within 24 business hours guaranteed</div>
                </div>
              </div>
            </div>

            {/* Quick Live DB Notice */}
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Real-Time Database Storage</span>
              </div>
              <p className="leading-relaxed">
                All submitted inquiries are immediately persisted to the AutoLuma relational database and can be reviewed, quoted, and tracked inside the{' '}
                <Link to="/admin/enquiries" className="text-sky-400 hover:underline font-medium">
                  Admin Enquiry Management Portal
                </Link>.
              </p>
            </div>
          </div>

          {/* Standards Seal */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">ISO/IEC 17025 Calibrated Testing</div>
              <p className="text-slate-400 mt-0.5">
                Lab reports include isocandela diagrams, AIS-012 compliance matrix, and salt-fog test certifications.
              </p>
            </div>
          </div>
        </div>

        {/* Inbound Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 relative">
            
            {submittedReference ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Inquiry Successfully Registered!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{name}</span>. Your inquiry has been stored with Reference Number:
                </p>
                <div className="inline-block px-4 py-2 bg-slate-900 border border-sky-500/40 rounded-xl text-base font-mono font-bold text-sky-400">
                  {submittedReference}
                </div>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Our application engineer will review your specifications and contact you at <strong className="text-slate-200">{email}</strong>.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200"
                  >
                    Submit Another Inquiry
                  </button>
                  <Link
                    to="/admin/enquiries"
                    className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>View in Admin Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Submit RFQ or Technical Inquiry
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the technical request below to receive engineering drawings, compliance certificates, and commercial proposals.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300">
                    {errorMessage}
                  </div>
                )}

                {/* Enquiry Nature Radio Tabs */}
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                    Enquiry Nature *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'rfq_quote', label: 'Commercial RFQ' },
                      { id: 'oem_development', label: 'OEM Program' },
                      { id: 'sample_request', label: 'Lab Sample Test' },
                      { id: 'fleet_bulk', label: 'Fleet Bulk Supply' },
                      { id: 'general', label: 'Technical Query' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setEnquiryType(t.id as EnquiryType)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          enquiryType === t.id
                            ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rao"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98450 71190"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. TransLog Logistics & Mobility"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Vehicle Platform Interest */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Vehicle Platform or Segment of Interest
                  </label>
                  <input
                    type="text"
                    value={vehicleInterest}
                    onChange={(e) => setVehicleInterest(e.target.value)}
                    placeholder="e.g. 24V Commercial Heavy Hauler / Mahindra Scorpio-N / Electric 3W"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Detailed Engineering Requirements & Quantities *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify target volumes, compliance needs (ECE R112, AIS-012), voltage architecture, sample delivery timelines, or technical questions..."
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-sky-500 resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Recording to Database...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Technical Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
