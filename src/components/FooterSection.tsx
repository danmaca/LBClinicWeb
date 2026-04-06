import React from "react";
import { useTranslation } from "react-i18next";
import { SITE_CONFIG } from "../config";

export const FooterSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">{SITE_CONFIG.brandName}</h3>
            <p className="text-gray-400 text-sm mb-4">Péče o váš úsměv na prvním místě.</p>
            <div className="flex space-x-4">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("nav.contact")}</h4>
            <address className="not-italic text-gray-400 text-sm space-y-2">
              <p>{SITE_CONFIG.address.street}</p>
              <p>
                {SITE_CONFIG.address.zip} {SITE_CONFIG.address.city}
              </p>
              <p className="mt-4">
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
                  className="hover:text-accent transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t("contact.hoursHeading")}</h4>
            <div className="text-gray-400 text-sm space-y-2">
              <div className="flex justify-between max-w-[200px]">
                <span>{t("contact.monThu")}:</span>
                <span>8:00 – 16:00</span>
              </div>
              <div className="flex justify-between max-w-[200px]">
                <span>{t("contact.fri")}:</span>
                <span>8:00 – 13:00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>
                <a href="#team" className="hover:text-accent transition-colors">
                  {t("nav.team")}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-accent transition-colors">
                  {t("nav.pricing")}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent transition-colors">
                  {t("nav.faq")}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex justify-between items-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.companyName}. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
};
