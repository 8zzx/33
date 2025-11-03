// FIX: Implemented the Header component with theme and language switchers.
import React from 'react';
import { useTheme, useLanguage } from '../contexts';
import { SunIcon, MoonIcon, StethoscopeIcon, LanguageIcon } from './IconComponents';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 shadow-sm dark:shadow-gray-800 mb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <StethoscopeIcon className="h-7 w-7 text-teal-600 dark:text-teal-400" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('appTitle')}</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
             <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
              aria-label={t('language')}
            >
              <LanguageIcon className="h-[18px] w-[18px]" />
              <span className="text-sm font-semibold">{language.toUpperCase()}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
              aria-label={t('toggleTheme')}
            >
              {theme === 'light' ? <MoonIcon className="h-[18px] w-[18px]" /> : <SunIcon className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;