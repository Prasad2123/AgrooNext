'use client';

import React, { useState } from 'react';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { PrimaryButton } from '../ui/PrimaryButton';
import { Send, CheckCircle2, Building, User, Info, AlertCircle } from 'lucide-react';
import { 
  InquiryFormData, 
  AudienceType, 
  ProgrammeInterest, 
  PROGRAMME_LABELS, 
  AUDIENCE_LABELS 
} from '../../types/inquiry';

export const ContactSection: React.FC = () => {
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
    await new Promise((resolve) => setTimeout(resolve, 450));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <SectionContainer id="contact" glowEffect="rose">
      <div className="space-y-12 lg:space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <SectionHeading
            centered
            badge="Admissions & Outreach"
            badgeColor="rose"
            title="Enquire About Individual or Institutional Training"
            subtitle="Whether you are an individual learner seeking practical mastery or an educational institution planning a 1-day awareness workshop, connect with our team."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Context & Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-none">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00897B] dark:text-[#4DD0E1]">
                  AgrooNext Pathways
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Tailored Training Pathways
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                  <strong className="text-slate-900 dark:text-white block font-semibold">School & College Crash Courses (1 Day)</strong>
                  <p className="text-slate-500 dark:text-slate-400">
                    Comprehensive overview covering all 5 modern disciplines for student cohorts. Proposed base: ₹250 (School) / ₹500 (College).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                  <strong className="text-slate-900 dark:text-white block font-semibold">Certificate Courses (5 Days per Topic)</strong>
                  <p className="text-slate-500 dark:text-slate-400">
                    Deep hands-on practical lab mastery for individual disciplines with capstone execution. Proposed base: ₹5,000 / topic.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
                  <strong className="text-slate-900 dark:text-white block font-semibold">Institutional Turnkey Workshops</strong>
                  <p className="text-slate-500 dark:text-slate-400">
                    On-site institutional delivery for schools (₹15,000/session) and colleges (₹25,000/session) for mutually agreed cohorts.
                  </p>
                </div>
              </div>

              {/* Policy note */}
              <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/10">
                * Note: All stated fees represent proposed planning baselines subject to venue, consumable costs, and formal agreements.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="py-8 text-center space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#00897B]/20 border border-[#00897B]/50 flex items-center justify-center mx-auto text-[#00897B] dark:text-[#4DD0E1]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                      <Info className="w-3.5 h-3.5" />
                      <span>Development Preview Mode</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                      Enquiry Form Validated
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-900 dark:text-white">{formData.fullName}</strong>. Your enquiry for{' '}
                      <strong className="text-[#00897B] dark:text-[#4DD0E1]">{PROGRAMME_LABELS[formData.programme]}</strong> has been validated in local preview.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 text-left space-y-1 max-w-md mx-auto">
                    <p className="font-semibold flex items-center gap-1.5">
                      <Info className="w-4 h-4 shrink-0" />
                      <span>Notice: Backend API Endpoint Not Connected</span>
                    </p>
                    <p className="leading-relaxed text-[11px] text-amber-700 dark:text-amber-300/90">
                      The web application is currently in the frontend module phase. A production inquiry endpoint is scheduled for the backend roadmap. This enquiry was not emailed or stored on an external database.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-[#00897B] dark:text-[#4DD0E1] hover:underline font-semibold"
                    >
                      Submit Another Training Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                        placeholder="e.g. Ananya Sharma"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#070D1E]/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] ${
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
                      <label htmlFor="contact-email" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                        Email Address <span className="text-[#C2185B]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ananya@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#070D1E]/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] ${
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
                  </div>

                  {/* Phone & Programme */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                        Mobile Phone Number <span className="text-[#C2185B]">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#070D1E]/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] ${
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

                    <div className="space-y-1.5">
                      <label htmlFor="contact-programme" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                        Programme of Interest
                      </label>
                      <select
                        id="contact-programme"
                        value={formData.programme}
                        onChange={(e) => setFormData({ ...formData, programme: e.target.value as ProgrammeInterest })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#070D1E]/80 border border-slate-300/80 dark:border-white/15 text-slate-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B]"
                      >
                        {(Object.keys(PROGRAMME_LABELS) as ProgrammeInterest[]).map((key) => (
                          <option key={key} value={key} className="bg-white dark:bg-[#070D1E] text-slate-900 dark:text-white">
                            {PROGRAMME_LABELS[key]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Organization (conditional) */}
                  {['school', 'college_university', 'institute'].includes(formData.audienceType) && (
                    <div className="space-y-1.5 animate-fade-in">
                      <label htmlFor="contact-org" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                        School / College / Organization Name <span className="text-[#C2185B]">*</span>
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                        placeholder="e.g. Pune Institute of Science & Technology"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#070D1E]/80 border text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B] ${
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
                  )}

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                      Specific Inquiries or Preferred Dates
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your goals, cohort size, or preferred training dates..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#070D1E]/80 border border-slate-300/80 dark:border-white/15 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00897B]"
                    />
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
                    <Info className="w-3.5 h-3.5 text-[#00897B] shrink-0 mt-0.5" />
                    <span>
                      Notice: Form is in preview mode pending backend API deployment. Your entry is validated client-side.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <PrimaryButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full justify-center py-3.5 mt-2"
                    icon={<Send className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Validating Enquiry...' : 'Submit Training Inquiry'}
                  </PrimaryButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
