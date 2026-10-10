import Link from "next/link";
import type { Vacancy } from "@/types/vacancy";
import { CompanyMark } from "@/components/CompanyMark";

function formatDescription(description: string): string {
  return description.length > 150 ? `${description.slice(0, 150).trimEnd()}…` : description;
}

export function JobCard({ vacancy }: { vacancy: Vacancy }) {
  return (
    <article className="job-card" data-testid="job-card">
      <div className="job-card-topline">
        <CompanyMark />
        <span className="job-company">{vacancy.company}</span>
      </div>
      <div className="job-card-content">
        <h3><Link href={`/vacancies/${vacancy.id}`}>{vacancy.title}</Link></h3>
        <div className="job-meta">
          <span>{vacancy.location}</span>
          <span>{vacancy.employment_type}</span>
          {vacancy.work_arrangement && <span>{vacancy.work_arrangement}</span>}
        </div>
        <p>{formatDescription(vacancy.description)}</p>
      </div>
      <Link className="text-link" href={`/vacancies/${vacancy.id}`} aria-label={`View ${vacancy.title} at ${vacancy.company}`}>
        View vacancy <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
