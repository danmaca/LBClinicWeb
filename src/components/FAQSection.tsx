import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp } from "lucide-react";

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="font-semibold text-lg text-gray-900 group-hover:text-accent transition-colors pr-8">
          {question}
        </span>
        <span className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-6 w-6 text-accent" />
          ) : (
            <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-accent" />
          )}
        </span>
      </button>
      {isOpen && (
        <div
          className="mt-4 text-gray-600 prose prose-slate whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}
    </div>
  );
};

interface FaqItemData {
  question: string;
  answer: string | string[];
}

export const FAQSection: React.FC = () => {
  const { t } = useTranslation();

  const items = t("faq.items", { returnObjects: true }) as FaqItemData[];

  return (
    <section id="faq" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
          {t("faq.heading")}
        </h2>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          {Array.isArray(items) &&
            items.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={Array.isArray(faq.answer) ? faq.answer.join("<br>") : String(faq.answer)}
              />
            ))}
        </div>

        <p className="text-center text-gray-500 mt-8">
          {t("faq.contactPromptBefore")}
          <a href="#contact" className="text-accent hover:underline font-medium">
            {t("faq.contactPromptLink")}
          </a>
          {t("faq.contactPromptAfter")}
        </p>
      </div>
    </section>
  );
};
