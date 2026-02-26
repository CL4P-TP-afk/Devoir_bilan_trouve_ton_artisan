import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1>404</h1>
      <p>Page non trouvée</p>
      <Link to="/">Retour à l'accueil</Link>
    </>
  );
}