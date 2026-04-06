import React from "react";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";
import { SITE_CONFIG } from "../config";

export const BankAccountInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 p-8 rounded-xl flex flex-col items-center border border-gray-100">
      <h3 className="text-xl font-bold mb-6 text-gray-900">{t("pricing.bankInfo.heading")}</h3>
      <div className="w-full mb-6 space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>{t("pricing.bankInfo.accountLabel")}:</span>
          <span className="font-medium text-gray-900">{SITE_CONFIG.bankAccount.number}</span>
        </div>
        <div className="flex justify-between">
          <span>{t("pricing.bankInfo.bankLabel")}:</span>
          <span className="font-medium text-gray-900">{SITE_CONFIG.bankAccount.bankName}</span>
        </div>
        <div className="flex justify-between">
          <span>{t("pricing.bankInfo.recipientLabel")}:</span>
          <span className="font-medium text-gray-900">{SITE_CONFIG.bankAccount.recipientName}</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <QRCodeSVG value={SITE_CONFIG.bankAccount.spdString} size={160} />
      </div>
      <p className="text-sm text-gray-500">{t("pricing.bankInfo.qrLabel")}</p>
    </div>
  );
};
