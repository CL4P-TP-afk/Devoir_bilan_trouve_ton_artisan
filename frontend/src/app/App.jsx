import { useRoutes } from "react-router-dom";
import { routes } from "./routes.jsx";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function App() {
  const element = useRoutes(routes);

  return (
    <>
      <Header />
      <main className="container py-4">
        {element}
      </main>
      <Footer />
    </>
  );
}