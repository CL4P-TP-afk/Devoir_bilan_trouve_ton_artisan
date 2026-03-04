import { useEffect, useState } from "react";
import { getFeaturedArtisans } from "../services/artisans.service";
import HeroSection from "../components/home/HeroSection"
import StepsSection from "../components/home/StepsSection"
import FeaturedArtisansSection from "../components/home/FeaturedArtisansSection"

export default function Home() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getFeaturedArtisans();
        setArtisans(data);
      } catch (err) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <>
      <HeroSection />
      <StepsSection />
      <FeaturedArtisansSection
        artisans={artisans}
        loading={loading}
        error={error}/>
    </>
  );
}