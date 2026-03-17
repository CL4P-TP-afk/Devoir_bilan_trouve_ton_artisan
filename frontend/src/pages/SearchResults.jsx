import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ArtisanCard from "../components/artisans/ArtisanCard";
import { searchArtisans } from "../services/artisans.service";
import SearchForm from "../components/search/SearchForm";

/**
 * Page affichant les résultats d'une recherche d'artisans.
 *
 * Fonctionnement :
 * - récupère la query `q` dans l'URL
 * - appelle l'API backend pour récupérer les artisans correspondants
 * - affiche les résultats sous forme de cartes
 *
 * États gérés :
 * - chargement
 * - erreur
 * - aucun résultat
 */
export default function SearchResults() {

  /**
   * Lecture du paramètre de recherche dans l'URL
   * Exemple : /recherche?q=boulanger
   */
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  /**
   * États du composant
   */
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Chargement des résultats à chaque changement de query
   */
  useEffect(() => {
    async function fetchResults() {
      try {
        setLoading(true);
        setError("");

        const response = await searchArtisans(initialQuery);

        /**
         * Le backend renvoie :
         * {
         *   page,
         *   limit,
         *   results,
         *   data: [...]
         * }
         */
        setArtisans(response.data);

      } catch (err) {
        console.error(err);
        setError("Erreur lors de la recherche.");
      } finally {
        setLoading(false);
      }
    }

    /**
     * Si la recherche est vide :
     * on n'appelle pas l'API.
     */
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

        {/* Titre de la page */}
        <header className="mb-4 text-center">

          <h1>
            {initialQuery
              ? `Résultats pour "${initialQuery}"`
              : "Rechercher un artisan"}
          </h1>

          {/* Nombre de résultats trouvés */}
          {!loading && !error && initialQuery && (
            <p className="text-muted mb-0">
              {artisans.length} artisan{artisans.length > 1 ? "s" : ""} trouvé{artisans.length > 1 ? "s" : ""}
            </p>
          )}

        </header>


        {/* Barre de recherche */}
        <div className="mb-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <SearchForm initialValue={initialQuery} showButton />
            </div>
          </div>
        </div>


        {/* Etat chargement */}
        {loading && (
          <p className="text-center">
            Recherche en cours...
          </p>
        )}


        {/* Etat erreur */}
        {error && (
          <p className="text-danger text-center">
            {error}
          </p>
        )}


        {/* Aucun résultat */}
        {!loading && !error && initialQuery && artisans.length === 0 && (
          <p className="text-center">
            Aucun artisan trouvé pour cette recherche.
          </p>
        )}


        {/* Résultats */}
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