import React from 'react';
import { useTranslation } from 'react-i18next';

export const TeamSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
          {t('team.heading')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Member 1 */}
          <div className="flex flex-col">
            <div className="relative overflow-hidden rounded-lg aspect-[3/4] group mb-6 bg-gray-200">
              {/* Photo 1 */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
                Photo 1
              </div>
              {/* Photo 2 (hover) */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-400 text-white transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                Photo 2 (Hover)
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{t('team.dr_vernerova.name')}</h3>
            <p className="text-[#D4A853] font-medium mb-4">{t('team.dr_vernerova.position')}</p>
            <p className="text-gray-600 leading-relaxed">
              {t('team.dr_vernerova.bio')}
            </p>
          </div>

          {/* Member 2 */}
          <div className="flex flex-col">
            <div className="relative overflow-hidden rounded-lg aspect-[3/4] group mb-6 bg-gray-200">
              {/* Photo 1 */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
                Photo 1
              </div>
              {/* Photo 2 (hover) */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-400 text-white transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                Photo 2 (Hover)
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{t('team.dr_blakesova.name')}</h3>
            <p className="text-[#D4A853] font-medium mb-4">{t('team.dr_blakesova.position')}</p>
            <p className="text-gray-600 leading-relaxed">
              {t('team.dr_blakesova.bio')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
