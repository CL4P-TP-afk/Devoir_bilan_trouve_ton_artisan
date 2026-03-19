import { Link } from "react-router-dom";

/**
 * Page en construction - utilisée pour les pages légales vides.
 */
export default function ConstructionPage() {
  return (
    <section className="status-page status-page--construction">
      <div className="container text-center">

        <h1 className="status-page__title mb-3">
          Page en construction
        </h1>

        <p className="status-page__text mb-4">
          Cette page sera prochainement complétée par un cabinet spécialisé.
        </p>

        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>

      </div>
    </section>
  );
}