import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../config';
import { LanguageSwitcher } from './LanguageSwitcher';

export const HeaderSection: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#team', label: t('nav.team') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#faq', label: t('nav.faq') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center min-w-0">
            <a
              href="#"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
            >
              <img
                src="/images/logo_LbClinicDental_pod.svg"
                alt={SITE_CONFIG.brandName}
                className="h-9 w-auto max-w-[min(58vw,220px)] sm:h-11 sm:max-w-[280px] md:h-12 md:max-w-[340px] lg:h-[4.5rem] lg:max-w-[510px] object-contain object-left"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-700 hover:text-accent font-medium transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-gray-500 hover:text-accent"
                aria-label={SITE_CONFIG.email}
              >
                <Mail className="h-5 w-5 shrink-0" aria-hidden />
                <span className="hidden lg:inline text-sm font-medium whitespace-nowrap">
                  {SITE_CONFIG.email}
                </span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-gray-500 hover:text-accent"
                aria-label={SITE_CONFIG.phone}
              >
                <Phone className="h-5 w-5 shrink-0" aria-hidden />
                <span className="hidden lg:inline text-sm font-medium whitespace-nowrap">
                  {SITE_CONFIG.phone}
                </span>
              </a>
            </div>
            
            <LanguageSwitcher className="shrink-0" />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-4">
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center text-gray-500 hover:text-accent">
                <Mail className="h-5 w-5 mr-2" />
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>
            <div className="mt-3 flex items-center px-5 space-x-4">
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="flex items-center text-gray-500 hover:text-accent">
                <Phone className="h-5 w-5 mr-2" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
            </div>
            <div className="mt-4 flex justify-center px-5">
              <LanguageSwitcher onAfterChange={() => setIsMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
