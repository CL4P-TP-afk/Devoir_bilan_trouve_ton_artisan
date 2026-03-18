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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitError("");
    setSubmitSuccess("");

    try {
      setIsSubmitting(true);
      await sendContactMessage(id, formData);
      setSubmitSuccess("Votre message a bien été envoyé.");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("Erreur lors de l’envoi du message :", err);
      setSubmitError(
        "Le service de contact est momentanément indisponible. Veuillez réessayer plus tard."
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