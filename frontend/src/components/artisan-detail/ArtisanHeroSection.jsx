export default function ArtisanHeroSection({ artisan }) {
  return (
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
  );
}