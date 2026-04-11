import React from "react";
import { useTranslation } from "react-i18next";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { AddressMap } from "./AddressMap";

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          {t("contact.heading")}
        </h2>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info & Map */}
          <div>
            <ContactInfo />
            {t("contact.parkingNotice") && (
              <p className="text-center text-xl text-gray-300 my-8">{t("contact.parkingNotice")}</p>
            )}
            <AddressMap />
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
