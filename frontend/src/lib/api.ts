import type {
  ValidationErrors,
  Vacancy,
  VacancyFormData,
  VacancyListResponse,
} from "@/types/vacancy";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api").replace(/\/$/, "");

export class ApiError extends Error {
  readonly status: number;
  readonly fieldErrors: ValidationErrors;

  constructor(message: string, status: number, fieldErrors: ValidationErrors = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const payload = (await response.json().catch(() => ({}))) as {
    message?: string;
    errors?: ValidationErrors;
  };

  if (!response.ok) {
    throw new ApiError(
      payload.message ?? "Something went wrong. Please try again.",
      response.status,
      payload.errors,
    );
  }

  return payload as T;
}

export function getVacancies(search = ""): Promise<VacancyListResponse> {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return request<VacancyListResponse>(`/vacancies${query}`);
}

export function getVacancy(id: string): Promise<{ data: Vacancy }> {
  return request<{ data: Vacancy }>(`/vacancies/${encodeURIComponent(id)}`);
}

export function createVacancy(data: VacancyFormData): Promise<{ data: Vacancy }> {
  return request<{ data: Vacancy }>("/vacancies", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
