//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section text-center">
        <div className="container">

            <h1 className="hero-title mb-3">
            Trouvez votre artisan local
            </h1>

            <p className="hero-subtitle mb-4">
            Recherchez facilement un artisan près de chez vous, par catégorie ou par nom.
            </p>

            <button
              className="btn btn-primary hero-button"
              onClick={() => navigate("/recherche")}
            >
              Rechercher un artisan
            </button>

        </div>
    </section>
  );
}