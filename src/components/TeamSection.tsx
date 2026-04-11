import React from "react";
import { useTranslation } from "react-i18next";
import { SITE_CONFIG } from "../config";

export const TeamSection: React.FC = () => {
  const { t } = useTranslation();

  const memberBios = t("team.memberBios", { returnObjects: true }) as string[];

  return (
    <section id="team" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
          {t("team.heading")}
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-12 max-w-4xl mx-auto">
          {SITE_CONFIG.teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col">
              {/* Photo card */}
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] group bg-gray-200">
                {/* Photo 1 */}
                <img
                  src={`./images/team/${member.photo1}`}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                />
                {/* Photo 2 (hover) */}
                <img
                  src={`./images/team/${member.photo2}`}
                  alt={`${member.name} – hover`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                />
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-2 pb-2 pt-8 md:px-5 md:pb-5 md:pt-16 pointer-events-none">
                  <h3 className="text-xs sm:text-sm md:text-xl font-bold text-white mb-0.5 md:mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-200 leading-relaxed whitespace-pre-line text-[10px] sm:text-xs md:text-sm">
                    {Array.isArray(memberBios) ? (memberBios[index] ?? "") : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
