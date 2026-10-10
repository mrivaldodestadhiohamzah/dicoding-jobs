interface CompanyMarkProps {
  large?: boolean;
}

export function CompanyMark({ large = false }: CompanyMarkProps) {
  return (
    <span className={`company-mark${large ? " large" : ""}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}
