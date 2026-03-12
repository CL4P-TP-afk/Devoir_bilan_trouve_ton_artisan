import Home from "../pages/Home.jsx";
import Category from "../pages/Category.jsx";
import ArtisanDetail from "../pages/ArtisanDetail.jsx";
import SearchResults from "../pages/SearchResults";
import NotFound from "../pages/NotFound.jsx";
import ConstructionPage from "../pages/ConstructionPage.jsx";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/categories/:id", element: <Category /> },
  { path: "/artisans/:id", element: <ArtisanDetail /> },
  { path: "/recherche", element: <SearchResults />},

  { path: "/mentions-legales", element: <ConstructionPage /> },
  { path: "/donnees-personnelles", element: <ConstructionPage /> },
  { path: "/accessibilite", element: <ConstructionPage /> },
  { path: "/cookies", element: <ConstructionPage /> },

  { path: "*", element: <NotFound /> },
];

