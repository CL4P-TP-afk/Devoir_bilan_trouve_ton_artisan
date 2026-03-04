import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero-section py-5 text-center">
        <div className="container">

            <h1 className="hero-title mb-3">
            Trouvez votre artisan local
            </h1>

            <p className="hero-subtitle mb-4">
            Recherchez facilement un artisan près de chez vous, par catégorie ou par nom.
            </p>

            <Link to="/artisans" className="btn btn-primary hero-button">
            Rechercher un artisan
            </Link>

        </div>
    </section>
  );
}