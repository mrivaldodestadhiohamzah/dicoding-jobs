import type { Vacancy } from "@/types/vacancy";
import { EmptyState, ErrorState, LoadingState } from "./StatusStates";
import { JobCard } from "./JobCard";

interface JobListProps {
  vacancies: Vacancy[] | undefined;
  isLoading: boolean;
  isError: boolean;
  searched: boolean;
  onRetry: () => void;
}

export function JobList({ vacancies, isLoading, isError, searched, onRetry }: JobListProps) {
  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={onRetry} />;
  if (!vacancies?.length) return <EmptyState searched={searched} />;

  return (
    <div className="job-list" data-testid="job-list">
      {vacancies.map((vacancy) => <JobCard key={vacancy.id} vacancy={vacancy} />)}
    </div>
  );
}
