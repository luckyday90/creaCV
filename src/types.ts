
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

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  isbn: string;
  url: string;
  description: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface BottomImage {
  url: string;
}

export interface DocumentFile {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  cvData: CVData;
  template: TemplateId;
  bottomImage?: BottomImage;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  publications: Publication[];
  customSections: CustomSection[];
  skills: string[];
  projects: { id: string; name: string; description: string; link: string }[];
  languages: { name: string; level: string }[];
  certifications: { id: string; name: string; issuer: string; date: string }[];
  interests: string[];
}

export type TemplateId = 'modern' | 'classic' | 'minimalist' | 'creative' | 'zenone' | 'technical';
