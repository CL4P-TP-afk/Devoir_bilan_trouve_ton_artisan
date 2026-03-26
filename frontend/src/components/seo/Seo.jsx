import { useEffect } from "react";

/**
 * Composant SEO simple.
 *
 * Permet de définir dynamiquement :
 * - le titre de la page
 * - la meta description
 *
 * Utilisation :
 * <Seo title="Titre" description="Description" />
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    /**
     * Mise à jour du titre de la page.
     */
    document.title = title;

    /**
     * Récupération ou création de la balise meta description.
     */
    let metaDescription = document.querySelector("meta[name='description']");

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    /**
     * Mise à jour du contenu.
     */
    metaDescription.setAttribute("content", description);
  }, [title, description]);

  return null;
}