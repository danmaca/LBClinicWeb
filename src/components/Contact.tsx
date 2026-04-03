import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../config';

const REASON_KEYS = ["dental_hygiene", "acute_treatment", "prevention", "initial_exam", "teeth_whitening", "filling", "root_canal", "prosthetics", "extraction", "consultation", "other"] as const;
const TIME_KEYS = ["any", "morning", "afternoon"] as const;

type FormField = 'name' | 'phone' | 'email' | 'reason' | 'preferred_time' | 'message';
type FieldErrors = Partial<Record<FormField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_ORDER: FormField[] = ['name', 'phone', 'email', 'reason', 'preferred_time', 'message'];

function buildOsmEmbedUrl(lat: number, lon: number): string {
  const dLon = 0.004;
  const dLat = 0.003;
  const bbox = `${lon - dLon},${lat - dLat},${lon + dLon},${lat + dLat}`;
  const marker = `${lat},${lon}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`;
}

export const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: '',
    preferred_time: 'any',
    message: '',
    honeypot: ''
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const inputErrorClass = (field: FormField) =>
    fieldErrors[field] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FormField;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const e: FieldErrors = {};
    const name = formData.name.trim();
    if (!name) e.name = t('contact.form.validation.nameRequired');
    else if (name.length < 2) e.name = t('contact.form.validation.nameMinLength', { min: 2 });
    else if (name.length > 100) e.name = t('contact.form.validation.nameMaxLength', { max: 100 });

    const phone = formData.phone.trim();
    if (!phone) e.phone = t('contact.form.validation.phoneRequired');
    else if (phone.length < 9) e.phone = t('contact.form.validation.phoneMinLength', { min: 9 });
    else if (phone.length > 50) e.phone = t('contact.form.validation.phoneMaxLength', { max: 50 });

    const email = formData.email.trim();
    if (!email) e.email = t('contact.form.validation.emailRequired');
    else if (email.length > 100) e.email = t('contact.form.validation.emailMaxLength', { max: 100 });
    else if (!EMAIL_RE.test(email)) e.email = t('contact.form.validation.emailInvalid');

    if (!formData.reason || !REASON_KEYS.includes(formData.reason as (typeof REASON_KEYS)[number])) {
      e.reason = t('contact.form.validation.reasonRequired');
    }
    if (!formData.preferred_time || !TIME_KEYS.includes(formData.preferred_time as (typeof TIME_KEYS)[number])) {
      e.preferred_time = t('contact.form.validation.preferredTimeRequired');
    }

    if (formData.message.length > 3000) {
      e.message = t('contact.form.validation.messageMaxLength', { max: 3000 });
    }

    setFieldErrors(e);
    if (Object.keys(e).length > 0) {
      const first = FIELD_ORDER.find((f) => e[f]);
      if (first) document.getElementById(first)?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard
    if (!validateForm()) return;

    setStatus('submitting');
    
    try {
      const payload = {
        ...formData,
        lang: i18n.language
      };
      
      const response = await fetch(SITE_CONFIG.contactApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setStatus('success');
        setFieldErrors({});
        setFormData({
          name: '', phone: '', email: '', reason: '', preferred_time: 'any', message: '', honeypot: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
          {t('contact.heading')}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info & Map */}
          <div>
            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-lg text-gray-900">{SITE_CONFIG.address.street}</p>
                  <p className="text-gray-600">{SITE_CONFIG.address.zip}, {SITE_CONFIG.address.city}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-4">
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="font-semibold text-lg text-gray-900 hover:text-accent transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-4">
                  <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-lg text-gray-900 hover:text-accent transition-colors">
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-accent mt-1" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">{t('contact.hoursHeading')}</h4>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex space-x-4">
                      <span className="w-16">{t('contact.monThu')}:</span>
                      <span>8:00 – 16:00</span>
                    </div>
                    <div className="flex space-x-4">
                      <span className="w-16">{t('contact.fri')}:</span>
                      <span>8:00 – 13:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-80 rounded-lg overflow-hidden shadow-sm relative bg-gray-100">
              <iframe
                title={t('contact.mapIframeTitle')}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={buildOsmEmbedUrl(SITE_CONFIG.clinicMapCoordinates.lat, SITE_CONFIG.clinicMapCoordinates.lon)}
                className="absolute inset-0 border-0"
                allowFullScreen
              />
            </div>
            <p className="mt-2 text-center text-sm text-gray-500">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.zip} ${SITE_CONFIG.address.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {t('contact.openInGoogleMaps')}
              </a>
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.form.successMessage')}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot */}
                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('contact.form.name')} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="name"
                    aria-invalid={fieldErrors.name ? true : undefined}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border ${inputErrorClass('name')}`}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('contact.form.phone')} *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={50}
                    autoComplete="tel"
                    aria-invalid={fieldErrors.phone ? true : undefined}
                    aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border ${inputErrorClass('phone')}`}
                  />
                  {fieldErrors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('contact.form.email')} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="email"
                    aria-invalid={fieldErrors.email ? true : undefined}
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border ${inputErrorClass('email')}`}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700">{t('contact.form.reason')} *</label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    aria-invalid={fieldErrors.reason ? true : undefined}
                    aria-describedby={fieldErrors.reason ? 'reason-error' : undefined}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border bg-white ${inputErrorClass('reason')}`}
                  >
                    <option value="" disabled>{t('contact.form.reasonPlaceholder')}</option>
                    {REASON_KEYS.map((key) => (
                      <option key={key} value={key}>{t(`contact.form.reasonOptions.${key}`)}</option>
                    ))}
                  </select>
                  {fieldErrors.reason && (
                    <p id="reason-error" className="mt-1 text-sm text-red-600" role="alert">
                      {fieldErrors.reason}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700">{t('contact.form.preferredTime')} *</label>
                  <select
                    id="preferred_time"
                    name="preferred_time"
                    value={formData.preferred_time}
                    onChange={handleChange}
                    aria-invalid={fieldErrors.preferred_time ? true : undefined}
                    aria-describedby={fieldErrors.preferred_time ? 'preferred_time-error' : undefined}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border bg-white ${inputErrorClass('preferred_time')}`}
                  >
                    {TIME_KEYS.map((key) => (
                      <option key={key} value={key}>{t(`contact.form.timeOptions.${key}`)}</option>
                    ))}
                  </select>
                  {fieldErrors.preferred_time && (
                    <p id="preferred_time-error" className="mt-1 text-sm text-red-600" role="alert">
                      {fieldErrors.preferred_time}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contact.form.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={3000}
                    aria-invalid={fieldErrors.message ? true : undefined}
                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border ${inputErrorClass('message')}`}
                  />
                  {fieldErrors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>
                
                {status === 'error' && (
                  <p className="text-red-500 text-sm">{t('contact.form.errorMessage')}</p>
                )}
                
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-accent bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 transition-colors"
                >
                  {status === 'submitting' ? t('contact.form.sending') : t('contact.form.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
