import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SITE_CONFIG } from '../config';
import { pricelist } from '../data/pricelist';

const AccordionItem = ({ title, items }: { title: string, items: { name: string, price: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-900 hover:text-accent transition-colors focus:outline-none"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="pb-4 pt-2">
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between text-gray-600 border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                <span>{item.name}</span>
                <span className="font-medium">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const Pricing: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-black">
          {t('pricing.heading')}
        </h2>
        <p className="text-center text-gray-600 mb-12">
          {t('pricing.description')} <a href="#contact" className="text-accent hover:underline">Kontaktujte nás</a>.
        </p>

        <div className="mb-16 bg-gray-50 p-6 rounded-xl border border-gray-100">
          {pricelist.categories.map((category, idx) => {
            const lang = i18n.language as string;
            // Bezpečné získání textů; fallback na 'cs'
            const getTitle = (nameObj: any) => nameObj[lang] || nameObj['cs'];

            const processedItems = category.items.map(item => ({
              name: getTitle(item.name),
              price: typeof item.price === 'number' ? `${item.price.toLocaleString('cs-CZ')} Kč` : item.price as string
            }));

            return (
              <AccordionItem
                key={idx}
                title={getTitle(category.name)}
                items={processedItems}
              />
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bank Info */}
          <div className="bg-gray-50 p-8 rounded-xl flex flex-col items-center border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-900">{t('pricing.bankInfo.heading')}</h3>
            <div className="w-full mb-6 space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>{t('pricing.bankInfo.accountLabel')}:</span>
                <span className="font-medium text-gray-900">{SITE_CONFIG.bankAccount.number}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('pricing.bankInfo.bankLabel')}:</span>
                <span className="font-medium text-gray-900">{SITE_CONFIG.bankAccount.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('pricing.bankInfo.recipientLabel')}:</span>
                <span className="font-medium text-gray-900">{SITE_CONFIG.bankAccount.recipientName}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <QRCodeSVG value={SITE_CONFIG.bankAccount.spdString} size={160} />
            </div>
            <p className="text-sm text-gray-500">{t('pricing.bankInfo.qrLabel')}</p>
          </div>

          {/* Insurance */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900 text-center md:text-left">{t('pricing.insurance.heading')}</h3>
            <div className="grid grid-cols-2 gap-6">
              {SITE_CONFIG.insurance.map((ins) => (
                <div key={ins.key}>
                  <img src={ins.logo} alt={ins.name} title={ins.name} className="max-h-12 max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
