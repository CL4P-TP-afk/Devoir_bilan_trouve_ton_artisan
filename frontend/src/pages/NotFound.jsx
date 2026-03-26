import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo.jsx";

/**
 * Page 404 - affichée lorsqu'aucune route ne correspond.
 */
export default function NotFound() {
  return (
    <>
    <Seo
      title="Page introuvable | Trouve ton artisan"
      description="La page demandée est introuvable. Retournez à l’accueil pour poursuivre votre navigation sur Trouve ton artisan."
    />
    <section className="status-page status-page--notfound">
      <div className="container text-center">

        <p className="status-page__code">404</p>

        <h1 className="status-page__title mb-3">
          Page non trouvée
        </h1>

        <p className="status-page__text mb-4">
          La page que vous recherchez n’existe pas ou a été déplacée.
        </p>

        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>

      </div>
    </section>
    </>
  );
}