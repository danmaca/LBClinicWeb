import React, { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SITE_CONFIG } from "../config";

export const TeamSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  const memberBios = t("team.memberBios", { returnObjects: true }) as string[];

  // Refs for each bio <p> element
  const bioRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Track the container width so we only re-measure when width actually
  // changes — not on height-only changes (e.g. mobile address bar hide/show
  // during scroll, which fires a resize event but doesn't affect text reflow).
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef<number>(0);

  const syncBioHeights = useCallback((forceUpdate = false) => {
    const container = containerRef.current;
    if (!container) return;

    const currentWidth = container.offsetWidth;

    // Skip if width hasn't changed (unless this is the initial call or a forced update)
    if (!forceUpdate && currentWidth === lastWidthRef.current && lastWidthRef.current !== 0) {
      return;
    }
    lastWidthRef.current = currentWidth;

    const els = bioRefs.current.filter((el): el is HTMLParagraphElement => el !== null);
    if (els.length === 0) return;

    // Reset min-height so we can measure natural content heights
    els.forEach((el) => {
      el.style.minHeight = "0px";
    });

    // Use requestAnimationFrame so the reset and re-measurement happen
    // within the same frame, before the browser paints. The user never
    // sees the intermediate 0-height state (no visible jump).
    requestAnimationFrame(() => {
      const heights = els.map((el) => el.scrollHeight);
      const max = Math.max(0, ...heights);
      if (max > 0) {
        els.forEach((el) => {
          el.style.minHeight = `${max}px`;
        });
      }
    });
  }, []);

  // Sync heights after mount and whenever the language changes
  useEffect(() => {
    syncBioHeights(true);
  }, [i18n.language, syncBioHeights]);

  // Re-sync on window resize (only triggers re-measurement when width changes)
  useEffect(() => {
    const handleResize = () => syncBioHeights(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [syncBioHeights]);

  return (
    <section id="team" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
          {t("team.heading")}
        </h2>

        <div ref={containerRef} className="grid grid-cols-2 gap-4 md:gap-12 max-w-4xl mx-auto">
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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-2 pb-2 pt-8 md:px-5 md:pb-5 md:pt-16 pointer-events-none flex flex-col justify-end">
                  <h3 className="text-xs sm:text-sm md:text-xl font-bold text-white mb-0.5 md:mb-1">
                    {member.name}
                  </h3>
                  <p
                    ref={(el) => {
                      bioRefs.current[index] = el;
                    }}
                    className="text-gray-200 leading-relaxed whitespace-pre-line text-[10px] sm:text-xs md:text-sm"
                  >
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
