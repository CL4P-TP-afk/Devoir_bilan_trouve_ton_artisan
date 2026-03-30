import { NavLink } from "react-router-dom";
import LogoHeaderFooter from "../../assets/LogoHeaderFooter.png";

export default function Footer() {
  return (
    <footer className="site-footer py-4">
      <div className="container">
        <div className="row g-4 align-items-start">
          {/* Logo */}
          <div className="col-12 col-lg-4">
            <NavLink to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none">
              <img src={LogoHeaderFooter} alt="Logo Trouve ton artisan" height="100" />
            </NavLink>
          </div>

          {/* Liens légaux */}
          <div className="col-12 col-lg-4 text-center">
            <h2 className="mb-2">Liens légaux</h2>
            <ul className="list-unstyled m-0">
              <li><NavLink to="/mentions-legales">Mentions légales</NavLink></li>
              <li><NavLink to="/donnees-personnelles">Données personnelles</NavLink></li>
              <li><NavLink to="/accessibilite">Accessibilité</NavLink></li>
              <li><NavLink to="/cookies">Cookies</NavLink></li>
            </ul>
          </div>

          {/* Coordonnées */}
          <div className="col-12 col-lg-4 text-center text-lg-start">
            <h2 className="mb-2">Coordonnées</h2>

            <address className="m-0">
              Antenne Région Auvergne-Rhône-Alpes<br />
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              +33 (0)4 26 73 40 00
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}