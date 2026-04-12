import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { pricelist } from "../data/pricelist";

const AccordionItem = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; price: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, items]);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-900 hover:text-accent transition-colors focus:outline-none group"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 group-hover:text-accent transition-transform duration-500 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? contentHeight : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="pb-4 pt-2">
          <ul className="space-y-0">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between text-gray-600 border-b border-gray-100 last:border-0 pb-2 pt-2 last:pb-0"
                style={{
                  animation: isOpen ? `pricingSlideIn 0.4s ease-out ${index * 0.07}s both` : "none",
                  opacity: isOpen ? undefined : 0,
                }}
              >
                <span>{item.name}</span>
                <span className="font-medium text-gray-900 ml-4">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes pricingSlideIn {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export const PricingListInfo: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="mb-5 bg-gray-50 p-6 rounded-xl border border-gray-100">
      {pricelist.categories.map((category, idx) => {
        const lang = i18n.language as string;
        // Bezpečné získání textů; fallback na 'cs'
        const getTitle = (nameObj: any) => nameObj[lang] || nameObj["cs"];

        const isCs = lang === "cs";

        const formatPrice = (raw: string) => (isCs ? raw : raw.replace(/Kč/g, "CZK"));

        const processedItems = category.items.map((item) => ({
          name: getTitle(item.name),
          price: formatPrice(
            typeof item.price === "number"
              ? `${item.price.toLocaleString("cs-CZ")} Kč`
              : typeof item.price === "object" && item.price !== null
                ? (item.price as any)[lang] || (item.price as any)["cs"]
                : (item.price as string),
          ),
        }));

        return <AccordionItem key={idx} title={getTitle(category.name)} items={processedItems} />;
      })}
    </div>
  );
};
