import Link from "next/link";

export function LoadingState({ label = "Loading vacancies" }: { label?: string }) {
  return (
    <div className="state-panel" role="status" aria-live="polite">
      <span className="loading-dot" aria-hidden="true" />
      <p>{label}…</p>
    </div>
  );
}

export function EmptyState({ searched }: { searched: boolean }) {
  return (
    <div className="state-panel" data-testid="empty-state">
      <span className="state-kicker">No matches</span>
      <h3>{searched ? "No vacancies match that search." : "There are no vacancies yet."}</h3>
      <p>{searched ? "Try a shorter or different job title." : "New opportunities will appear here when they are published."}</p>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="state-panel error-panel" role="alert">
      <span className="state-kicker">Connection issue</span>
      <h3>We couldn’t load the vacancies.</h3>
      <p>Check that the API is running, then try again.</p>
      <button className="button button-secondary" type="button" onClick={onRetry}>Try again</button>
    </div>
  );
}

export function NotFoundState() {
  return (
    <div className="state-panel" data-testid="not-found-state">
      <span className="state-kicker">404</span>
      <h3>That vacancy isn’t available.</h3>
      <p>It may have been removed or the link may be incomplete.</p>
      <Link className="button button-secondary" href="/">Back to vacancies</Link>
    </div>
  );
}
