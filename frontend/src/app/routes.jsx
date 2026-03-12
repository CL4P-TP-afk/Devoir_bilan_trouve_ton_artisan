import Home from "../pages/Home.jsx";
import Category from "../pages/Category.jsx";
import ArtisanDetail from "../pages/ArtisanDetail.jsx";
import NotFound from "../pages/NotFound.jsx";
import SearchResults from "../pages/SearchResults";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/categories/:id", element: <Category /> },
  { path: "/artisans/:id", element: <ArtisanDetail /> },
  { path: "/recherche", element: <SearchResults />},
  { path: "*", element: <NotFound /> },
];

