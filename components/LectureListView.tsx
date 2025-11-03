import React from 'react';
import type { Lecture } from '../types';
import { useLanguage } from '../contexts';
import { ChevronLeftIcon, ChevronRightIcon, DocumentTextIcon, ArrowDownTrayIcon, ArrowUpRightIcon } from './IconComponents';

interface LectureListViewProps {
  lectures: Lecture[];
  onBack: () => void;
  stage: 'second' | 'third' | 'fourth' | null;
}

const LectureListView: React.FC<LectureListViewProps> = ({ lectures, onBack, stage }) => {
  const { language, t } = useLanguage();
  const BackIcon = language === 'ar' ? ChevronRightIcon : ChevronLeftIcon;
  
  const stageName = stage === 'second' ? t('stageSecond') : stage === 'third' ? t('stageThird') : stage === 'fourth' ? t('stageFourth') : '';

  const handleOpenFile = (fileName: string) => {
    // Assuming lecture files are in a public 'lectures' directory
    window.open(`lectures/${fileName}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <button onClick={onBack} className="flex items-center text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
          <BackIcon className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
          {t('backToList')}
        </button>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">{t('lecturesForStage', { stage: stageName })}</h2>
      </div>

      <div className="space-y-4">
        {lectures.map((lecture, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-5 flex items-center justify-between gap-4">
            <div 
              className="flex items-start gap-4 flex-grow"
            >
                <div className="flex-shrink-0 mt-1">
                    <DocumentTextIcon className="h-8 w-8 text-teal-500 dark:text-teal-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors">{lecture.title}</h3>
                    <p className="text-md text-gray-600 dark:text-gray-400 mt-1">{lecture.description}</p>
                </div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
                <button
                    onClick={() => handleOpenFile(lecture.fileName)}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
                    title={t('openFile')}
                    aria-label={`${t('openFile')}: ${lecture.title}`}
                >
                    <ArrowUpRightIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">{t('openFile')}</span>
                </button>
                <a
                    href={`lectures/${lecture.fileName}`}
                    download={lecture.fileName}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition-colors text-sm"
                    title={t('downloadFile')}
                    aria-label={`${t('downloadFile')}: ${lecture.title}`}
                >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">{t('downloadFile')}</span>
                </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureListView;