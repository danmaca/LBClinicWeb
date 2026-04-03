import React from 'react';
import { useTranslation } from 'react-i18next';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="pt-28 pb-20 min-h-[80vh] flex flex-col justify-center bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10 md:mt-0">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <p className="text-md text-gray-500 mb-10 font-medium">
          {t('hero.hours')}
        </p>
        
        <a 
          href="#contact" 
          className="inline-block bg-black text-[#D4A853] px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm"
        >
          {t('hero.cta')}
        </a>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-20">
          <div className="text-center group">
            <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3] w-full max-w-[320px] mx-auto bg-gray-100">
               {/* Using placeholder for now, replace real image later */}
               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                 Before Image Placeholder
               </div>
            </div>
            <p className="mt-4 font-semibold text-gray-800">{t('hero.before')}</p>
          </div>
          <div className="text-center group">
            <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3] w-full max-w-[320px] mx-auto bg-gray-100">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                 After Image Placeholder
               </div>
            </div>
            <p className="mt-4 font-semibold text-gray-800">{t('hero.after')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
