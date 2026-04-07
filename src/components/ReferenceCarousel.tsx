import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { REFERENCE_SLIDES } from "../config";

type BreakpointKey = "sm" | "md" | "lg";

const getBreakpoint = (width: number): BreakpointKey => {
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  return "sm";
};

const ITEMS_PER_VIEW: Record<BreakpointKey, number> = {
  sm: 1,
  md: 2,
  lg: 1,
};

export const ReferenceCarousel: React.FC = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "sm",
  );

  const itemsPerView = ITEMS_PER_VIEW[breakpoint];

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

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

  const renderCaption = (caption: string | string[]) =>
    Array.isArray(caption)
      ? caption.map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </React.Fragment>
        ))
      : caption;

  const getAlt = (slide: (typeof REFERENCE_SLIDES)[number], index: number) =>
    (Array.isArray(slide.caption) ? slide.caption.join(" ") : slide.caption) ??
    t("carousel.slideAlt", { index: index + 1 });

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
                {/* lg: horizontal layout (image left, caption right) */}
                {/* sm/md: vertical layout (image top, caption bottom) */}
                <div className="flex flex-col lg:flex-row-reverse rounded-lg overflow-hidden shadow-sm bg-white h-full">
                  {/* Image */}
                  <div className="lg:w-1/2 flex-shrink-0">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={"/images/reference/" + slide.image}
                        alt={getAlt(slide, index)}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Caption */}
                  {slide.caption && (
                    <div className="lg:w-1/2 flex items-center p-4 lg:p-6">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {renderCaption(slide.caption)}
                      </p>
                    </div>
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
