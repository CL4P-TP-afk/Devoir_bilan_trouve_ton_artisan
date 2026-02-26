import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom bg-white">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Trouve ton artisan
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Accueil
              </NavLink>
            </li>

            {/* TODO: menu catégories dynamique plus tard */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories/1">
                Catégorie
              </NavLink>
            </li>

            {/* TODO: menu artisans dynamique plus tard */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/artisans/1">
                artisans
              </NavLink>
            </li>
          </ul>

          {/* TODO: Search bar plus tard */}
        </div>
      </div>
    </nav>
  );
}