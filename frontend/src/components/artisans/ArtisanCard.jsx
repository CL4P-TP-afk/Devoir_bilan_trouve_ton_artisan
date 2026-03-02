/**
 * Composant ArtisanCard
 *
 * Affiche les informations principales d’un artisan sous forme de carte.
 * Utilisé sur :
 * - page d'accueil (artisans du mois)
 * - liste d’artisans
 * - résultats de recherche
 */

export default function ArtisanCard({ artisan }) {

  // Image par défaut si l'artisan n'en possède pas
  const imageUrl = artisan.image_url
    ? artisan.image_url
    : "/images/artisan-placeholder.jpg";

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">

        {/* Image artisan */}
        <img
          src={imageUrl}
          className="card-img-top"
          alt={`Photo de ${artisan.name}`}
        />

        <div className="card-body">

          {/* Nom artisan */}
          <h5 className="card-title">
            {artisan.name}
          </h5>

          {/* Spécialité */}
          <p className="card-text">
            {artisan.specialty}
          </p>

          {/* Ville */}
          <p className="card-text text-muted">
            {artisan.city}
          </p>

          {/* Note */}
          <div>
            ⭐ {artisan.rating}
          </div>

          {/* Badge artisan du mois */}
          {artisan.is_featured && (
            <span className="badge bg-primary mt-2">
              Artisan du mois
            </span>
          )}

        </div>
      </div>
    </div>
  );
}