import React from "react";
import { useTranslation } from "react-i18next";

export const TeamSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="team" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
          {t("team.heading")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Member 1 */}
          <div className="relative overflow-hidden rounded-lg aspect-[3/4] group bg-gray-200">
            {/* Photo 1 */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
              Photo 1
            </div>
            {/* Photo 2 (hover) */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-400 text-white transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100">
              Photo 2 (Hover)
            </div>
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 pb-5 pt-16 pointer-events-none">
              <h3 className="text-xl font-bold text-white mb-1">{t("team.dr_vernerova.name")}</h3>
              <p className="text-gray-200 leading-relaxed whitespace-pre-line text-sm">
                {t("team.dr_vernerova.bio")}
              </p>
            </div>
          </div>

          {/* Member 2 */}
          <div className="relative overflow-hidden rounded-lg aspect-[3/4] group bg-gray-200">
            {/* Photo 1 */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
              Photo 1
            </div>
            {/* Photo 2 (hover) */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-400 text-white transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100">
              Photo 2 (Hover)
            </div>
            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 pb-5 pt-16 pointer-events-none">
              <h3 className="text-xl font-bold text-white mb-1">{t("team.dr_blakesova.name")}</h3>
              <p className="text-gray-200 leading-relaxed whitespace-pre-line text-sm">
                {t("team.dr_blakesova.bio")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
