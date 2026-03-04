import ArtisanCard from "../artisans/ArtisanCard"

export default function FeaturedArtisansSection({ artisans }) {

  return (
    <section className="mb-5">

      <h2>Artisans du mois</h2>

      <div className="row">

        {artisans.map((artisan) => (

          <div className="col-12 col-md-4 mb-4" key={artisan.id}>

            <ArtisanCard
              artisan={artisan}
              cardTitleLevel="h3"
            />

          </div>

        ))}

      </div>

    </section>
  )
}