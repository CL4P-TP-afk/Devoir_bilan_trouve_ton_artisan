import { Link } from "react-router-dom";
import artisanPlaceholder from "../../assets/artisan-placeholder.png";

/**
 * Composant d'affichage d'un artisan sous forme de carte cliquable.
 *
 * Responsabilités :
 * - afficher les informations principales d'un artisan
 * - fournir un lien vers la fiche détail `/artisans/:id`
 *
 * Ce composant est réutilisable dans plusieurs contextes :
 * - page d'accueil
 * - page catégorie
 * - page de résultats de recherche
 *
 * @param {Object} props
 * @param {Object} props.artisan - Données de l'artisan à afficher
 * @param {string} [props.cardTitleLevel="h3"] - Niveau de titre HTML à utiliser
 */
export default function ArtisanCard({ artisan, cardTitleLevel = "h3" }) {
  /**
   * Image fallback utilisée si aucun visuel n'est fourni par l'API.
   */
  const imageUrl = artisan.image_url || artisanPlaceholder;

  /**
   * Permet d'adapter le niveau du titre selon la page
   * tout en gardant le composant réutilisable.
   */
  const CardTitleTag = cardTitleLevel;

  /**
   * Calcul du pourcentage de remplissage des étoiles
   * à partir de la note sur 5.
   */
  const rating = Number(artisan.rating) || 0;
  const ratingPercent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <Link
      to={`/artisans/${artisan.id}`}
      className="text-decoration-none text-dark"
      aria-label={`Voir la fiche de ${artisan.name}`}
    >
      <article className="artisan-card">
        <img
          src={imageUrl}
          className="artisan-card__image"
          alt={`Illustration de ${artisan.name}`}
        />

        <div className="artisan-card__body">
          <CardTitleTag className="artisan-card__title">
            {artisan.name}
          </CardTitleTag>

          <p className="artisan-card__specialty">
            {artisan.specialty || "Spécialité non renseignée"}
          </p>

          <p className="artisan-card__city">
            {artisan.city || "Ville non renseignée"}
          </p>

          <div
            className="artisan-card__rating"
            aria-label={`Note de ${rating} sur 5`}
          >
            <span className="artisan-card__rating-value">{rating}/5</span>

            <span
              className="artisan-card__stars"
              style={{ "--rating-width": `${ratingPercent}%` }}
              aria-hidden="true"
            >
              <span className="artisan-card__stars-base">
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
              </span>

              <span className="artisan-card__stars-fill">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}