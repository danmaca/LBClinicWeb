import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "../config";
import { PageLayout } from "../router/PageLayout";
import { useHashRouter } from "../router/useHashRouter";

export const GalleryPage: React.FC = () => {
  const { t } = useTranslation();
  const { navigate } = useHashRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Scroll to top when the gallery page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const photos = Array.from({ length: SITE_CONFIG.gallery.totalPhotos }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return `./images/gallery/${num}.jpg`;
  });

  const openPhoto = (index: number) => setSelectedIndex(index);
  const closePhoto = () => setSelectedIndex(null);
  const prevPhoto = () =>
    setSelectedIndex((prev) => (prev === null ? null : prev <= 0 ? photos.length - 1 : prev - 1));
  const nextPhoto = () =>
    setSelectedIndex((prev) => (prev === null ? null : prev >= photos.length - 1 ? 0 : prev + 1));

  return (
    <PageLayout>
      <div className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            {t("gallery.heading")}
          </h1>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {photos.map((src, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer group bg-gray-100"
                onClick={() => openPhoto(index)}
              >
                <img
                  src={src}
                  alt={`${t("gallery.heading")} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
            onClick={closePhoto}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closePhoto();
              }}
              aria-label={t("gallery.closeLabel")}
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
            >
              <ChevronLeft size={36} />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
            >
              <ChevronRight size={36} />
            </button>

            <img
              src={photos[selectedIndex]}
              alt={`${t("gallery.heading")} ${selectedIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};
