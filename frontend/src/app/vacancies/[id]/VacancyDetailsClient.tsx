"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ApiError, getVacancy } from "@/lib/api";
import { LoadingState, NotFoundState } from "@/components/StatusStates";
import { CompanyMark } from "@/components/CompanyMark";

export default function VacancyDetailsClient({ id }: { id: string }) {
  const vacancyQuery = useQuery({
    queryKey: ["vacancy", id],
    queryFn: () => getVacancy(id),
  });

  if (vacancyQuery.isLoading) {
    return <main className="content-shell detail-shell"><LoadingState label="Loading vacancy" /></main>;
  }

  if (vacancyQuery.isError) {
    if (vacancyQuery.error instanceof ApiError && vacancyQuery.error.status === 404) {
      return <main className="content-shell detail-shell"><NotFoundState /></main>;
    }
    return (
      <main className="content-shell detail-shell">
        <div className="state-panel error-panel" role="alert">
          <span className="state-kicker">Connection issue</span>
          <h3>We couldn’t load this vacancy.</h3>
          <p>Check that the API is running, then try again.</p>
          <button className="button button-secondary" type="button" onClick={() => void vacancyQuery.refetch()}>Try again</button>
        </div>
      </main>
    );
  }

  const vacancy = vacancyQuery.data?.data;
  if (!vacancy) return null;

  return (
    <main className="content-shell detail-shell">
      <Link className="back-link" href="/">← Back to vacancies</Link>
      <article className="detail-card" data-testid="vacancy-details">
        <div className="detail-header">
          <div>
            <p className="eyebrow">{vacancy.company}</p>
            <h1>{vacancy.title}</h1>
          </div>
          <CompanyMark large />
        </div>
        <div className="detail-meta" aria-label="Vacancy information">
          <div><span>Location</span><strong>{vacancy.location}</strong></div>
          <div><span>Employment</span><strong>{vacancy.employment_type}</strong></div>
          {vacancy.work_arrangement && <div><span>Arrangement</span><strong>{vacancy.work_arrangement}</strong></div>}
        </div>
        <div className="detail-body">
          <p className="eyebrow">THE ROLE</p>
          <div className="description-copy">{vacancy.description.split(/\n+/).map((paragraph, index) => <p key={`${vacancy.id}-${index}`}>{paragraph}</p>)}</div>
        </div>
        <div className="detail-footer">
          <p>Questions about this role? Follow up with the employer through its usual hiring channel.</p>
          <Link className="button button-primary" href="/">Browse more roles</Link>
        </div>
      </article>
    </main>
  );
}
