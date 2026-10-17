'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  FolderLock,
  UploadCloud,
  FileCheck,
  AlertCircle,
  Download,
  ShieldCheck,
  Clock,
  Trash2,
  RefreshCw,
} from 'lucide-react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [documentType, setDocumentType] = useState('STUDENT_ID_PROOF');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadDocuments = useCallback(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    fetch('/api/portal/documents', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setDocuments(data.documents || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError('Failed to load documents. Please retry.');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    return loadDocuments();
  }, [loadDocuments]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setStatusMessage({ type: 'error', text: 'Please select a file to upload.' });
      return;
    }

    setUploading(true);
    setStatusMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('documentType', documentType);

      const res = await fetch('/api/portal/documents', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed.');
      }

      setStatusMessage({
        type: 'success',
        text: 'Document securely uploaded to private storage and submitted for verification.',
      });
      setSelectedFile(null);
      // Reset input element
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      loadDocuments();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'File upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-900 dark:text-white">
          Secure Documents Vault
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Upload and manage private student identification and academic credentials
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Upload Box */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-[#00897B]" />
          <span>Upload New Document</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Files are stored in private isolated storage (never publicly indexed) with strict DPDP Act compliance.
        </p>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Document Category
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
              >
                <option value="STUDENT_ID_PROOF">Student College/School ID Card</option>
                <option value="GOVERNMENT_ID">Aadhaar / Government ID Proof</option>
                <option value="CERTIFICATE_PREREQUISITE">Prior Agriculture Certificate</option>
                <option value="INSTITUTION_MOU">Institutional Nomination Letter</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Select File (PDF, JPEG, PNG • Max 10MB)
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#00897B] file:text-white hover:file:bg-[#00796B] file:cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">
              * Note: ID proof is optional under DEC-019 and will not block course admission.
            </span>
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="py-2.5 px-5 rounded-xl font-bold text-xs text-white bg-[#00897B] hover:bg-[#00796B] transition-colors shadow-sm disabled:opacity-50"
            >
              {uploading ? 'Encrypting & Uploading...' : 'Upload to Secure Storage'}
            </button>
          </div>
        </form>
      </div>

      {/* Uploaded Documents Table */}
      <div className="bg-white dark:bg-[#0D1B2A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Uploaded Documents
        </h2>

        {error ? (
          <div className="py-12 text-center">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-rose-600 dark:text-rose-400 mb-3">{error}</p>
            <button
              onClick={loadDocuments}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00897B] text-white text-xs font-semibold hover:bg-[#007367] transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Loading
            </button>
          </div>
        ) : loading ? (
          <div className="py-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-500">
            No documents uploaded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-[#14263C]/60 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">File Name</th>
                  <th className="py-3 px-4">Document Type</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Upload Date</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {doc.fileName}
                    </td>
                    <td className="py-3 px-4">{doc.documentType.replace('_', ' ')}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {formatFileSize(doc.fileSizeBytes)}
                    </td>
                    <td className="py-3 px-4">{new Date(doc.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          doc.isVerified
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}
                      >
                        {doc.isVerified ? 'VERIFIED' : 'PENDING_REVIEW'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a
                        href={`/api/portal/documents/${doc.id}/download`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 px-2.5 rounded-lg text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] hover:bg-[#00897B]/10 transition-colors inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
