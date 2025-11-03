import React from 'react';
import { useLanguage } from '../contexts';
import { BookOpenIcon, NewspaperIcon, UsersIcon, AcademicCapIcon } from './IconComponents';

interface CategoryGridProps {
    onCategorySelect: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
    const { t } = useLanguage();

    const categories = [
        { name: t('scientificBooks'), icon: BookOpenIcon, internalName: 'scientificBooks' },
        { name: t('globalArticles'), icon: NewspaperIcon, internalName: 'globalArticles' },
        { name: t('conferencesAndExhibitions'), icon: UsersIcon, internalName: 'conferencesAndExhibitions' },
        { name: t('studentHouse'), icon: AcademicCapIcon, internalName: 'studentHouse' },
    ];

    return (
        <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => onCategorySelect(category.internalName)}
                        className="group flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-teal-500/10 border dark:border-gray-700 hover:border-teal-500/30 transform hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="mb-3 p-3 bg-teal-100 dark:bg-teal-900/50 rounded-full group-hover:bg-teal-200 dark:group-hover:bg-teal-800 transition-colors">
                            <category.icon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-700 dark:text-gray-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {category.name}
                        </h3>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryGrid;