import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Dicoding Jobs home">
          <span className="brand-mark" aria-hidden="true">D</span>
          <span>dicoding jobs</span>
        </Link>
        <nav className="primary-nav" aria-label="Primary navigation">
          <Link href="/">Find work</Link>
          <Link className="header-action" href="/vacancies/new">Post a vacancy <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
