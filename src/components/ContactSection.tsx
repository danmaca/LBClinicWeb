import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { AddressMap } from './AddressMap';
import { TestContactForm } from './TestContactForm';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
          {t('contact.heading')}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info & Map */}
          <div>
            <ContactInfo />
            <AddressMap />
          </div>

          {/* Contact Form */}
          <ContactForm />
          <TestContactForm />
        </div>
      </div>
    </section>
  );
};
