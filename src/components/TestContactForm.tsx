import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE_CONFIG } from '../config';

export const TestContactForm: React.FC = () => {
  const { i18n } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleTestSubmit = async () => {
    setStatus('submitting');
    setMessage('');

    try {
      const testData = {
        name: 'Test User',
        phone: '+420 123 456 789',
        email: 'test@example.com',
        reason: 'dental_hygiene',
        preferred_time: 'any',
        message: 'Toto je testovací zpráva.',
        lang: i18n.language,
        honeypot: ''
      };

      const response = await fetch(SITE_CONFIG.contactApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(responseData.message || 'Testovací formulář byl úspěšně odeslán!');
      } else {
        setStatus('error');
        setMessage(responseData.message || `Chyba: Server vrátil status ${response.status}`);
      }
    } catch (err) {
      setStatus('error');
      setMessage(`Chyba: ${err instanceof Error ? err.message : 'Neznámá chyba'}`);
    }
  };

  return (
    <div className="mt-6 p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
      <h4 className="font-bold text-yellow-900 mb-2">Test odesílání formuláře</h4>
      <p className="text-sm text-yellow-800 mb-4">
        Kliknutím na tlačítko níže se odešle testovací zpráva na PHP server.
      </p>
      
      <button
        onClick={handleTestSubmit}
        disabled={status === 'submitting'}
        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 transition-colors font-medium"
      >
        {status === 'submitting' ? 'Odesílám...' : 'Test odesílání'}
      </button>

      {message && (
        <div className={`mt-3 p-3 rounded text-sm ${
          status === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};
