
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  jobTitle: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
  projects: { id: string; name: string; description: string; link: string }[];
  languages: { name: string; level: string }[];
  certifications: { id: string; name: string; issuer: string; date: string }[];
  interests: string[];
}

export type TemplateId = 'modern' | 'classic' | 'minimalist' | 'creative';
