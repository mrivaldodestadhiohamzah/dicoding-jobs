"use client";

import { useState, type FormEvent } from "react";
import { EMPLOYMENT_TYPES, WORK_ARRANGEMENTS, type VacancyFormData } from "@/types/vacancy";

interface VacancyFormProps {
  onSubmit: (data: VacancyFormData) => Promise<void>;
  isSaving: boolean;
  fieldErrors: Record<string, string[]>;
  formError?: string;
}

const initialValues: VacancyFormData = {
  title: "",
  company: "",
  location: "",
  employment_type: "Full-time",
  work_arrangement: "",
  description: "",
};

export function VacancyForm({ onSubmit, isSaving, fieldErrors, formError }: VacancyFormProps) {
  const [values, setValues] = useState(initialValues);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  function setValue(field: keyof VacancyFormData, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setClientErrors((current) => ({ ...current, [field]: "" }));
  }

  function validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!values.title.trim()) errors.title = "Job title is required.";
    if (!values.company.trim()) errors.company = "Company name is required.";
    if (!values.location.trim()) errors.location = "Location is required.";
    if (!values.description.trim()) errors.description = "Description is required.";
    else if (values.description.trim().length < 40) errors.description = "Use at least 40 characters.";
    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setClientErrors(errors);
      return;
    }
    await onSubmit({ ...values, work_arrangement: values.work_arrangement || "" });
  }

  function errorFor(field: string) {
    return clientErrors[field] || fieldErrors[field]?.[0];
  }

  return (
    <form className="vacancy-form" onSubmit={handleSubmit} noValidate>
      {formError && <div className="form-alert" role="alert">{formError}</div>}
      <div className="form-grid">
        <div className="form-field form-field-wide">
          <label htmlFor="title">Job title <span aria-hidden="true">*</span></label>
          <input id="title" value={values.title} onChange={(event) => setValue("title", event.target.value)} aria-invalid={Boolean(errorFor("title"))} aria-describedby={errorFor("title") ? "title-error" : undefined} />
          {errorFor("title") && <p className="field-error" id="title-error">{errorFor("title")}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="company">Company <span aria-hidden="true">*</span></label>
          <input id="company" value={values.company} onChange={(event) => setValue("company", event.target.value)} aria-invalid={Boolean(errorFor("company"))} aria-describedby={errorFor("company") ? "company-error" : undefined} />
          {errorFor("company") && <p className="field-error" id="company-error">{errorFor("company")}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="location">Location <span aria-hidden="true">*</span></label>
          <input id="location" placeholder="e.g. Jakarta, Indonesia" value={values.location} onChange={(event) => setValue("location", event.target.value)} aria-invalid={Boolean(errorFor("location"))} aria-describedby={errorFor("location") ? "location-error" : undefined} />
          {errorFor("location") && <p className="field-error" id="location-error">{errorFor("location")}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="employment_type">Employment type <span aria-hidden="true">*</span></label>
          <select id="employment_type" value={values.employment_type} onChange={(event) => setValue("employment_type", event.target.value)}>
            {EMPLOYMENT_TYPES.map((type) => <option key={type}>{type}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="work_arrangement">Work arrangement</label>
          <select id="work_arrangement" value={values.work_arrangement} onChange={(event) => setValue("work_arrangement", event.target.value)}>
            <option value="">Select an option</option>
            {WORK_ARRANGEMENTS.map((arrangement) => <option key={arrangement}>{arrangement}</option>)}
          </select>
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="description">Description <span aria-hidden="true">*</span></label>
          <textarea id="description" rows={8} placeholder="Describe the role, responsibilities, and what a successful candidate will bring." value={values.description} onChange={(event) => setValue("description", event.target.value)} aria-invalid={Boolean(errorFor("description"))} aria-describedby={errorFor("description") ? "description-error" : undefined} />
          {errorFor("description") && <p className="field-error" id="description-error">{errorFor("description")}</p>}
        </div>
      </div>
      <div className="form-actions">
        <p className="required-note"><span aria-hidden="true">*</span> Required fields</p>
        <button className="button button-primary" type="submit" disabled={isSaving}>
          {isSaving ? "Publishing…" : "Publish vacancy"}
        </button>
      </div>
    </form>
  );
}
