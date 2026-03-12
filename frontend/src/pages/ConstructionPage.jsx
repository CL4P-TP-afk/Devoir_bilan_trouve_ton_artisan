import { Link } from "react-router-dom";

export default function ConstructionPage() {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h1 className="mb-4">Page en construction</h1>

        <p className="mb-5">
          Cette page sera prochainement complétée par un cabinet spécialisé.
        </p>

        <Link to="/" className="btn btn-outline-primary">
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}