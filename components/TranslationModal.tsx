import React from 'react';
import Loader from './Loader';
import { useLanguage } from '../contexts';

interface TranslationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isLoading: boolean;
  content: string;
  error: string | null;
}

const TranslationModal: React.FC<TranslationModalProps> = ({ isOpen, onClose, title, isLoading, content, error }) => {
  const { t, language } = useLanguage();

  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col transform transition-all duration-300 scale-95 animate-modal-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
            aria-label={t('close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {isLoading ? (
            <Loader message={t('translatingMessage')} />
          ) : error ? (
            <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
          ) : (
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-end">
            <button
                onClick={onClose}
                className="px-5 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors shadow-sm"
            >
                {t('close')}
            </button>
        </div>
      </div>
      <style>{`
        @keyframes modal-scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-scale-in {
          animation: modal-scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TranslationModal;