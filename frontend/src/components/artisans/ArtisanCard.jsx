/**
 * Composant d'affichage d'un artisan sous forme de carte.
 * 
 * Ce composant est purement visuel : il reçoit les données
 * d'un artisan via les props et ne fait aucun appel API.
 * 
 * @param {Object} props
 * @param {Object} props.artisan - Données de l'artisan
 * @param {string} props.cardTitleLevel - Niveau du titre HTML (h2, h3, h4...)
 */

export default function ArtisanCard({ artisan, cardTitleLevel = "h3" }) {

  // Image par défaut si l'artisan n'en possède pas
  const imageUrl = artisan.image_url
    ? artisan.image_url : "/images/artisan-placeholder.jpg";
    
  // Niveau du titre HTML variable 
  const CardTitleTag = cardTitleLevel;

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
          <CardTitleTag className="card-title">
          {artisan.name}
          </CardTitleTag>

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