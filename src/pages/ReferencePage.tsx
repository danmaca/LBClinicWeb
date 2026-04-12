import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "../router/PageLayout";

interface ReferenceItem {
  personName: string;
  text: string;
}

export const ReferencePage: React.FC = () => {
  const { t } = useTranslation();

  // Scroll to top when the page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const items = t("references.items", { returnObjects: true }) as ReferenceItem[];

  return (
    <PageLayout>
      <div className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
            {t("references.heading")}
          </h1>

          {/* Testimonial cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(items) &&
              items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between bg-gray-50 rounded-2xl p-8 transition-shadow duration-300 hover:shadow-md"
                >
                  {/* Quote mark */}
                  <div>
                    <div className="text-8xl font-serif leading-none text-gray-800 select-none overflow-visible">
                      &ldquo;
                    </div>

                    {/* Review text */}
                    <p className="text-gray-700 text-base leading-relaxed -mt-10">{item.text}</p>

                    <div className="text-8xl font-serif leading-none text-gray-800 select-none mt-0 text-right">
                      &rdquo;
                    </div>
                  </div>

                  {/* Person name */}
                  <div className="-mt-10 text-right">
                    <span className="text-gray-900 font-semibold text-base">{item.personName}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
