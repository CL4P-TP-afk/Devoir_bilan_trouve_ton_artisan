import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoHeaderFooter from "../../assets/LogoHeaderFooter.png";
import { getCategories } from "../../services/categoryService";
import SearchForm from "../search/SearchForm";

/**
 * Catégories de secours utilisées si l'API ne répond pas.
 */
const FALLBACK_CATEGORIES = [
  { id: 1, name: "Alimentation" },
  { id: 2, name: "Bâtiment" },
  { id: 3, name: "Fabrication" },
  { id: 4, name: "Services" },
];

/**
 * Header principal du site.
 *
 * Responsabilités :
 * - afficher le logo
 * - afficher le menu principal
 * - charger dynamiquement les catégories
 * - afficher la barre de recherche globale
 */
export default function Header() {

  /**
   * Liste des catégories récupérées depuis l'API.
   */
  const [categories, setCategories] = useState([]);

  /**
   * Chargement des catégories au montage du composant.
   * En cas d'échec → fallback local.
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

  return (
    <header className="site-header border-bottom">

      <nav className="navbar navbar-expand-lg bg-white">

        <div className="container align-items-center">

          {/* Logo */}
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

          {/* Burger mobile */}
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

          <div className="collapse navbar-collapse" id="mainNavbar">

            {/* Menu principal */}
            <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0 gap-lg-3">

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

            {/* Barre de recherche globale */}
            <SearchForm />

          </div>
        </div>
      </nav>
    </header>
  );
}