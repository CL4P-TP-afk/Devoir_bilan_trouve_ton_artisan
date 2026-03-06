import { NavLink } from "react-router-dom";
import LogoHeaderFooter from "../../assets/LogoHeaderFooter.png";

const categories = [
  { id: 1, name: "Alimentation" },
  { id: 2, name: "Bâtiment" },
  { id: 3, name: "Fabrication" },
  { id: 4, name: "Services" }
];

export default function Header() {
  return (
    <header className="site-header border-bottom">
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container align-items-center">

          {/* Logo */}
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
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

            {/* Menu */}
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

            {/* Search */}
            <form className="d-flex" role="search" aria-label="Rechercher un artisan">
              <label htmlFor="search-artisan" className="visually-hidden">
                Rechercher un artisan
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search" aria-hidden="true"></i>
                </span>

                <input
                  id="search-artisan"
                  className="form-control"
                  type="search"
                  placeholder="Rechercher un artisan"
                />
              </div>
            </form>

          </div>
        </div>
      </nav>
    </header>
  );
}