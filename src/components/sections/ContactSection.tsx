'use client';

import React, { useState } from 'react';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { PrimaryButton } from '../ui/PrimaryButton';
import { Send, CheckCircle2, Building, User, Info, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { 
  InquiryFormData, 
  AudienceType, 
  ProgrammeInterest, 
  PROGRAMME_LABELS, 
  AUDIENCE_LABELS 
} from '../../types/inquiry';

export const ContactSection: React.FC<{ isStandalonePage?: boolean }> = ({ isStandalonePage = false }) => {
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
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [inquiryResult, setInquiryResult] = useState<{ id?: string; timestamp?: string }>({});

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

      setInquiryResult({ id: data.inquiryId, timestamp: data.timestamp });
      setSubmitted(true);
    } catch (err: any) {
      setApiError(err.message || 'Network error occurred. Please check your connection and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ContainerComponent = isStandalonePage ? 'div' : SectionContainer;
  const containerProps = isStandalonePage
    ? { className: 'space-y-12' }
    : { id: 'contact', glowEffect: 'rose' as const };

  return (
    <ContainerComponent {...(containerProps as any)}>
      <div className="space-y-12 lg:space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <SectionHeading
            centered
            badge="Admissions & Outreach"
            badgeColor="rose"
            title={
              <>
                Enquire About Individual or{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B5E20] via-[#00897B] to-[#00ACC1]">
                  Institutional Training
                </span>
              </>
            }
            subtitle="Whether you are an individual learner seeking practical mastery or an educational institution planning a 1-day awareness workshop, connect with our admissions desk."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Context & Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-none bg-white dark:bg-[#0A1428]">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00897B] dark:text-[#4DD0E1]">
                  AgrooNext Admissions
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Tailored Training Pathways
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    School & College Crash Courses (1 Day)
                  </strong>
                  <p className="text-slate-500 dark:text-slate-400">
                    Comprehensive overview covering all 5 modern disciplines. Approved base: ₹250 (School) / ₹500 (College) per student.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    Certificate Courses (5 Days per Topic)
                  </strong>
                  <p className="text-slate-500 dark:text-slate-400">
                    Deep hands-on practical lab mastery for individual disciplines with capstone execution. Approved base: ₹5,000 / participant.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                  <strong className="text-slate-900 dark:text-white block font-semibold">
                    Institutional Turnkey Workshops
                  </strong>
                  <p className="text-slate-500 dark:text-slate-400">
                    On-site institutional delivery for schools (₹15,000/session) and colleges (₹25,000/session) for mutually agreed cohorts.
                  </p>
                </div>
              </div>

              {/* Location details */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                  <MapPin className="w-4 h-4 text-[#00897B]" />
                  <span>Demonstration Facility Location</span>
                </div>
                <p>
                  AgrooNext Demonstration Facility, Pune District, Maharashtra. (Exact facility address and batch directions confirmed upon enrollment).
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-2xl relative bg-white dark:bg-[#0A1428]">
              {submitted ? (
                <div className="py-8 text-center space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#00897B]/20 border border-[#00897B]/50 flex items-center justify-center mx-auto text-[#00897B] dark:text-[#4DD0E1]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                      Enquiry Registered Successfully
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                      Thank You, {formData.fullName}!
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      Your enquiry for{' '}
                      <strong className="text-[#00897B] dark:text-[#4DD0E1]">{PROGRAMME_LABELS[formData.programme]}</strong> has been received by the AgrooNext admissions team.
                    </p>
                  </div>

                  {inquiryResult.id && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 space-y-1 max-w-md mx-auto text-left">
                      <div className="flex justify-between">
                        <span>Reference ID:</span>
                        <strong className="font-mono text-slate-900 dark:text-white">{inquiryResult.id}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-semibold text-[#00897B]">NEW • In Review</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          audienceType: 'individual_learner',
                          programme: 'hydroponics',
                          organizationName: '',
                          message: '',
                        });
                      }}
                      className="text-xs text-[#00897B] dark:text-[#4DD0E1] hover:underline font-semibold"
                    >
                      Submit Another Training Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {apiError && (
                    <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  {/* Inquiry Category Selector */}
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
                            className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                              isSelected
                                ? 'bg-[#00897B]/15 border-[#00897B] text-[#00897B] dark:text-[#4DD0E1] font-semibold'
                                : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                            }`}
                          >
                            {AUDIENCE_LABELS[type].split('(')[0]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                        Full Name <span className="text-[#C2185B]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Patil"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-[#14263C] border ${
                          errors.fullName ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                        } focus:border-[#00897B] outline-none text-slate-900 dark:text-white transition-all`}
                      />
                      {errors.fullName && <p className="text-[11px] text-rose-500">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                        Email Address <span className="text-[#C2185B]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ramesh@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-[#14263C] border ${
                          errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                        } focus:border-[#00897B] outline-none text-slate-900 dark:text-white transition-all`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-500">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone & Organisation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                        Phone / WhatsApp <span className="text-[#C2185B]">*</span>
                      </label>
                      <input
                        id="contact-phone"
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

                    <div className="space-y-1.5">
                      <label htmlFor="contact-org" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                        Institution / Organization Name
                      </label>
                      <input
                        id="contact-org"
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

                  {/* Programme Interest Selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-programme" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                      Discipline of Interest <span className="text-[#C2185B]">*</span>
                    </label>
                    <select
                      id="contact-programme"
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

                  {/* Message / Requirements */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                      Specific Questions or Requirements
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention expected batch month, student cohort count, or questions..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-[#14263C] border border-slate-200 dark:border-white/10 focus:border-[#00897B] outline-none text-slate-900 dark:text-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#00897B] to-[#00695C] hover:from-[#00796B] hover:to-[#004D40] shadow-md shadow-[#00897B]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Training Enquiry</span>
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
    </ContainerComponent>
  );
};
