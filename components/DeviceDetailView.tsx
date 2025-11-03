// FIX: Implemented the DeviceDetailView to show technical details.
import React from 'react';
import type { DeviceDetails } from '../types';
import { useLanguage } from '../contexts';
import { ChevronLeftIcon, ChevronRightIcon } from './IconComponents';

interface DeviceDetailViewProps {
  details: DeviceDetails;
  imageUrl: string;
  onBack: () => void;
}

const DeviceDetailView: React.FC<DeviceDetailViewProps> = ({ details, imageUrl, onBack }) => {
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

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <img src={imageUrl} alt={details.name} className="w-full h-64 object-cover" />
        <div className="p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">{details.name}</h2>

            <section className="mb-8">
                <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-400 border-b-2 border-teal-200 dark:border-teal-800 pb-2 mb-4">{t('principleOfOperation')}</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{details.principle}</p>
            </section>

            <section>
                <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-400 border-b-2 border-teal-200 dark:border-teal-800 pb-2 mb-4">{t('commonMalfunctions')}</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700/50">
                          <tr>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('fault')}</th>
                              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('solution')}</th>
                          </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {details.malfunctions.map((malfunction, index) => (
                              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                  <td className="px-6 py-4 whitespace-normal text-lg font-semibold text-gray-900 dark:text-gray-200">{malfunction.fault}</td>
                                  <td className="px-6 py-4 whitespace-normal text-lg text-gray-700 dark:text-gray-300">{malfunction.solution}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailView;