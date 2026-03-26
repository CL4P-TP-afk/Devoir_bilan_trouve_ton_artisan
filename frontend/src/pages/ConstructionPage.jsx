import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo.jsx";

/**
 * Page en construction - utilisée pour les pages légales vides.
 */
export default function ConstructionPage() {
  return (
    <>
    <Seo
      title="Mentions légales | Trouve ton artisan"
      description="Consultez les mentions légales du site Trouve ton artisan."
    />
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
    </>
  );
}