'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  Building,
  QrCode,
  FileCheck,
  Printer,
  X,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Offline submission form
  const [selectedAppId, setSelectedAppId] = useState('');
  const [offlineMethod, setOfflineMethod] = useState<'OFFLINE_NEFT_RTGS' | 'OFFLINE_UPI_QR' | 'OFFLINE_CASH'>('OFFLINE_UPI_QR');
  const [transactionRef, setTransactionRef] = useState('');
  const [offlineSubmitting, setOfflineSubmitting] = useState(false);
  const [offlineMessage, setOfflineMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sandbox online payment trigger
  const [sandboxPaying, setSandboxPaying] = useState(false);

  // Receipt Modal
  const [activeReceipt, setActiveReceipt] = useState<any | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    Promise.all([
      fetch('/api/portal/payments', { signal: controller.signal }),
      fetch('/api/portal/applications', { signal: controller.signal }),
    ])
      .then(async ([payRes, appRes]) => {
        if (!payRes.ok && payRes.status !== 404) throw new Error('Failed to load payments');
        const payData = payRes.ok ? await payRes.json() : { payments: [] };
        const appData = appRes.ok ? await appRes.json() : { applications: [] };

        setPayments(payData.payments || []);
        const payableApps = (appData.applications || []).filter((a: any) =>
          ['APPROVED', 'PAYMENT_PENDING'].includes(a.currentStatus)
        );
        setApplications(payableApps);
        if (payableApps.length > 0) {
          setSelectedAppId((prev) => (prev ? prev : payableApps[0].id));
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load payments data. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    return loadData();
  }, [loadData]);

  const handleSandboxPayment = async (appId: string) => {
    setSandboxPaying(true);
    setOfflineMessage(null);
    try {
      const selectedApp = applications.find((a) => a.id === appId);
      const fee = selectedApp?.calculatedFeeInr || 0;

      const res = await fetch('/api/portal/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: appId,
          amountInr: fee,
          paymentMethod: 'ONLINE_GATEWAY',
          transactionReference: `SANDBOX_TXN_${Date.now()}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      setOfflineMessage({
        type: 'success',
        text: `Sandbox payment successful! Receipt ${data.payment.receiptNumber} generated. You are now officially enrolled!`,
      });
      loadData();
    } catch (err: any) {
      setOfflineMessage({ type: 'error', text: err.message || 'Payment simulation failed.' });
    } finally {
      setSandboxPaying(false);
    }
  };

  const handleOfflineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOfflineSubmitting(true);
    setOfflineMessage(null);

    try {
      const selectedApp = applications.find((a) => a.id === selectedAppId);
      if (!selectedApp) throw new Error('Please select an approved application.');

      const res = await fetch('/api/portal/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: selectedAppId,
          amountInr: selectedApp.calculatedFeeInr,
          paymentMethod: offlineMethod,
          transactionReference: transactionRef,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit offline payment reference.');
      }

      setOfflineMessage({
        type: 'success',
        text: `Offline payment reference submitted successfully (${data.payment.receiptNumber}). It is pending review by an AgrooNext administrator.`,
      });
      setTransactionRef('');
      loadData();
    } catch (err: any) {
      setOfflineMessage({ type: 'error', text: err.message || 'Failed to record payment.' });
    } finally {
      setOfflineSubmitting(false);
    }
  };

  const selectedAppObj = applications.find((a) => a.id === selectedAppId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
          Payments & Official Receipts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage course tuition fees, submit bank transfer references, and view verified receipts
        </p>
      </div>

      {/* Message Banner */}
      {offlineMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
            offlineMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300'
          }`}
        >
          {offlineMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <span>{offlineMessage.text}</span>
        </div>
      )}

      {/* Pending Course Fee Section (if any application needs payment) */}
      {applications.length > 0 && (
        <div className="bg-white dark:bg-[#0D1B2A] border border-amber-200 dark:border-amber-900/60 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Action Required • Course Fee Pending
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                {selectedAppObj?.batch?.course?.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Application #{selectedAppObj?.applicationNumber} • Batch {selectedAppObj?.batch?.batchCode}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Due</span>
              <span className="text-2xl font-extrabold text-[#00897B] dark:text-[#4DD0E1]">
                ₹{selectedAppObj?.calculatedFeeInr.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {/* Option 1: Online Payment Gateway (Sandbox Mode DEC-015) */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#14263C]/60 border border-slate-200/80 dark:border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-[#00897B]" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Online Payment Gateway
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    SANDBOX
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Under <code>DEC-015</code>, live gateway credentials are pending KYC approval. In this development sandbox, you can simulate an instant test transaction to verify enrollment and receipt generation.
                </p>
              </div>

              <button
                type="button"
                disabled={sandboxPaying}
                onClick={() => handleSandboxPayment(selectedAppObj?.id)}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#00897B] hover:bg-[#00796B] transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sandboxPaying ? 'Processing Sandbox Order...' : `Pay ₹${selectedAppObj?.calculatedFeeInr} (Sandbox Simulation)`}
              </button>
            </div>

            {/* Option 2: Offline Bank Transfer (NEFT/UPI UTR) */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#14263C]/60 border border-slate-200/80 dark:border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-5 h-5 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Bank Transfer / Direct UPI
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Transfer to our Pune Training Facility account and submit your 12-digit UTR or reference number:
              </p>

              <div className="p-3 rounded-xl bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-400 space-y-1 mb-4 font-mono">
                <div>Account: AgrooNext Training & Innovations</div>
                <div>Account No: 987654321098</div>
                <div>IFSC: HDFC0001234 (Pune Branch)</div>
                <div>UPI ID: agroonext@hdfcbank</div>
              </div>

              <form onSubmit={handleOfflineSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={offlineMethod}
                    onChange={(e: any) => setOfflineMethod(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  >
                    <option value="OFFLINE_UPI_QR">UPI Transfer</option>
                    <option value="OFFLINE_NEFT_RTGS">NEFT / RTGS</option>
                    <option value="OFFLINE_CASH">Cash at Facility</option>
                  </select>

                  <input
                    type="text"
                    required
                    placeholder="Enter UTR / Ref Number"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={offlineSubmitting || !transactionRef}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-900 dark:text-white bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 transition-colors disabled:opacity-50"
                >
                  {offlineSubmitting ? 'Recording...' : 'Submit Offline Reference for Verification'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Receipts & Transaction History Table */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Payment Transactions & Receipts
        </h2>

        {error ? (
          <div className="py-12 text-center">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-3">{error}</p>
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00897B] text-white text-xs font-semibold hover:bg-[#007367] transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Loading
            </button>
          </div>
        ) : loading ? (
          <div className="py-6 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-500">
            No payments recorded yet. Confirmed receipts will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#14263C]/60 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Receipt Number</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#00897B] dark:text-[#4DD0E1]">
                      {p.receiptNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {p.application?.batch?.course?.title || 'Training Course'}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      ₹{p.amountInr.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      {p.paymentMethod.replace('OFFLINE_', '').replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {p.transactionReference || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.paymentStatus === 'CONFIRMED'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}
                      >
                        {p.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {p.paymentStatus === 'CONFIRMED' ? (
                        <button
                          onClick={() => setActiveReceipt(p)}
                          className="py-1 px-2.5 rounded-lg text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] hover:bg-[#00897B]/10 transition-colors inline-flex items-center gap-1"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>View Receipt</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Awaiting Admin Verification</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Official Receipt Printable Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setActiveReceipt(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Receipt Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 p-0.5 border border-slate-200 flex items-center justify-center shrink-0">
                  <Image
                    src="/logo.png"
                    alt="AgrooNext Official Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold font-display text-lg tracking-tight">AgrooNext</h3>
                  <p className="text-[10px] font-bold text-[#00897B] tracking-wider uppercase">
                    AGRO-TECH & TRAINING • PUNE
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  OFFICIAL RECEIPT
                </span>
                <span className="font-mono font-bold text-sm text-[#00897B]">
                  {activeReceipt.receiptNumber}
                </span>
              </div>
            </div>

            {/* Receipt Body */}
            <div className="py-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Issued To:</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {activeReceipt.application?.user?.profile?.fullName || 'Enrolled Learner'}
                  </span>
                  <span className="text-slate-500 block text-[11px]">
                    {activeReceipt.application?.user?.email}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Date of Payment:</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(activeReceipt.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Course / Programme:</span>
                  <span className="font-bold text-slate-900">
                    {activeReceipt.application?.batch?.course?.title}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Course Code:</span>
                  <span className="font-mono">{activeReceipt.application?.batch?.course?.courseCode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Payment Method:</span>
                  <span>{activeReceipt.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Transaction Reference:</span>
                  <span className="font-mono text-[11px]">{activeReceipt.transactionReference}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-900">Amount Paid:</span>
                  <span className="font-extrabold text-base text-[#00897B]">
                    ₹{activeReceipt.amountInr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  <strong>Confirmed & Reconciled:</strong> This receipt certifies valid fee clearance and active enrollment.
                </span>
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed">
                * Note (DEC-023): Tax treatment inclusive or exempt pending formal chartered accountant ruling. AgrooNext — Empower • Educate • Elevate.
              </p>
            </div>

            {/* Receipt Footer Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2 px-4 rounded-xl text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveReceipt(null)}
                className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-[#00897B] hover:bg-[#00796B]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
