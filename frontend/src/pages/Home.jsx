import { useEffect, useState } from "react";
import ArtisanCard from "../components/artisans/ArtisanCard";
import { getFeaturedArtisans } from "../services/artisans.service";

export default function Home() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getFeaturedArtisans();
        setArtisans(data);
      } catch (err) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <>
      <h1 className="mb-4">Trouve ton artisan</h1>

      <section className="mb-5">
        <h2 className="h4 mb-3">Artisans du mois</h2>

        {loading && <p>Chargement...</p>}
        {error && <p className="text-danger">Erreur : {error}</p>}

        {!loading && !error && (
          <div className="row">
            {artisans.map((artisan) => (
              <div className="col-12 col-md-4 mb-4" key={artisan.id}>
                <ArtisanCard artisan={artisan} cardTitleLevel="h3" />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}