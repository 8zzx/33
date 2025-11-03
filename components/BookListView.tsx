import React from 'react';
import type { Book } from '../types';
import { useLanguage } from '../contexts';
import { ChevronLeftIcon, ChevronRightIcon } from './IconComponents';

interface BookListViewProps {
  books: Book[];
  onBack: () => void;
  onBookSelect: (book: Book) => void;
}

const BookListView: React.FC<BookListViewProps> = ({ books, onBack, onBookSelect }) => {
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">{t('scientificBooksTitle')}</h2>
      </div>

      <div className="space-y-6">
        {books.map((book, index) => (
          <button
            key={index} 
            onClick={() => onBookSelect(book)}
            className="block w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg dark:hover:shadow-teal-500/10 border dark:border-gray-700 p-6 transform hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-teal-700 dark:text-teal-400">{book.title}</h3>
            <p className="text-md font-medium text-gray-600 dark:text-gray-400 mt-1 mb-3">{t('bookAuthor')}: {book.author}</p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{book.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookListView;