import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SITE_CONFIG } from "../config";

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

export const FAQSection: React.FC = () => {
  const { t } = useTranslation();

  const faqCount = SITE_CONFIG.faqs.count;
  const faqs = [];
  for (let i = 1; i <= faqCount; i++) {
    const answer = t(`faq.a${i}`, { returnObjects: true });
    faqs.push({
      q: t(`faq.q${i}`),
      a: Array.isArray(answer) ? answer.join("<br>") : String(answer),
    });
  }

  return (
    <section id="faq" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
          {t("faq.heading")}
        </h2>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};
