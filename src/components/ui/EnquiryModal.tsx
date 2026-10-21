'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles, Info } from 'lucide-react';
import { useEnquiryModal } from '../../context/ModalContext';
import { 
  InquiryFormData, 
  AudienceType, 
  ProgrammeInterest, 
  PROGRAMME_LABELS, 
  AUDIENCE_LABELS 
} from '../../types/inquiry';
import { PrimaryButton } from './PrimaryButton';

export const EnquiryModal: React.FC = () => {
  const { isOpen, selectedProgramme, closeModal } = useEnquiryModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    audienceType: 'individual_learner',
    programme: 'hydroponics',
    organizationName: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState<string | null>(null);

  // Sync selected programme when opened from a specific section
  useEffect(() => {
    if (selectedProgramme && Object.keys(PROGRAMME_LABELS).includes(selectedProgramme)) {
      setFormData((prev) => ({
        ...prev,
        programme: selectedProgramme as ProgrammeInterest,
      }));
    }
  }, [selectedProgramme]);

  // Handle focus management and Escape key
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);

      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
        previouslyFocusedElement.current?.focus();
      };
    }
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide a valid email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email format (e.g. name@domain.com).';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your mobile or WhatsApp contact number.';
    } else if (!/^[0-9+\s()-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (8-15 digits).';
    }
    const isOrgRequired = ['school', 'college_university', 'institute'].includes(formData.audienceType);
    if (isOrgRequired && !formData.organizationName?.trim()) {
      newErrors.organizationName = 'Please enter your school, college, or institute name.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }

      setInquiryId(data.inquiryId);
      setIsSuccess(true);
    } catch (err: any) {
      setApiError(err.message || 'Failed to submit enquiry. Please check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setInquiryId(null);
    setApiError(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      audienceType: 'individual_learner',
      programme: 'hydroponics',
      organizationName: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/80 dark:bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white dark:bg-[#0A1428] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden my-6 transition-all"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#0F2C59]/30">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#00897B] dark:text-[#4DD0E1] tracking-wider uppercase">
              AgrooNext Admissions
            </span>
            <h2
              id="enquiry-modal-title"
              className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white"
            >
              Programme Training Enquiry
            </h2>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B]"
            aria-label="Close enquiry dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
          {isSuccess ? (
            <div className="py-6 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#00897B]/15 border border-[#00897B]/40 flex items-center justify-center mx-auto text-[#00897B] dark:text-[#4DD0E1]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                  Enquiry Registered Successfully
                </span>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Your training enquiry for{' '}
                  <strong className="text-[#00897B] dark:text-[#4DD0E1]">{PROGRAMME_LABELS[formData.programme]}</strong> has been received by our admissions team.
                </p>
              </div>

              {inquiryId && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 space-y-1 max-w-md mx-auto text-left">
                  <div className="flex justify-between">
                    <span>Inquiry Reference:</span>
                    <strong className="font-mono text-slate-900 dark:text-white">{inquiryId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-semibold text-[#00897B]">NEW • Recorded</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-white bg-[#00897B] hover:bg-[#00796B] transition-colors text-sm"
                >
                  Close Dialog
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-sm"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {apiError && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{apiError}</span>
                </div>
              )}

              {/* Audience Type Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  I am enrolling / inquiring as: <span className="text-[#C2185B]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(AUDIENCE_LABELS) as AudienceType[]).map((type) => {
                    const isSelected = formData.audienceType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, audienceType: type })}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                          isSelected
                            ? 'bg-[#00897B]/15 border-[#00897B] text-[#00897B] dark:text-[#4DD0E1] font-semibold ring-1 ring-[#00897B]'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        {AUDIENCE_LABELS[type].split('(')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-name" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Full Name <span className="text-[#C2185B]">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="modal-name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter full name"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-[#14263C] border ${
                      errors.fullName ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                    } focus:border-[#00897B] outline-none text-slate-900 dark:text-white transition-all`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-500">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-email" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Email Address <span className="text-[#C2185B]">*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-[#14263C] border ${
                      errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                    } focus:border-[#00897B] outline-none text-slate-900 dark:text-white transition-all`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-phone" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Phone / WhatsApp Number <span className="text-[#C2185B]">*</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-[#14263C] border ${
                      errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                    } focus:border-[#00897B] outline-none text-slate-900 dark:text-white transition-all`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500">{errors.phone}</p>}
                </div>

                {/* Organisation */}
                <div className="space-y-1.5">
                  <label htmlFor="modal-org" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Institution / Organization Name
                  </label>
                  <input
                    id="modal-org"
                    type="text"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    placeholder="School, College, or Farm Name"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-[#14263C] border ${
                      errors.organizationName ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                    } focus:border-[#00897B] outline-none text-slate-900 dark:text-white transition-all`}
                  />
                  {errors.organizationName && <p className="text-[11px] text-rose-500">{errors.organizationName}</p>}
                </div>
              </div>

              {/* Programme Select */}
              <div className="space-y-1.5">
                <label htmlFor="modal-programme" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                  Select Training Discipline <span className="text-[#C2185B]">*</span>
                </label>
                <select
                  id="modal-programme"
                  value={formData.programme}
                  onChange={(e) => setFormData({ ...formData, programme: e.target.value as ProgrammeInterest })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] outline-none text-slate-900 dark:text-white transition-all"
                >
                  {(Object.keys(PROGRAMME_LABELS) as ProgrammeInterest[]).map((p) => (
                    <option key={p} value={p}>
                      {PROGRAMME_LABELS[p]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="modal-message" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                  Specific Requirements or Questions (Optional)
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Expected batch timing, number of students, or any prior experience..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] outline-none text-slate-900 dark:text-white transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <PrimaryButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center py-3.5"
                  icon={<Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Submitting Enquiry...' : 'Submit Training Enquiry'}
                </PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
