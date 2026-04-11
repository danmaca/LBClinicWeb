import React from "react";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";
import { SITE_CONFIG } from "../config";

export const BankAccountInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-white">{t("pricing.bankInfo.heading")}</h3>
      <div className="bg-gray-900 p-8 rounded-xl flex flex-col items-center">
        <div className="w-full mb-6 space-y-2 text-gray-300">
          <div className="flex justify-between">
            <span>{t("pricing.bankInfo.accountLabel")}:</span>
            <span className="font-medium text-white">{SITE_CONFIG.bankAccount.number}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("pricing.bankInfo.bankLabel")}:</span>
            <span className="font-medium text-white">{SITE_CONFIG.bankAccount.bankName}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("pricing.bankInfo.recipientLabel")}:</span>
            <span className="font-medium text-white">{SITE_CONFIG.bankAccount.recipientName}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg">
          <QRCodeSVG value={SITE_CONFIG.bankAccount.spdString} size={180} />
          <p className="text-black font-bold text-lg mt-3 border-t-2 border-black pt-1 text-center">
            QR Platba
          </p>
        </div>
      </div>
    </div>
  );
};
