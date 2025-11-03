import React from 'react';
import { ExclamationTriangleIcon } from './IconComponents';
import { useLanguage } from '../contexts';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
      <ExclamationTriangleIcon className="h-16 w-16 text-red-500 dark:text-red-400 mb-4" />
      <p className="text-3xl text-red-700 dark:text-red-300 font-semibold mb-2">{t('errorTitle')}</p>
      <p className="text-xl text-red-600 dark:text-red-400 mb-6 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 dark:hover:bg-red-500 transition-colors"
      >
        {t('retry')}
      </button>
    </div>
  );
};

export default ErrorDisplay;