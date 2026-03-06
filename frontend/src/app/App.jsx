import { useRoutes } from "react-router-dom";
import { routes } from "./routes.jsx";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function App() {
  const element = useRoutes(routes);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        {element}
      </main>

      <Footer />
    </div>
  );
}