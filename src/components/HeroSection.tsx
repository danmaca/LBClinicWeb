import React from "react";
import { useTranslation } from "react-i18next";
import { ReferenceCarousel } from "./ReferenceCarousel";
import { MainLogoImage } from "./MainLogoImage";

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="pt-28 pb-20 min-h-[80vh] flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-0 md:mt-0 min-w-0 w-full">
        <div className="flex justify-center mb-58 mt-28">
          <img
            src="/images/logo_LbClinicDental_pod.svg"
            className="h-[11.25rem] w-auto text-black"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
          {t("hero.titleBefore")}
          <span className="text-accent tracking-[0.15em]">{t("hero.titleHighlight")}</span>
          {t("hero.titleAfter")}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t("hero.subtitle")}</p>
        <p className="text-md text-gray-500 mb-8 font-medium">{t("hero.hours")}</p>

        <ReferenceCarousel />
      </div>
    </section>
  );
};
