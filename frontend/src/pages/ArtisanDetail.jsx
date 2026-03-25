import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtisanById, sendContactMessage } from "../services/artisans.service";
import ArtisanHeroSection from "../components/artisan-detail/ArtisanHeroSection";
import ArtisanAboutSection from "../components/artisan-detail/ArtisanAboutSection";
import ArtisanContactSection from "../components/artisan-detail/ArtisanContactSection";

export default function ArtisanDetail() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    async function fetchArtisan() {
      try {
        setLoading(true);
        setError("");

        const data = await getArtisanById(id);
        setArtisan(data);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement de l'artisan.");
      } finally {
        setLoading(false);
      }
    }

    fetchArtisan();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    /**
     * Met à jour le champ modifié dans l'état du formulaire.
     */
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    /**
     * Dès que l'utilisateur recommence à saisir,
     * on efface les anciens messages d'erreur ou de succès.
     *
     * Cela évite d'afficher un retour devenu obsolète
     * alors que le formulaire est en cours de correction.
     */
    if (submitError) {
      setSubmitError("");
    }

    if (submitSuccess) {
      setSubmitSuccess("");
    }
  }

  /**
   * Gestion de la soumission du formulaire de contact.
   *
   * Étapes :
   * - validation côté client
   * - appel API backend
   * - gestion des états UX (chargement, succès, erreur)
   *
   * Ce découpage permet d'améliorer l'expérience utilisateur
   * tout en conservant une validation serveur sécurisée.
   */
  async function handleSubmit(event) {
    event.preventDefault();

    /**
     * Réinitialise les messages précédents avant une nouvelle tentative d'envoi.
     */
    setSubmitError("");
    setSubmitSuccess("");

    /**
     * Validation simple côté client.
     * Le backend garde bien sûr la validation finale,
     * mais cette étape évite des requêtes inutiles et améliore l'UX.
     */
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitError("Merci de remplir tous les champs du formulaire.");
      return;
    }

    /**
     * Validation minimale du format d'email.
     * Cette vérification n'est pas parfaite, mais elle suffit pour guider l'utilisateur.
     */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email.trim())) {
      setSubmitError("Merci de saisir une adresse email valide.");
      return;
    }

    try {
      setIsSubmitting(true);

      await sendContactMessage(id, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      setSubmitSuccess("Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("Erreur lors de l’envoi du message :", err);

      setSubmitError(
        "Une erreur est survenue lors de l’envoi de votre message. Merci de réessayer dans quelques instants."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <section className="artisan-detail">
        <div className="container">
          <p>Chargement de la fiche artisan...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="artisan-detail">
        <div className="container">
          <p className="text-danger mb-0">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="artisan-detail">

        <ArtisanHeroSection artisan={artisan} />
        <ArtisanAboutSection artisan={artisan} />
        <ArtisanContactSection
          formData={formData}
          isSubmitting={isSubmitting}
          submitError={submitError}
          submitSuccess={submitSuccess}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

    </section>
  );
}