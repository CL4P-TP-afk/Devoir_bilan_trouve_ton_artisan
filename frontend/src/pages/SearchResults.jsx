import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ArtisanCard from "../components/artisans/ArtisanCard";
import { searchArtisans } from "../services/artisans.service";
import SearchForm from "../components/search/SearchForm";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

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

        <div className="mb-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <SearchForm initialValue={initialQuery} showButton />
            </div>
          </div>
        </div>

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