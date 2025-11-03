import React from 'react';
import type { BookDetails } from '../types';
import { useLanguage } from '../contexts';
import { ChevronLeftIcon, ChevronRightIcon, ArrowUpRightIcon } from './IconComponents';

interface BookDetailViewProps {
  details: BookDetails;
  onBack: () => void;
}

const BookDetailView: React.FC<BookDetailViewProps> = ({ details, onBack }) => {
  const { language, t } = useLanguage();
  const BackIcon = language === 'ar' ? ChevronRightIcon : ChevronLeftIcon;

  const createSearchUrl = (book: BookDetails) => {
    // This creates a more specific search query for Google Books
    const query = encodeURIComponent(`intitle:${book.title} inauthor:${book.author}`);
    return `https://www.google.com/search?tbm=bks&q=${query}`;
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
       <div className="mb-8">
         <button onClick={onBack} className="flex items-center text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
           <BackIcon className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
           {t('backToList')}
         </button>
       </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">{details.title}</h2>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mt-2">{t('bookAuthor')}: {details.author}</p>
                </div>
                <a 
                    href={createSearchUrl(details)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors shadow"
                >
                    {t('findOnline')}
                    <ArrowUpRightIcon className="w-5 h-5" />
                </a>
            </div>

            <section>
                <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-400 border-b-2 border-teal-200 dark:border-teal-800 pb-2 mb-4">{t('bookSummary')}</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{details.summary}</p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default BookDetailView;