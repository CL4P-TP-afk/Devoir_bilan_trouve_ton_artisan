import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtisanCard from "../components/artisans/ArtisanCard.jsx";
import { getArtisansByCategoryId } from "../services/categoryService.js";
import SearchForm from "../components/search/SearchForm";

export default function Category() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        setLoading(true);
        setError("");

        const data = await getArtisansByCategoryId(id);

        setCategory(data.category);
        setArtisans(data.artisans);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement de la catégorie.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryData();
  }, [id]);

  if (loading) {
    return (
      <section className="py-5">
        <div className="container">
          <p>Chargement de la catégorie...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5">
        <div className="container">
          <h1>Catégorie</h1>
          <p className="text-danger mb-0">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <header className="text-center mb-5">
          <h1 className="mb-4">
            Artisans <span className="category-name">{category?.name}</span>
          </h1>
          <p className="text-muted mb-0">
            {artisans.length} artisan{artisans.length > 1 ? "s" : ""} trouvé{artisans.length > 1 ? "s" : ""}
          </p>
        </header>

        <div className="mb-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <SearchForm showButton />
            </div>
          </div>
        </div>

        {artisans.length === 0 ? (
          <p>Aucun artisan trouvé dans cette catégorie.</p>
        ) : (
          <div className="row g-4">
            {artisans.map((artisan) => (
              <div key={artisan.id} className="col-12 col-md-6 col-lg-4">
                <ArtisanCard artisan={artisan} cardTitleLevel="h2" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}