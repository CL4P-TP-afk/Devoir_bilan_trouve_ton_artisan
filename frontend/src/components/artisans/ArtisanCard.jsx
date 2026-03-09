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
  const imageUrl = artisan.image_url
    ? artisan.image_url
    : "/images/artisan-placeholder.jpg";

  const CardTitleTag = cardTitleLevel;

  return (
    <article className="artisan-card">
      <img
        src={imageUrl}
        className="artisan-card__image"
        alt={`Photo de ${artisan.name}`}
      />

      <div className="artisan-card__body">
        <CardTitleTag className="artisan-card__title">
          {artisan.name}
        </CardTitleTag>

        <p className="artisan-card__specialty">
          {artisan.specialty}
        </p>

        <p className="artisan-card__city">
          {artisan.city}
        </p>

        <div
          className="artisan-card__rating"
          aria-label={`Note de ${artisan.rating} sur 5`}
        >
          {artisan.rating}/5
        </div>
      </div>
    </article>
  );
}