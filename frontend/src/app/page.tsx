"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVacancies } from "@/lib/api";
import { SearchBar } from "@/components/SearchBar";
import { JobList } from "@/components/JobList";

export default function Home() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  const vacanciesQuery = useQuery({
    queryKey: ["vacancies", debouncedSearch],
    queryFn: () => getVacancies(debouncedSearch),
  });

  return (
    <main>
      <section className="hero-shell">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">DICODING JOBS / OPEN ROLES</p>
            <h1>Find your next role.</h1>
            <p className="hero-description">Explore open positions and search by job title.</p>
          </div>
        </div>
      </section>

      <section className="content-shell" aria-labelledby="vacancy-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OPEN POSITIONS</p>
            <h2 id="vacancy-heading">Open positions</h2>
          </div>
          {!vacanciesQuery.isLoading && !vacanciesQuery.isError && (
            <p className="result-count" role="status">{vacanciesQuery.data?.meta.total ?? 0} {vacanciesQuery.data?.meta.total === 1 ? "role" : "roles"}</p>
          )}
        </div>
        <SearchBar value={search} onChange={setSearch} />
        <JobList
          vacancies={vacanciesQuery.data?.data}
          isLoading={vacanciesQuery.isLoading}
          isError={vacanciesQuery.isError}
          searched={Boolean(debouncedSearch)}
          onRetry={() => void vacanciesQuery.refetch()}
        />
      </section>

      <section className="employer-band" aria-label="For employers">
        <div>
          <p className="eyebrow">FOR EMPLOYERS</p>
          <h2>Hiring for your next role?</h2>
        </div>
        <Link className="button button-light" href="/vacancies/new">Post a vacancy <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
