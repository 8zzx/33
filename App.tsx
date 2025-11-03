import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import DeviceGrid from './components/DeviceGrid';
import DeviceDetailView from './components/DeviceDetailView';
import BookListView from './components/BookListView';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import { getDeviceCategories, getDeviceDetails, getScientificBooks, getScientificBookDetails, getGlobalArticles, getConferencesAndExhibitions, translateText } from './services/geminiService';
import { useLanguage } from './contexts';
import type { DeviceCategory, Device, DeviceDetails, Book, BookDetails, Article, Conference, Lecture } from './types';
import { SearchIcon, AcademicCapIcon, ChevronLeftIcon, ChevronRightIcon, LightBulbIcon, BeakerIcon, CpuChipIcon, ComputerDesktopIcon, GlobeAltIcon, BriefcaseIcon, UsersIcon } from './components/IconComponents';
import CategoryGrid from './components/CategoryGrid';
import BookDetailView from './components/BookDetailView';
import ArticleListView from './components/ArticleListView';
import ConferenceListView from './components/ConferenceListView';
import LectureStagesView from './components/LectureStagesView';
import LectureListView from './components/LectureListView';
import TranslationModal from './components/TranslationModal';

type View = 'list' | 'details' | 'books' | 'bookDetails' | 'articles' | 'conferences' | 'studentHouse' | 'lecturesStages' | 'lecturesList';

