import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE_CONFIG } from "../config";

export const ContactInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="space-y-8 mb-12">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <MapPin className="h-6 w-6 text-accent" />
          </div>
          <div className="ml-4">
            <p className="font-semibold text-lg text-white">{SITE_CONFIG.address.street}</p>
            <p className="text-gray-400">
              {SITE_CONFIG.address.zip}, {SITE_CONFIG.address.city}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Phone className="h-6 w-6 text-accent" />
          </div>
          <div className="ml-4">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
              className="font-semibold text-lg text-white hover:text-accent transition-colors"
            >
              {SITE_CONFIG.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Mail className="h-6 w-6 text-accent" />
          </div>
          <div className="ml-4">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="font-semibold text-lg text-white hover:text-accent transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Clock className="h-6 w-6 text-accent mt-1" />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-lg text-white mb-2">{t("contact.hoursHeading")}</h4>
            <div className="space-y-1 text-gray-400">
              <div className="flex space-x-4">
                <span className="w-16">{t("contact.monThu")}:</span>
                <span>8:00 – 16:00</span>
              </div>
              <div className="flex space-x-4">
                <span className="w-16">{t("contact.fri")}:</span>
                <span>8:00 – 13:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
