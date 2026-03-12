import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArtisanCard from "../components/artisans/ArtisanCard";
import { searchArtisans } from "../services/artisans.service";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchResults() {
      try {
        setLoading(true);
        setError("");

        const response = await searchArtisans(initialQuery);
        setArtisans(response.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la recherche.");
      } finally {
        setLoading(false);
      }
    }

    if (!initialQuery.trim()) {
      setArtisans([]);
      setError("");
      setLoading(false);
      return;
    }

    fetchResults();
  }, [initialQuery]);

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
    <section className="py-5">
      <div className="container">
        <header className="mb-4 text-center">
          <h1>
            {initialQuery
              ? `Résultats pour "${initialQuery}"`
              : "Rechercher un artisan"}
          </h1>
        </header>

        <form className="mb-5" onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <label htmlFor="search-page-input" className="visually-hidden">
                Rechercher un artisan
              </label>

              <div className="input-group">
                <button type="submit" className="btn btn-outline-secondary">
                <i className="bi bi-search" aria-hidden="true"></i>
                </button>

                <input
                  id="search-page-input"
                  type="search"
                  className="form-control"
                  placeholder="Rechercher un artisan"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <button type="submit" className="btn btn-primary">
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        </form>

        {loading && <p>Recherche en cours...</p>}

        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && initialQuery && artisans.length === 0 && (
          <p>Aucun artisan trouvé pour cette recherche.</p>
        )}

        {!loading && !error && artisans.length > 0 && (
          <div className="row g-4">
            {artisans.map((artisan) => (
              <div key={artisan.id} className="col-12 col-md-6 col-lg-4">
                <ArtisanCard artisan={artisan} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}