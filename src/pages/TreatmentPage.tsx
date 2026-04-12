import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "../router/PageLayout";

/** Service keys – order matches the localization file. */
const SERVICE_KEYS = [
  "preventive_exam",
  "dental_hygiene",
  "teeth_whitening",
  "pediatric_dentistry",
  "wisdom_teeth",
  "implants",
  "fillings",
  "orthodontics",
  "endodontics",
  "periodontics",
  "dentures",
  "veneers",
  "bridge",
  "crown",
  "sedation",
  "smile_makeover",
  "oral_surgery",
  "emergency",
  "xray",
] as const;

export const TreatmentPage: React.FC = () => {
  const { t } = useTranslation();

  // Scroll to top when the page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <div className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-black">
            {t("treatments.heading")}
          </h1>

          {/* Intro */}
          <p className="max-w-3xl mx-auto text-center text-gray-600 text-lg leading-relaxed mb-16">
            {t("treatments.intro")}
          </p>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_KEYS.map((key) => (
              <div
                key={key}
                className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 p-6"
              >
                {/* Accent top bar */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-accent/60 rounded-b opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-accent transition-colors duration-300">
                  {t(`treatments.${key}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`treatments.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
