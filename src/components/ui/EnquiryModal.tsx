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

      // Focus first input after modal enters DOM
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 60);

      // Prevent background scrolling
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
        document.body.style.overflow = '';
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
      newErrors.email = 'Please enter a valid email address format.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your mobile or WhatsApp number.';
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
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate local validation & preparation delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
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
        <div className="relative px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-[#070D1E]/70 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00897B]" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#00897B] dark:text-[#4DD0E1]">
                AgrooNext Admissions & Training
              </span>
            </div>
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Development Preview • Local Validation Passed</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Enquiry Form Validated
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900 dark:text-white">{formData.fullName}</strong>. Your training enquiry for{' '}
                  <strong className="text-[#00897B] dark:text-[#4DD0E1]">{PROGRAMME_LABELS[formData.programme]}</strong> has been validated.
                </p>
              </div>

              {/* Honest Development-Ready Status Notice */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 text-left space-y-1.5 max-w-lg mx-auto">
                <p className="font-semibold flex items-center gap-1.5">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>Notice: Backend API Endpoint Not Connected</span>
                </p>
                <p className="leading-relaxed text-[11px] text-amber-700 dark:text-amber-300/90">
                  This web application is currently in the frontend module stage. A production enquiry endpoint or mailer service is not yet connected in this baseline. This submission was validated locally; personal data was not transmitted or stored on an external server.
                </p>
              </div>

              {/* Submitted Data Summary */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 text-left space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-1">
                  <span>Contact Email:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{formData.email}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-1">
                  <span>Mobile / WhatsApp:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{formData.phone}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-1">
                  <span>Enquiry Category:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{AUDIENCE_LABELS[formData.audienceType]}</strong>
                </div>
                {formData.organizationName && (
                  <div className="flex justify-between">
                    <span>Organization:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{formData.organizationName}</strong>
                  </div>
                )}
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <PrimaryButton onClick={closeModal} className="w-full sm:w-auto px-6 py-2.5">
                  Close Window
                </PrimaryButton>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-[#00897B] dark:text-[#4DD0E1] hover:underline font-semibold p-2"
                >
                  Test Another Submission
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Audience Type Radio Pills */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  I am inquiring as:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(AUDIENCE_LABELS) as AudienceType[]).map((type) => {
                    const isSelected = formData.audienceType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, audienceType: type })}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                          isSelected
                            ? 'bg-[#00897B]/15 border-[#00897B] text-[#00897B] dark:text-[#4DD0E1] font-semibold'
                            : 'bg-slate-100/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                        }`}
                      >
                        {AUDIENCE_LABELS[type].split('(')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Name & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="e.g. Priya Patil"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070D1E]/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] ${
                      errors.fullName ? 'border-[#C2185B]' : 'border-slate-300/80 dark:border-white/15'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-[#C2185B] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-org" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Organization / School {['school', 'college_university', 'institute'].includes(formData.audienceType) && <span className="text-[#C2185B]">*</span>}
                  </label>
                  <input
                    id="modal-org"
                    type="text"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    placeholder="e.g. Pune Agricultural Institute"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070D1E]/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] ${
                      errors.organizationName ? 'border-[#C2185B]' : 'border-slate-300/80 dark:border-white/15'
                    }`}
                  />
                  {errors.organizationName && (
                    <p className="text-[11px] text-[#C2185B] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.organizationName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="modal-email" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Email Address <span className="text-[#C2185B]">*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priya@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070D1E]/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] ${
                      errors.email ? 'border-[#C2185B]' : 'border-slate-300/80 dark:border-white/15'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#C2185B] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-phone" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Mobile / WhatsApp <span className="text-[#C2185B]">*</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070D1E]/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] ${
                      errors.phone ? 'border-[#C2185B]' : 'border-slate-300/80 dark:border-white/15'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-[#C2185B] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Programme Selection */}
              <div className="space-y-1.5">
                <label htmlFor="modal-programme" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                  Programme of Interest
                </label>
                <select
                  id="modal-programme"
                  value={formData.programme}
                  onChange={(e) => setFormData({ ...formData, programme: e.target.value as ProgrammeInterest })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070D1E]/80 border border-slate-300/80 dark:border-white/15 text-slate-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B]"
                >
                  {(Object.keys(PROGRAMME_LABELS) as ProgrammeInterest[]).map((key) => (
                    <option key={key} value={key} className="bg-white dark:bg-[#070D1E] text-slate-900 dark:text-white">
                      {PROGRAMME_LABELS[key]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="modal-message" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                  Message or Training Requirements
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your learning goals, cohort size, or preferred scheduling..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070D1E]/80 border border-slate-300/80 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B]"
                />
              </div>

              {/* Development Status Disclaimer */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
                <Info className="w-3.5 h-3.5 text-[#00897B] shrink-0 mt-0.5" />
                <span>
                  Notice: Inquiries are captured in development preview mode. A dedicated backend API endpoint will be connected in the backend milestone.
                </span>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <PrimaryButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto justify-center"
                  icon={<Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Validating Enquiry...' : 'Submit Training Enquiry'}
                </PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
