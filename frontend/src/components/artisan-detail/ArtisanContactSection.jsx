/**
 * Section formulaire de contact de la fiche artisan.
 *
 * Ce composant est purement présentationnel :
 * - il affiche les champs
 * - il reçoit les valeurs et handlers via props
 * - il n'effectue aucun appel API directement
 */
export default function ArtisanContactSection({
  formData,
  isSubmitting,
  submitError,
  submitSuccess,
  onChange,
  onSubmit,
}) {
  return (
    <section className="artisan-detail__contact">
      <h2 className="text-center mb-4">Contacter l’artisan</h2>

      <form className="artisan-detail__contact-form" onSubmit={onSubmit}>
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            required
          />
        </div>

        {submitError && (
          <p className="text-danger text-center" role="alert">
            {submitError}
          </p>
        )}

        {submitSuccess && (
          <p className="text-success text-center" role="status">
            {submitSuccess}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100 artisan-detail__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </section>
  );
}