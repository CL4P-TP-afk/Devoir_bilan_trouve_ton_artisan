export default function ArtisanAboutSection({ artisan }) {
  return (
    <section className="artisan-detail__about">
      <div className="row">
        <div className="col-md-7">
          <h2>À propos</h2>
          <p>{artisan.about}</p>
        </div>

        <div className="col-md-5">
          <h2>Coordonnées</h2>

          <ul className="list-unstyled">
            <li>
              <strong>Ville</strong>
              <br />
              {artisan.city}
            </li>

            {artisan.email && (
              <li className="mt-3">
                <strong>Email</strong>
                <br />
                <a href={`mailto:${artisan.email}`}>{artisan.email}</a>
              </li>
            )}

            {artisan.website && (
              <li className="mt-3">
                <strong>Site web</strong>
                <br />
                <a href={artisan.website} target="_blank" rel="noreferrer">
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