import React from 'react';
import { useLanguage } from '../contexts';
import { ChevronLeftIcon, ChevronRightIcon, BeakerIcon, CpuChipIcon, UsersIcon } from './IconComponents';

interface LectureStagesViewProps {
  onBack: () => void;
  onStageSelect: (stage: 'second' | 'third' | 'fourth') => void;
}

const LectureStagesView: React.FC<LectureStagesViewProps> = ({ onBack, onStageSelect }) => {
    const { language, t } = useLanguage();
    const BackIcon = language === 'ar' ? ChevronRightIcon : ChevronLeftIcon;

    const stages = [
        { id: 'second' as const, title: t('stageSecond'), icon: BeakerIcon, iconLabel: 'Diagnostic Devices' },
        { id: 'third' as const, title: t('stageThird'), icon: CpuChipIcon, iconLabel: 'Therapeutic Devices' },
        { id: 'fourth' as const, title: t('stageFourth'), icon: UsersIcon, iconLabel: 'Rehabilitation Devices' },
    ];

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
             <div className="mb-8">
                <button onClick={onBack} className="flex items-center text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
                <BackIcon className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                {t('backToList')}
                </button>
            </div>
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">{t('lecturesListTitle')}</h2>
            </div>

            <div className="space-y-6">
                {stages.map((stage) => (
                    <button
                        key={stage.id}
                        onClick={() => onStageSelect(stage.id)}
                        className="w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg dark:hover:shadow-teal-500/10 border dark:border-gray-700 p-6 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-6"
                    >
                        <div className="flex-shrink-0 p-4 bg-teal-100 dark:bg-teal-900/50 rounded-full">
                            <stage.icon className="h-10 w-10 text-teal-600 dark:text-teal-400" aria-label={stage.iconLabel} />
                        </div>
                        <h3 className="flex-grow text-start text-2xl font-bold text-teal-700 dark:text-teal-400">{stage.title}</h3>
                        <div className="flex-shrink-0">
                            <ChevronRightIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 rtl:hidden" />
                            <ChevronLeftIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 ltr:hidden" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LectureStagesView;