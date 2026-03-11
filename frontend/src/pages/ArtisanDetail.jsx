import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtisanById } from "../services/artisans.service";

export default function ArtisanDetail() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArtisan() {
      try {
        setLoading(true);
        const data = await getArtisanById(id);
        setArtisan(data);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement de l'artisan");
      } finally {
        setLoading(false);
      }
    }

    fetchArtisan();
  }, [id]);

  if (loading) {
    return <p className="container py-5">Chargement...</p>;
  }

  if (error) {
    return (
      <div className="container py-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <section className="artisan-detail py-5">
      <div className="container">

        <div className="row align-items-center mb-5">

          <div className="col-md-6">
            <img
              src={artisan.image_url}
              alt={artisan.name}
              className="img-fluid rounded"
            />
          </div>

          <div className="col-md-6">
            <h1>{artisan.name}</h1>

            <p>{artisan.specialty}</p>

            <p>{artisan.city}</p>

            <p>Note ⭐ {artisan.rating}</p>
          </div>

        </div>

        <section className="artisan-about mb-5">

          <div className="row">

            <div className="col-md-7">

              <h2>À propos</h2>

              <p>{artisan.about}</p>

            </div>

            <div className="col-md-5">

              <ul className="list-unstyled">

                <li>
                  <strong>Adresse / Ville</strong>
                  <br />
                  {artisan.city}
                </li>

                <li className="mt-2">
                  <strong>Email</strong>
                  <br />
                  {artisan.email}
                </li>

                <li className="mt-2">
                  <strong>Site web</strong>
                  <br />
                  <a href={artisan.website} target="_blank">
                    {artisan.website}
                  </a>
                </li>

              </ul>

            </div>

          </div>

        </section>

        <section className="artisan-contact">

          <h2 className="text-center mb-4">Contacter l’artisan</h2>

          <form className="mx-auto" style={{ maxWidth: "500px" }}>

            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input className="form-control" placeholder="Nom" />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" placeholder="exemple@mail.com" />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Message"
              />
            </div>

            <button className="btn btn-primary w-100">
              Envoyer
            </button>

          </form>

        </section>

      </div>
    </section>
  );
}