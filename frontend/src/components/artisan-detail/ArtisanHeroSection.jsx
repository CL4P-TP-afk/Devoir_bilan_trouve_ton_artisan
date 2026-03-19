import artisanPlaceholder from "../../assets/artisan-placeholder.png";

/**
 * Section Hero de la fiche artisan.
 *
 * Affiche :
 * - l'image de l'artisan
 * - son nom
 * - sa spécialité
 * - sa ville
 * - sa note
 */
export default function ArtisanHeroSection({ artisan }) {

  /**
   * Image fallback utilisée si aucun visuel n'est fourni par l'API.
   */
  const imageUrl = artisan.image_url || artisanPlaceholder;

  const rating = Number(artisan.rating) || 0;
  const ratingPercent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div className="container">
      <div className="row align-items-center artisan-detail__hero">

        <div className="col-md-6">
          <img
            src={imageUrl}
            alt={`Photo de ${artisan.name}`}
            className="artisan-detail__image"
          />
        </div>

        <div className="col-md-6 artisan-detail__info">

          <h1 className="artisan-detail__name">
            {artisan.name}
          </h1>

          <p className="artisan-detail__specialty">
            {artisan.specialty}
          </p>

          <p className="artisan-detail__city">
            {artisan.city}
          </p>

          <div className="artisan-detail__rating">

            <span className="artisan-detail__rating-value">
              {rating}/5
            </span>

            <span
              className="artisan-detail__stars"
              style={{ "--rating-width": `${ratingPercent}%` }}
              aria-hidden="true"
            >
              <span className="artisan-detail__stars-base">
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
              </span>

              <span className="artisan-detail__stars-fill">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </span>

            </span>

          </div>

        </div>

      </div>
    </div>
  );
}