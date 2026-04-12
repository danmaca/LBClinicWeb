import React from "react";
import { useTranslation } from "react-i18next";
import { SITE_CONFIG } from "../config";

export const InsuranceCompaniesInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-xl font-bold mb-6 text-gray-900 text-center md:text-left">
        {t("insurance.heading")}
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {SITE_CONFIG.insurance.map((ins) => (
          <div key={ins.key}>
            <img
              src={`./images/insurance/${ins.logo}`}
              alt={ins.name}
              title={ins.name}
              className="max-h-12 max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
