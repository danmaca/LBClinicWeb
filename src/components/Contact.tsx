import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../config';
import { ContactForm } from './ContactForm';

function buildOsmEmbedUrl(lat: number, lon: number): string {
  const dLon = 0.004;
  const dLat = 0.003;
  const bbox = `${lon - dLon},${lat - dLat},${lon + dLon},${lat + dLat}`;
  const marker = `${lat},${lon}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`;
}

export const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
          {t('contact.heading')}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info & Map */}
          <div>
            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-lg text-gray-900">{SITE_CONFIG.address.street}</p>
                  <p className="text-gray-600">{SITE_CONFIG.address.zip}, {SITE_CONFIG.address.city}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-4">
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="font-semibold text-lg text-gray-900 hover:text-accent transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-4">
                  <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-lg text-gray-900 hover:text-accent transition-colors">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-accent mt-1" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">{t('contact.hoursHeading')}</h4>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex space-x-4">
                      <span className="w-16">{t('contact.monThu')}:</span>
                      <span>8:00 – 16:00</span>
                    </div>
                    <div className="flex space-x-4">
                      <span className="w-16">{t('contact.fri')}:</span>
                      <span>8:00 – 13:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-80 rounded-lg overflow-hidden shadow-sm relative bg-gray-100">
              <iframe
                title={t('contact.mapIframeTitle')}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={buildOsmEmbedUrl(SITE_CONFIG.clinicMapCoordinates.lat, SITE_CONFIG.clinicMapCoordinates.lon)}
                className="absolute inset-0 border-0"
                allowFullScreen
              />
            </div>
            <p className="mt-2 text-center text-sm text-gray-500">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.zip} ${SITE_CONFIG.address.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {t('contact.openInGoogleMaps')}
              </a>
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
