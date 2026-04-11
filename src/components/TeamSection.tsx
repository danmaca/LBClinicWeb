import React from "react";
import { useTranslation } from "react-i18next";
import { SITE_CONFIG } from "../config";

export const TeamSection: React.FC = () => {
  const { t } = useTranslation();

  const memberBios = t("team.memberBios", { returnObjects: true }) as string[];

  return (
    <section id="team" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          {t("team.heading")}
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-12 max-w-4xl mx-auto">
          {SITE_CONFIG.teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col">
              {/* Photo card */}
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] group bg-gray-800">
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
                {/* Text overlay — desktop only */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 pb-5 pt-16 pointer-events-none hidden md:block">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-gray-200 leading-relaxed whitespace-pre-line text-sm">
                    {Array.isArray(memberBios) ? (memberBios[index] ?? "") : ""}
                  </p>
                </div>
              </div>

              {/* Text below photo — mobile only */}
              <div className="mt-2 md:hidden">
                <h3 className="text-sm font-bold text-white mb-1">{member.name}</h3>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line text-xs">
                  {Array.isArray(memberBios) ? (memberBios[index] ?? "") : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
