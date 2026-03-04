import ArtisanCard from "../artisans/ArtisanCard";

export default function FeaturedArtisansSection({ artisans, loading, error }) {
  return (
    <section className="featured-section mb-5">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="featured-title h4 mb-2">Artisans du mois</h2>
          <p className="featured-subtitle mb-0">
            Découvrez les artisans mis en avant ce mois-ci.
          </p>
        </div>

        {loading && <p className="text-center">Chargement...</p>}

        {!loading && error && (
          <p className="text-center text-danger">Erreur : {error}</p>
        )}

        {!loading && !error && artisans.length === 0 && (
          <p className="text-center text-muted">
            Aucun artisan mis en avant pour le moment.
          </p>
        )}

        {!loading && !error && artisans.length > 0 && (
          <div className="row g-4">
            {artisans.map((artisan) => (
              <div className="col-12 col-md-6 col-lg-4" key={artisan.id}>
                <ArtisanCard artisan={artisan} cardTitleLevel="h3" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}