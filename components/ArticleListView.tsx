import React from 'react';
import type { Article } from '../types';
import { useLanguage } from '../contexts';
import { ChevronLeftIcon, ChevronRightIcon, ArrowUpRightIcon } from './IconComponents';

interface ArticleListViewProps {
  articles: Article[];
  onBack: () => void;
}

const ArticleListView: React.FC<ArticleListViewProps> = ({ articles, onBack }) => {
  const { language, t } = useLanguage();
  const BackIcon = language === 'ar' ? ChevronRightIcon : ChevronLeftIcon;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <button onClick={onBack} className="flex items-center text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
          <BackIcon className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
          {t('backToList')}
        </button>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">{t('globalArticlesTitle')}</h2>
      </div>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold text-teal-700 dark:text-teal-400">{article.title}</h3>
            <p className="text-md font-medium text-gray-600 dark:text-gray-400 mt-1">{t('articleAuthors')}: {article.authors}</p>
            <p className="text-sm italic text-gray-500 dark:text-gray-500 mb-3">{t('articleJournal')}: {article.journal}</p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{article.summary}</p>
            <a 
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors text-sm"
            >
                {t('readArticle')}
                <ArrowUpRightIcon className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleListView;