import { FALLBACK_CAROUSEL_SLIDES } from "@/lib/constant";
import { SlidesCarousel } from "./slides-carousel";

export async function HeroSection() {
  // TODO: Fetch slides from API
  const slides = FALLBACK_CAROUSEL_SLIDES;

  return <SlidesCarousel slides={slides} />;
}
