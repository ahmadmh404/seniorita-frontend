"use client";

import { Slide } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderCarouselProps {
  slides: Slide[];
}

export function SlidesCarousel({ slides }: SliderCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesTimerEffect = useEffectEvent(
    (set: Dispatch<SetStateAction<number>>) => {
      const timer = setInterval(() => {
        set((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  );

  useEffect(() => {
    slidesTimerEffect(setCurrentSlide);
  }, [setCurrentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-linear-to-l from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 text-balance">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  {slide.subtitle}
                </p>
                <Link href={slide.link}>
                  <Button className="btn-outline border-white text-white hover:bg-white hover:text-foreground text-lg px-8 py-6">
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={nextSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition-colors"
        aria-label="الشريحة التالية"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={prevSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition-colors"
        aria-label="الشريحة السابقة"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`انتقل للشريحة ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
