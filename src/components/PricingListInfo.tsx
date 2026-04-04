import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
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

export const PricingListInfo: React.FC = () => {
  const { i18n } = useTranslation();

  return (
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
  );
};
