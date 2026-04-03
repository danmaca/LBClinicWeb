import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../config';

export const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: '',
    preferred_time: '',
    message: '',
    honeypot: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard
    
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
        setFormData({
          name: '', phone: '', email: '', reason: '', preferred_time: '', message: '', honeypot: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const reasonKeys = ["dental_hygiene", "acute_treatment", "prevention", "initial_exam", "teeth_whitening", "filling", "root_canal", "prosthetics", "extraction", "consultation", "other"];
  const timeKeys = ["any", "morning", "afternoon"];

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

            {/* Map Placeholder */}
            <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden shadow-sm relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" style={{ border: 0 }} 
                  src={`https://www.google.com/maps/embed/v1/place?key={YOUR_API_KEY}&q=${SITE_CONFIG.googleMapsEmbedQuery}`} 
                  allowFullScreen
                  className="absolute inset-0 grayscale"
                ></iframe>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-10 flex items-center justify-center pointer-events-none">
                     <span className="bg-white px-4 py-2 rounded text-sm text-gray-800">Map Embed Preview</span>
                </div>
            </div>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('contact.form.name')} *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} minLength={2} maxLength={100}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border" />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('contact.form.phone')} *</label>
                  <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} maxLength={50} minLength={9}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('contact.form.email')} *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} maxLength={100}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border" />
                </div>
                
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700">{t('contact.form.reason')} *</label>
                  <select id="reason" name="reason" required value={formData.reason} onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border bg-white"
                  >
                    <option value="" disabled>{t('contact.form.reasonPlaceholder')}</option>
                    {reasonKeys.map(key => (
                      <option key={key} value={key}>{t(`contact.form.reasonOptions.${key}`)}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700">{t('contact.form.preferredTime')} *</label>
                  <select id="preferred_time" name="preferred_time" required value={formData.preferred_time} onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border bg-white"
                  >
                    {timeKeys.map(key => (
                      <option key={key} value={key}>{t(`contact.form.timeOptions.${key}`)}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contact.form.message')}</label>
                  <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} maxLength={3000}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm py-3 px-4 border" />
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
