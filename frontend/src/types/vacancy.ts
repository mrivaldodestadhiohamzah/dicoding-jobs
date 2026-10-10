export const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;
export const WORK_ARRANGEMENTS = ["On-site", "Hybrid", "Remote"] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];
export type WorkArrangement = (typeof WORK_ARRANGEMENTS)[number];

export interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  employment_type: EmploymentType;
  work_arrangement: WorkArrangement | null;
  description: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface VacancyListResponse {
  data: Vacancy[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface VacancyFormData {
  title: string;
  company: string;
  location: string;
  employment_type: EmploymentType;
  work_arrangement: WorkArrangement | "";
  description: string;
}

export type ValidationErrors = Record<string, string[]>;
