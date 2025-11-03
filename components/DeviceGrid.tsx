// FIX: Implemented the DeviceGrid component to display devices of a category.
import React from 'react';
import type { Device } from '../types';
import { useLanguage } from '../contexts';
import { ChevronLeftIcon, ArrowRightIcon } from './IconComponents';

interface DeviceGridProps {
  devices: Device[];
  onDeviceSelect: (device: Device) => void;
}

const DeviceGrid: React.FC<DeviceGridProps> = ({ devices, onDeviceSelect }) => {
  const { language, t } = useLanguage();
  const ArrowIcon = language === 'ar' ? ChevronLeftIcon : ArrowRightIcon;

  return (
    <div className="animate-fade-in">
       {devices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <button
              key={device.name}
              onClick={() => onDeviceSelect(device)}
              className="group relative flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg dark:hover:shadow-teal-500/10 border dark:border-gray-700 hover:border-teal-500/30 transform hover:-translate-y-1 transition-all duration-300 text-start overflow-hidden"
            >
              <div className="h-40 overflow-hidden">
                  <img src={device.imageUrl} alt={device.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 px-2 py-1 rounded-full">{device.categoryName}</span>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mt-3">
                    {device.name}
                  </h3>
                </div>
                <div className="flex justify-start mt-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg group-hover:bg-teal-700 dark:group-hover:bg-teal-500 transition-colors text-sm shadow">
                        {t('viewMore')}
                        <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" />
                    </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">No devices found for this filter.</p>
        </div>
      )}
    </div>
  );
};

export default DeviceGrid;