import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArtisanById,
  sendContactMessage,
} from "../services/artisans.service";

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
      <div className="container">
        <div className="row align-items-center artisan-detail__hero">
          <div className="col-md-6">
            <img
              src={artisan.image_url || "/images/artisan-placeholder.jpg"}
              alt={`Photo de ${artisan.name}`}
              className="artisan-detail__image"
            />
          </div>

          <div className="col-md-6">
            <h1 className="artisan-detail__name">{artisan.name}</h1>

            <p className="artisan-detail__meta">{artisan.specialty}</p>
            <p className="artisan-detail__meta">{artisan.city}</p>
            <p className="artisan-detail__meta">{artisan.rating}/5</p>
          </div>
        </div>

        <section className="artisan-detail__about">
          <div className="row">
            <div className="col-md-7">
              <h2>À propos</h2>
              <p>{artisan.about}</p>
            </div>

            <div className="col-md-5">
              <h2>Coordonnées</h2>

              <ul className="list-unstyled">
                <li>
                  <strong>Ville</strong>
                  <br />
                  {artisan.city}
                </li>

                {artisan.email && (
                  <li className="mt-3">
                    <strong>Email</strong>
                    <br />
                    <a href={`mailto:${artisan.email}`}>{artisan.email}</a>
                  </li>
                )}

                {artisan.website && (
                  <li className="mt-3">
                    <strong>Site web</strong>
                    <br />
                    <a
                      href={artisan.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {artisan.website}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>

        <section className="artisan-detail__contact">
          <h2 className="text-center mb-4">Contacter l’artisan</h2>

          <form
            className="artisan-detail__contact-form"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="contact-name" className="form-label">
                Nom
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="form-control"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact-email" className="form-label">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="form-control"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact-message" className="form-label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                className="form-control"
                rows="5"
                placeholder="Votre message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {submitError && (
              <p className="text-danger" role="alert">
                {submitError}
              </p>
            )}

            {submitSuccess && (
              <p className="text-success" role="status">
                {submitSuccess}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}