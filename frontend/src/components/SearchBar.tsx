interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-wrap">
      <label className="sr-only" htmlFor="vacancy-search">Search by job title</label>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        id="vacancy-search"
        className="search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by job title"
        autoComplete="off"
      />
      {value && (
        <button className="clear-search" type="button" onClick={() => onChange("")} aria-label="Clear search">
          ×
        </button>
      )}
    </div>
  );
}
