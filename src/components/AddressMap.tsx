import React from "react";
import { useTranslation } from "react-i18next";
import { SITE_CONFIG } from "../config";

function buildOsmEmbedUrl(lat: number, lon: number): string {
  const dLon = 0.004;
  const dLat = 0.003;
  const bbox = `${lon - dLon},${lat - dLat},${lon + dLon},${lat + dLat}`;
  const marker = `${lat},${lon}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`;
}

export const AddressMap: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full h-80 rounded-lg overflow-hidden shadow-sm relative bg-gray-800">
        <iframe
          title={t("contact.mapIframeTitle")}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={buildOsmEmbedUrl(
            SITE_CONFIG.clinicMapCoordinates.lat,
            SITE_CONFIG.clinicMapCoordinates.lon,
          )}
          className="absolute inset-0 border-0"
          allowFullScreen
        />
      </div>
      <p className="mt-2 text-center text-sm text-gray-400">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.zip} ${SITE_CONFIG.address.city}`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          {t("contact.openInGoogleMaps")}
        </a>
      </p>
    </>
  );
};