const App: React.FC = () => {
  const { language, t } = useLanguage();

  const [view, setView] = useState<View>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<DeviceCategory[]>([]);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetails | null>(null);
  
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);

  const [articles, setArticles] = useState<Article[]>([]);
  const [conferences, setConferences] = useState<Conference[]>([]);
  
  const [selectedStage, setSelectedStage] = useState<'second' | 'third' | 'fourth' | null>(null);

  const [isTranslationModalOpen, setIsTranslationModalOpen] = useState(false);
  const [translationContent, setTranslationContent] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);


  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDeviceCategories(language);
      
      const forbiddenKeywords = [
        'المختبر', 'laboratory', 
        'الأسنان', 'dentistry', 'مراقبة', 'monitoring', 
        'جراحية', 'surgical', 'غرسات', 'implants', 
        'تصوير', 'imaging', 'منزلية', 'home healthcare', 
        'تعقيم', 'sterilization', 'دعم الحياة', 'life support',
        'غرف العمليات', 'operating room', 'نقل', 'transport'
      ];

      const filteredData = data.filter(category => 
        !forbiddenKeywords.some(keyword => 
          category.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );

      setCategories(filteredData);
      const flattenedDevices = filteredData.flatMap(category => 
        category.devices.map(device => ({
          name: device.name,
          categoryName: category.name,
          imageUrl: device.imageUrl
        }))
      );
      setAllDevices(flattenedDevices);
    } catch (err) {
      setError(t('errorMessage'));
    } finally {
      setIsLoading(false);
    }
  }, [language, t]);

  const fetchDetails = useCallback(async (deviceName: string) => {
    setIsLoading(true);
    setError(null);
    setDeviceDetails(null);
    try {
        const data = await getDeviceDetails(deviceName, language);
        setDeviceDetails(data);
        setView('details');
    } catch (err) {
        setError(t('errorMessage'));
    } finally {
        setIsLoading(false);
    }
  }, [language, t]);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setBooks([]);
    try {
        const data = await getScientificBooks(language);
        setBooks(data);
        setView('books');
    } catch (err) {
        setError(t('errorMessage'));
    } finally {
        setIsLoading(false);
    }
  }, [language, t]);

  const fetchBookDetails = useCallback(async (book: Book) => {
    setIsLoading(true);
    setError(null);
    setBookDetails(null);
    try {
        const data = await getScientificBookDetails(book, language);
        setBookDetails(data);
        setView('bookDetails');
    } catch (err) {
        setError(t('errorMessage'));
    } finally {
        setIsLoading(false);
    }
  }, [language, t]);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setArticles([]);
    try {
        const data = await getGlobalArticles(language);
        setArticles(data);
        setView('articles');
    } catch (err) {
        setError(t('errorMessage'));
    } finally {
        setIsLoading(false);
    }
  }, [language, t]);

  const fetchConferences = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setConferences([]);
    try {
        const data = await getConferencesAndExhibitions(language);
        setConferences(data);
        setView('conferences');
    } catch (err) {
        setError(t('errorMessage'));
    } finally {
        setIsLoading(false);
    }
    }, [language, t]);

  useEffect(() => {
    fetchData();
    setView('list');
    setActiveFilter('all');
    setSelectedDevice(null);
    setDeviceDetails(null);
    setSearchQuery('');
    setBooks([]);
    setSelectedBook(null);
    setBookDetails(null);
    setArticles([]);
    setConferences([]);
    setSelectedStage(null);
  }, [fetchData]);

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    fetchDetails(device.name);
  };
  
  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    fetchBookDetails(book);
  };
  
  const handleStageSelect = (stage: 'second' | 'third' | 'fourth') => {
    setSelectedStage(stage);
    setView('lecturesList');
  };

  const handleTranslateLecture = async (lecture: Lecture) => {
    setIsTranslationModalOpen(true);
    setIsTranslating(true);
    setTranslationContent('');
    setTranslationError(null);
    try {
      const translatedText = await translateText(lecture.content_en);
      setTranslationContent(translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslationError(t('errorMessage'));
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCloseTranslationModal = () => {
    setIsTranslationModalOpen(false);
    setTranslationContent('');
    setTranslationError(null);
  };

  const handleGoBack = () => {
      if (view === 'lecturesList') {
        setView('lecturesStages');
        setSelectedStage(null);
      } else if (view === 'lecturesStages') {
        setView('studentHouse');
      } else if (view === 'bookDetails') {
          setView('books');
          setSelectedBook(null);
          setBookDetails(null);
      } else if (view === 'articles' || view === 'conferences' || view === 'studentHouse') {
          setView('list');
          setArticles([]);
          setConferences([]);
      }
      else {
          setView('list');
          setSelectedDevice(null);
          setDeviceDetails(null);
          setBooks([]);
      }
  };
  
  const handleCategorySelect = (category: string) => {
    if (category === 'scientificBooks') {
      fetchBooks();
    } else if (category === 'globalArticles') {
      fetchArticles();
    } else if (category === 'conferencesAndExhibitions') {
      fetchConferences();
    } else if (category === 'studentHouse') {
      setView('studentHouse');
    }
  };

  const handleRetry = () => {
    if (view === 'bookDetails' && selectedBook) {
      fetchBookDetails(selectedBook);
    } else if (view === 'books') {
      fetchBooks();
    } else if (view === 'articles') {
        fetchArticles();
    } else if (view === 'conferences') {
        fetchConferences();
    } else if (view === 'details' && selectedDevice) {
        fetchDetails(selectedDevice.name);
    } else {
      fetchData();
    }
  };

  const getLoadingMessage = () => {
    if (view === 'bookDetails' && selectedBook) return t('loadingBookDetails', { title: selectedBook.title });
    if (view === 'details' && selectedDevice) return t('loadingDetails', { device: selectedDevice.name });
    if (view === 'books') return t('loadingBooks');
    if (view === 'articles') return t('loadingArticles');
    if (view === 'conferences') return t('loadingConferences');
    return t('loadingCategories');
  };
  
  const filteredDevices = useMemo(() => {
    const categoryFiltered = activeFilter === 'all'
      ? allDevices
      : allDevices.filter(device => device.categoryName === activeFilter);

    if (!searchQuery.trim()) {
      return categoryFiltered;
    }

    return categoryFiltered.filter(device =>
      device.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
}, [allDevices, activeFilter, searchQuery]);

const allLectures: Lecture[] = useMemo(() => [
    { 
        stage: 'second', 
        title: t('lecture_s2_1_title'), 
        description: t('lecture_s2_1_desc'), 
        fileName: 'intro_biomed_inst.pdf',
        content_en: "This lecture provides a comprehensive introduction to Biomedical Instrumentation. It covers the definition, the fundamental components of a generalized system (measurand, sensor, signal conditioning, display, etc.) with a block diagram, and the different types of instrumentation systems such as direct/indirect, invasive/non-invasive, and contact/remote."
    },
    { 
        stage: 'second', 
        title: t('lecture_s2_2_title'), 
        description: t('lecture_s2_2_desc'), 
        fileName: 'lab_medical_devices.pdf',
        content_en: "This lecture defines medical instrumentation as the use of technology to measure, record, and analyze biological signals for medical purposes. It covers the wide range of applications across medicine, including diagnostic, monitoring, therapeutic, and clinical laboratory uses. The lecture also outlines the key functions of these instruments, such as signal measurement, diagnosis through data analysis, and therapeutic intervention."
    },
    { 
        stage: 'second', 
        title: t('lecture_s2_3_title'), 
        description: t('lecture_s2_3_desc'), 
        fileName: 'classification_medical_instruments.pdf',
        content_en: "This lecture provides a comprehensive classification of medical instruments. It details several key categories, including: Diagnostic Instruments used to identify diseases (e.g., stethoscopes, ECGs); Surgical Instruments for procedures; Therapeutic Instruments for treatment (e.g., nebulizers, pacemakers); Monitoring Instruments for vital signs; Laboratory Instruments for sample analysis; and General Purpose Instruments like syringes and catheters."
    },
    { 
        stage: 'second', 
        title: t('lecture_s2_4_title'), 
        description: t('lecture_s2_4_desc'), 
        fileName: 'patient_safety.pdf',
        content_en: "This lecture covers the critical topic of Patient Safety. It defines the concept and explores key areas including error prevention and management, common types of medical errors (diagnostic, medication, surgical), and the establishment of safe practices like checklists and infection control. The role of patient-centered care, technological solutions such as EHRs, and global improvement initiatives are also discussed."
    },
    { 
        stage: 'second', 
        title: t('lecture_s2_5_title'), 
        description: t('lecture_s2_5_desc'), 
        fileName: 'hospital_design.pdf',
        content_en: "This lecture covers the fundamental principles of hospital design. Key topics include functional zoning to improve workflow, enhancing the patient experience through a healing environment, and critical systems like infection control and emergency preparedness. It also details the essential electrical, plumbing, and fire safety systems required in a modern hospital."
    },
    { 
        stage: 'second', 
        title: t('lecture_s2_6_title'), 
        description: t('lecture_s2_6_desc'), 
        fileName: 'operating_room_design.pdf',
        content_en: "This lecture details the principles of Operating Room (OR) design. It covers crucial aspects such as infection control through airflow management, workflow efficiency, and safety protocols. Essential features like layout, lighting, and ventilation systems are discussed, along with modern considerations like technological integration and noise control. The lecture also touches on future trends, including hybrid ORs and robotic surgery setups."
    },
    { 
        stage: 'second', 
        title: t('lecture_s2_7_title'), 
        description: t('lecture_s2_7_desc'), 
        fileName: 'spectrophotometer.pdf',
        content_en: "This lecture covers the Spectrophotometer. It explains its definition as an instrument that measures light absorption, its working principle based on Beer-Lambert's Law, its main components (light source, monochromator, cuvette, detector), and the basic procedure for its use, including calibration and sample measurement."
    },
    { 
        stage: 'third', 
        title: t('lecture_s3_1_title'), 
        description: t('lecture_s3_1_desc'), 
        fileName: 'therapeutic_devices_ventilators.pdf',
        content_en: 'This lecture provides an in-depth look at mechanical ventilators. We will cover the different modes of ventilation, key parameters (like tidal volume, pressure, and flow), and the common alarms and troubleshooting procedures associated with their use in clinical settings.'
    },
    { 
        stage: 'third', 
        title: t('lecture_s3_2_title'), 
        description: t('lecture_s3_2_desc'), 
        fileName: 'therapeutic_devices_defibrillators.pdf',
        content_en: 'A detailed examination of defibrillators and pacemakers. This session explains the electrophysiology of cardiac arrhythmias, the principles of defibrillation, and the technology behind both external and implantable cardiac devices.'
    },
    { 
        stage: 'fourth', 
        title: t('lecture_s4_1_title'), 
        description: t('lecture_s4_1_desc'), 
        fileName: 'rehabilitation_engineering.pdf',
        content_en: 'This lecture explores the field of rehabilitation engineering. We will discuss the design and application of devices that assist individuals with disabilities, including prosthetic limbs, orthotics, TENS units for pain management, and advanced mobility aids.'
    },
    { 
        stage: 'fourth', 
        title: t('lecture_s4_2_title'), 
        description: t('lecture_s4_2_desc'), 
        fileName: 'advanced_surgical_robotics.pdf',
        content_en: 'An introduction to the cutting-edge field of surgical robotics. This lecture focuses on systems like the da Vinci Surgical System, covering its components, degrees of freedom, and its impact on minimally invasive surgery. We will also touch on future trends in medical robotics.'
    },
], [t]);


  const renderContent = () => {
    if (isLoading && allDevices.length === 0 && books.length === 0 && !bookDetails && articles.length === 0 && conferences.length === 0) {
      return <Loader message={getLoadingMessage()} />;
    }
    if (error) {
      return <ErrorDisplay message={error} onRetry={handleRetry} />;
    }

    if (view === 'details') {
        return isLoading ? <Loader message={getLoadingMessage()} /> : 
               (deviceDetails && selectedDevice) && <DeviceDetailView details={deviceDetails} imageUrl={selectedDevice.imageUrl} onBack={handleGoBack} />;
    }
    
    if (view === 'bookDetails') {
        return isLoading ? <Loader message={getLoadingMessage()} /> : 
               bookDetails && <BookDetailView details={bookDetails} onBack={handleGoBack} />;
    }

    if (view === 'books') {
      return isLoading ? <Loader message={getLoadingMessage()} /> :
             <BookListView books={books} onBack={handleGoBack} onBookSelect={handleBookSelect} />;
    }

    if (view === 'articles') {
        return isLoading ? <Loader message={getLoadingMessage()} /> :
               <ArticleListView articles={articles} onBack={handleGoBack} />;
    }

    if (view === 'conferences') {
        return isLoading ? <Loader message={getLoadingMessage()} /> :
               <ConferenceListView conferences={conferences} onBack={handleGoBack} />;
    }

    if (view === 'lecturesStages') {
        return <LectureStagesView onBack={handleGoBack} onStageSelect={handleStageSelect} />;
    }

    if (view === 'lecturesList') {
        const lecturesForStage = allLectures.filter(l => l.stage === selectedStage);
        return <LectureListView lectures={lecturesForStage} onBack={handleGoBack} stage={selectedStage} />;
    }


    if (view === 'studentHouse') {
      const BackIcon = language === 'ar' ? ChevronRightIcon : ChevronLeftIcon;
      const ForwardIcon = language === 'ar' ? ChevronLeftIcon : ChevronRightIcon;

      const studentResources: { title: string; items?: { icon: React.FC<React.SVGProps<SVGSVGElement>>; text: string }[]; comingSoon?: boolean; isClickable?: boolean; description?: string; onClick?: () => void;}[] = [
        {
          title: t('projectsSectionTitle'),
          comingSoon: true,
        },
        {
          title: t('lecturesSectionTitle'),
          isClickable: true,
          description: t('lecturesSectionDescription'),
          onClick: () => setView('lecturesStages'),
        },
        {
          title: t('careerSectionTitle'),
          items: [
            { icon: BriefcaseIcon, text: t('career1') },
            { icon: UsersIcon, text: t('career2') },
            { icon: ComputerDesktopIcon, text: t('career3') },
          ]
        },
      ];
      
      return (
        <div className="animate-fade-in max-w-4xl mx-auto">
          <div className="mb-8">
            <button onClick={handleGoBack} className="flex items-center text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors">
              <BackIcon className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
              {t('backToList')}
            </button>
          </div>
          <div className="text-center p-8 sm:p-12 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 mb-12">
             <div className="flex justify-center mb-4">
                 <div className="p-4 bg-teal-100 dark:bg-teal-900/50 rounded-full">
                    <AcademicCapIcon className="h-12 w-12 text-teal-600 dark:text-teal-400" />
                 </div>
             </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('studentHouseTitle')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{t('studentHouseSubtitle')}</p>
          </div>

          <div className="space-y-10">
            {studentResources.map((section, index) => (
              <div key={index}>
                {section.isClickable ? (
                  <button onClick={section.onClick} className="w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 hover:shadow-lg dark:hover:shadow-teal-500/10 hover:border-teal-500/30 transform hover:-translate-y-1 transition-all duration-300 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-2">{section.title}</h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300">{section.description}</p>
                    </div>
                    <ForwardIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </button>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-5">{section.title}</h3>
                    {section.comingSoon ? (
                       <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                          <p className="text-lg text-gray-500 dark:text-gray-400">{t('comingSoon')}</p>
                      </div>
                    ) : (
                      <ul className="space-y-4">
                        {section.items && section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              <item.icon className="h-6 w-6 text-teal-500 dark:text-teal-400" />
                            </div>
                            <span className="text-lg text-gray-700 dark:text-gray-300">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
        <div className="animate-fade-in">
             <div className="text-center pt-8 pb-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 pb-2">
                    {t('appTitle')}
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {t('appSubtitle')}
                </p>
            </div>
            
            <div className="py-8">
                <CategoryGrid onCategorySelect={handleCategorySelect} />
            </div>

            <hr className="border-gray-200 dark:border-gray-700 my-4" />
            
            <div className="my-8 max-w-2xl mx-auto">
                <label htmlFor="device-search" className="sr-only">{t('searchPlaceholder')}</label>
                <div className="relative">
                    <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-4 rtl:pr-4 pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="search"
                        id="device-search"
                        className="block w-full p-4 ltr:pl-11 rtl:pr-11 text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                        placeholder={t('searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label={t('searchPlaceholder')}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center flex-wrap gap-3 mb-10">
                <button 
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-2 text-base font-semibold rounded-full transition-colors duration-200 ${activeFilter === 'all' ? 'bg-teal-600 text-white shadow' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                    {t('all')}
                </button>
                {categories.map(category => (
                    <button 
                        key={category.name}
                        onClick={() => setActiveFilter(category.name)}
                        className={`px-4 py-2 text-base font-semibold rounded-full transition-colors duration-200 ${activeFilter === category.name ? 'bg-teal-600 text-white shadow' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <DeviceGrid devices={filteredDevices} onDeviceSelect={handleDeviceSelect} />
        </div>
    )
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {renderContent()}
      </main>
      <TranslationModal 
        isOpen={isTranslationModalOpen}
        isLoading={isTranslating}
        content={translationContent}
        error={translationError}
        onClose={handleCloseTranslationModal}
        title={t('translationModalTitle')}
      />
    </div>
  );
};

export default App;