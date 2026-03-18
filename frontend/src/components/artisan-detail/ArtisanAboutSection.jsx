/**
 * Section "À propos" et "Coordonnées" de la fiche artisan.
 *
 * Affiche :
 * - la description de l'artisan
 * - ses coordonnées (ville, email, site web)
 */
export default function ArtisanAboutSection({ artisan }) {
  return (
    <section className="artisan-detail__about">
      <div className="row g-4">

        {/* Description artisan */}
        <div className="col-md-7">
          <h2>À propos</h2>
          <p>{artisan.about || "Aucune description disponible."}</p>
        </div>

        {/* Coordonnées */}
        <div className="col-md-5">
          <h2>Coordonnées</h2>

          <ul className="artisan-detail__contact-list list-unstyled">

            <li>
              <strong>Ville</strong>
              <br />
              {artisan.city}
            </li>

            {artisan.email && (
              <li>
                <strong>Email</strong>
                <br />
                <a href={`mailto:${artisan.email}`}>
                  {artisan.email}
                </a>
              </li>
            )}

            {artisan.website && (
              <li>
                <strong>Site web</strong>
                <br />
                <a
                  href={artisan.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {artisan.website}
                </a>
              </li>
            )}

          </ul>
        </div>

      </div>
    </section>
  );
}