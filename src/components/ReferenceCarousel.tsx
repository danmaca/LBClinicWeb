import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { REFERENCE_SLIDES } from "../config";

export const ReferenceCarousel: React.FC = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 768 ? 2 : 1);
    };

    // Úvodní nastavení
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlide = Math.max(0, REFERENCE_SLIDES.length - itemsPerView);

  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [itemsPerView, currentSlide, maxSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));

  const slideWidthPercent = 100 / itemsPerView;
  const numDots = maxSlide + 1;

  return (
    <div className="mt-20 max-w-5xl mx-auto w-full">
      <div className="relative group overflow-hidden rounded-xl shadow-lg bg-gray-50 w-full py-6 px-2 md:px-12 border border-gray-100">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * slideWidthPercent}%)`,
            }}
          >
            {REFERENCE_SLIDES.map((slide, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2"
                style={{ width: `${slideWidthPercent}%` }}
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={`/images/reference/` + slide.image}
                    alt={
                      (Array.isArray(slide.caption) ? slide.caption.join(" ") : slide.caption) ??
                      t("carousel.slideAlt", { index: index + 1 })
                    }
                    className="w-full h-full object-contain"
                  />
                  {slide.caption && (
                    <span className="absolute bottom-0 right-0 max-w-[75%] px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-tl-lg select-none pointer-events-none text-right leading-snug">
                      {Array.isArray(slide.caption)
                        ? slide.caption.map((line, i) => (
                            <React.Fragment key={i}>
                              {i > 0 && <br />}
                              {line}
                            </React.Fragment>
                          ))
                        : slide.caption}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 md:p-2.5 rounded-full shadow border border-gray-100 backdrop-blur-sm transition-all md:opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
          aria-label={t("carousel.prev")}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 p-2 md:p-2.5 rounded-full shadow border border-gray-100 backdrop-blur-sm transition-all md:opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
          aria-label={t("carousel.next")}
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {Array.from({ length: numDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? "bg-black w-4" : "bg-black/30 hover:bg-black/50"
              }`}
              aria-label={t("carousel.goToSlide", { index: index + 1 })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
