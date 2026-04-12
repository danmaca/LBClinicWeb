import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PageLayout } from "../router/PageLayout";

interface TreatmentItem {
  title: string;
  desc: string;
  img: string;
  enabled: boolean;
}

export const TreatmentPage: React.FC = () => {
  const { t } = useTranslation();

  // Scroll to top when the page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let items = t("treatments.items", { returnObjects: true }) as TreatmentItem[];
  items = items.filter((item) => item.enabled !== false);

  return (
    <PageLayout>
      <div className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-black">
            {t("treatments.heading")}
          </h1>

          {/* Intro */}
          <p className="max-w-3xl mx-auto text-center text-gray-600 text-lg leading-relaxed mb-16">
            {t("treatments.intro")}
          </p>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.isArray(items) &&
              items.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 p-6"
                >
                  {/* Accent top bar */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-accent/60 rounded-b opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="h-8 w-8 shrink-0 bg-gray-700 group-hover:bg-accent transition-colors duration-300"
                      role="img"
                      aria-hidden="true"
                      style={{
                        WebkitMaskImage: `url(./images/treatment/${item.img})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskImage: `url(./images/treatment/${item.img})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                      }}
                    />
                    <h3 className="text-lg font-semibold text-black group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed pl-11">{item.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
