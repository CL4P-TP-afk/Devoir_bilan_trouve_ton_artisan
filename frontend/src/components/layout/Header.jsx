import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoHeaderFooter from "../../assets/LogoHeaderFooter.png";
import { getCategories } from "../../services/categoryService";
import SearchForm from "../search/SearchForm";

/**
 * Catégories de secours utilisées si l'API ne répond pas.
 * 
 * Cela permet de garder un menu fonctionnel même en cas
 * de problème côté backend.
 */
const FALLBACK_CATEGORIES = [
  { id: 1, name: "Alimentation" },
  { id: 2, name: "Bâtiment" },
  { id: 3, name: "Fabrication" },
  { id: 4, name: "Services" },
];

/**
 * Composant Header du site.
 *
 * Responsabilités :
 * - afficher le logo
 * - afficher le menu de navigation principal
 * - charger dynamiquement les catégories depuis l'API
 * - afficher le formulaire de recherche global
 *
 * Le menu reste fonctionnel même si l'API tombe grâce
 * au fallback local.
 */
export default function Header() {

  /**
   * Liste des catégories récupérées depuis l'API.
   */
  const [categories, setCategories] = useState([]);

  /**
   * Etat de la recherche (actuellement non utilisé ici
   * car la logique est déportée dans SearchForm).
   * Peut être supprimé si non utilisé à terme.
   */
  const [query, setQuery] = useState("");

  /**
   * Hook de navigation programmatique React Router.
   */
  const navigate = useNavigate();

  /**
   * Chargement des catégories au montage du composant.
   *
   * En cas d'échec de l'appel API :
   * - affichage d'une erreur console
   * - utilisation des catégories fallback
   */
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
        setCategories(FALLBACK_CATEGORIES);
      }
    }

    fetchCategories();
  }, []);

  /**
   * Gestion de la soumission de la recherche.
   *
   * - si la recherche est vide → redirection vers /recherche
   * - sinon → redirection vers /recherche?q=mot-clé
   */
  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      navigate("/recherche");
      return;
    }

    navigate(`/recherche?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <header className="site-header border-bottom">

      {/* Barre de navigation principale */}
      <nav className="navbar navbar-expand-lg bg-white">

        <div className="container align-items-center">

          {/* Logo du site */}
          <NavLink
            className="navbar-brand d-flex align-items-center gap-2"
            to="/"
          >
            <img
              src={LogoHeaderFooter}
              alt="Logo Trouve ton artisan"
              height="100"
            />
          </NavLink>

          {/* Bouton menu mobile (burger) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Ouvrir le menu"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Contenu de la navigation */}
          <div className="collapse navbar-collapse" id="mainNavbar">

            {/* Menu principal */}
            <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0 gap-lg-3">

              {/* Lien Accueil */}
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-semibold" : "")
                  }
                >
                  Accueil
                </NavLink>
              </li>

              {/* Catégories dynamiques */}
              {categories.map((cat) => (
                <li key={cat.id} className="nav-item">
                  <NavLink
                    to={`/categories/${cat.id}`}
                    className="nav-link"
                  >
                    {cat.name}
                  </NavLink>
                </li>
              ))}

            </ul>

            {/* Formulaire de recherche global */}
            <SearchForm />

          </div>
        </div>
      </nav>
    </header>
  );
}