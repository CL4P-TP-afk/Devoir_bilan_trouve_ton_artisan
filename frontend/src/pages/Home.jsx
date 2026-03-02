import ArtisanCard from "../components/artisans/ArtisanCard";

const artisan = {
  name: "Boulangerie Dupont",
  specialty: "Boulanger",
  city: "Lyon",
  rating: 4.8,
  image_url: null,
  is_featured: true
};

export default function Home() {
  return (
    <>
      <h1 className="mb-3">Trouvez votre artisan local</h1>
      <p className="text-muted">
        Page d’accueil (placeholder). On branchera l’API ensuite.
      </p>
      <ArtisanCard artisan={artisan} />
    </>
  );
}