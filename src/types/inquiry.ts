export type AudienceType =
  | 'school'
  | 'college_university'
  | 'institute'
  | 'individual_learner'
  | 'women_shg'
  | 'general_enquiry';

export type ProgrammeInterest =
  | 'hydroponics'
  | 'aeroponics'
  | 'mushroom_farming'
  | 'aquaculture'
  | 'women_agri_enterprise'
  | 'institutional_training'
  | 'complete_package'
  | 'general_enquiry';

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  audienceType: AudienceType;
  programme: ProgrammeInterest;
  organizationName?: string;
  message?: string;
}

export interface InquirySubmissionResult {
  success: boolean;
  isDevelopmentPreview: boolean;
  message: string;
  inquiryId?: string;
  timestamp: string;
  errors?: Record<string, string>;
}

export const PROGRAMME_LABELS: Record<ProgrammeInterest, string> = {
  hydroponics: 'Hydroponics (Soilless Cultivation)',
  aeroponics: 'Aeroponics (High-Pressure Mist)',
  mushroom_farming: 'Mushroom Farming (Edible & Commercial)',
  aquaculture: 'Aquaculture (Biofloc & Recirculating)',
  women_agri_enterprise: 'Women Empowerment & Agri-Entrepreneurship',
  institutional_training: 'Institutional Training Workshop (School / College)',
  complete_package: 'Complete 5-Topic Package (3 Weeks)',
  general_enquiry: 'General Training & Programme Enquiry',
};

export const AUDIENCE_LABELS: Record<AudienceType, string> = {
  school: 'School (Students / Teachers)',
  college_university: 'College / University',
  institute: 'Training Institute / Organization',
  individual_learner: 'Individual Learner / Farmer',
  women_shg: 'Women / SHG / Community Group',
  general_enquiry: 'General Enquiry',
};
