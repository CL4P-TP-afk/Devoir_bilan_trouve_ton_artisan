import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm({
  initialValue = "",
  placeholder = "Rechercher un artisan",
  showButton = false,
}) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      navigate("/recherche");
      return;
    }

    navigate(`/recherche?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <label htmlFor="search-form-input" className="visually-hidden">
        Rechercher un artisan
      </label>

      <div className="input-group">
        <button type="submit" className="btn btn-outline-secondary">
          <i className="bi bi-search" aria-hidden="true"></i>
        </button>

        <input
          id="search-form-input"
          type="search"
          className="form-control"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {showButton && (
          <button type="submit" className="btn btn-primary">
            Rechercher
          </button>
        )}
      </div>
    </form>
  );
}