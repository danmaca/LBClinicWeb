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

  const renderText = (text: string | string[]) =>
    Array.isArray(text)
      ? text.map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </React.Fragment>
        ))
      : text;

  const getAlt = (slide: (typeof REFERENCE_SLIDES)[number], index: number) =>
    (Array.isArray(slide.text) ? slide.text.join(" ") : slide.text) ??
    t("carousel.slideAlt", { index: index + 1 });

  return (
    <div className="mt-5 max-w-5xl mx-auto w-full">
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
                <div className="rounded-lg overflow-hidden shadow-sm bg-white lg:relative h-full">
                  {/* Image: normal block on sm/md, absolute right-aligned on lg */}
                  <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-auto lg:z-0">
                    <img
                      src={"/images/reference/" + slide.image}
                      alt={getAlt(slide, index)}
                      className="w-full aspect-[4/3] object-contain bg-gray-100 lg:aspect-auto lg:h-full lg:w-auto lg:object-contain lg:bg-transparent lg:ml-auto"
                    />
                  </div>

                  {/* White fade overlay – only visible on lg */}
                  <div className="hidden lg:block absolute inset-0 z-[1] bg-gradient-to-r from-white via-white/80 to-transparent" />

                  {/* Text */}
                  {slide.personName || slide.text ? (
                    <div className="p-4 lg:relative lg:z-[2] lg:w-3/5 lg:min-h-[320px] lg:flex lg:flex-col lg:justify-center lg:px-12 lg:py-10 xl:px-16">
                      {slide.personName && (
                        <h3 className="text-left text-base sm:text-lg text-gray-900 font-semibold mb-2 lg:text-2xl xl:text-3xl lg:font-light lg:mb-4">
                          {slide.personName}
                        </h3>
                      )}
                      {slide.text && (
                        <p className="text-left text-sm sm:text-base text-gray-700 leading-relaxed lg:text-lg xl:text-xl lg:italic lg:leading-relaxed lg:font-medium">
                          {renderText(slide.text)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="hidden lg:block lg:min-h-[320px]" />
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
