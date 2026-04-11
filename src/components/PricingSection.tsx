import React from "react";
import { useTranslation } from "react-i18next";
import { SITE_CONFIG } from "../config";
import { BankAccountInfo } from "./BankAccountInfo";
import { PricingListInfo } from "./PricingListInfo";

export const PricingSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          {t("pricing.heading")}
        </h2>
        <p className="text-center text-gray-400 mb-12">
          {t("pricing.descriptionBefore")}
          <a href="#contact" className="text-accent hover:underline">
            {t("pricing.descriptionLink")}
          </a>
          .
        </p>

        <PricingListInfo />

        {t("pricing.cancellationNotice") && (
          <p className="text-center text-sm text-gray-400 mt-6 mb-16">
            {t("pricing.cancellationNotice")}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Insurance */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white text-center md:text-left">
              {t("pricing.insurance.heading")}
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {SITE_CONFIG.insurance.map((ins) => (
                <div key={ins.key}>
                  <img
                    src={`/images/insurance/${ins.logo}`}
                    alt={ins.name}
                    title={ins.name}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bank Info */}
          <BankAccountInfo />
        </div>
      </div>
    </section>
  );
};
