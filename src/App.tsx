/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Main Application Orchestrator with Citizen & Multi-Admin Workspaces
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import {
  LandService,
  ServiceCategory,
  GovernmentInstitution,
  OfficialSource
} from './types/bilsp';
import { AdminUser } from './types/authAndGeo';
import { apiClient } from './services/apiClient';

// Public Portal Components
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { PopularServices } from './components/PopularServices';
import { TaskBrowser } from './components/TaskBrowser';
import { InstitutionBrowser } from './components/InstitutionBrowser';
import { HomeNoticesFaq } from './components/HomeNoticesFaq';
import { ServiceDirectory } from './components/ServiceDirectory';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { DepartureNoticeModal } from './components/DepartureNoticeModal';
import { CitizenMyDesk } from './components/CitizenMyDesk';
import { LandOfficeFinder } from './components/LandOfficeFinder';
import { AdminPortal } from './components/AdminPortal';
import { Footer } from './components/Footer';

// New Authentication & Workspaces Components
import { AuthPage } from './components/auth/AuthPage';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { RecordsAndTaxWorkspace } from './components/admin/workspaces/RecordsAndTaxWorkspace';
import { SurveyAndMappingWorkspace } from './components/admin/workspaces/SurveyAndMappingWorkspace';
import { DeedRegistrationWorkspace } from './components/admin/workspaces/DeedRegistrationWorkspace';
import { LandAIAssistantModal } from './components/ai/LandAIAssistantModal';
import { BhumiSutraView } from './components/BhumiSutraView';
import { BangladeshInteractiveMap } from './components/citizen/BangladeshInteractiveMap';

import { PhoneCall, ExternalLink, CheckCircle2, ShieldCheck, Clock, Globe, Bot, Sparkles, Map } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { language, t, toBnNum } = useLanguage();
  const { currentUser, userType } = useAuth();

  const [currentView, setCurrentView] = useState<string>('home');
  const [services, setServices] = useState<LandService[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [institutions, setInstitutions] = useState<GovernmentInstitution[]>([]);
  const [sources, setSources] = useState<OfficialSource[]>([]);
  const [savedServiceIds, setSavedServiceIds] = useState<string[]>([]);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  // Modals
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState<LandService | null>(null);
  const [selectedServiceForDeparture, setSelectedServiceForDeparture] = useState<LandService | null>(null);
  const [searchQueryForDirectory, setSearchQueryForDirectory] = useState<string>('');

  useEffect(() => {
    loadData();
    setSavedServiceIds(apiClient.getSavedServiceIds());
  }, []);

  const loadData = async () => {
    const [srv, cat, inst, src] = await Promise.all([
      apiClient.getServices(),
      apiClient.getCategories(),
      apiClient.getInstitutions(),
      apiClient.getOfficialSources(),
    ]);
    setServices(srv);
    setCategories(cat);
    setInstitutions(inst);
    setSources(src);
  };

  const handleToggleSave = (serviceId: string) => {
    apiClient.toggleSavedService(serviceId);
    setSavedServiceIds(apiClient.getSavedServiceIds());
  };

  const handleSearchSubmitFromHero = (query: string) => {
    setSearchQueryForDirectory(query);
    setCurrentView('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceDetail = (service: LandService) => {
    setSelectedServiceForDetail(service);
  };

  const handleLaunchExternal = (service: LandService) => {
    setSelectedServiceForDeparture(service);
  };

  const handleConfirmDeparture = (targetUrl: string) => {
    setSelectedServiceForDeparture(null);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAuthSuccess = (target: 'citizen' | 'admin-cat1' | 'admin-cat2' | 'admin-cat3') => {
    if (target === 'citizen') {
      setCurrentView('citizen-dashboard');
    } else {
      setCurrentView('admin-workspace');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user accesses Auth View
  if (currentView === 'auth') {
    return (
      <AuthPage
        onSuccess={handleAuthSuccess}
        onBackToPortal={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // If admin is in admin workspace
  if (currentView === 'admin-workspace') {
    if (!currentUser || userType !== 'ADMIN') {
      return (
        <AuthPage
          onSuccess={handleAuthSuccess}
          onBackToPortal={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }

    const admin = currentUser as AdminUser;
    if (admin.category === 'CATEGORY_1_RECORDS_TAX') {
      return <RecordsAndTaxWorkspace onExitToPortal={() => setCurrentView('home')} />;
    } else if (admin.category === 'CATEGORY_2_SURVEY_MAPPING') {
      return <SurveyAndMappingWorkspace onExitToPortal={() => setCurrentView('home')} />;
    } else if (admin.category === 'CATEGORY_3_DEED_REGISTRATION') {
      return <DeedRegistrationWorkspace onExitToPortal={() => setCurrentView('home')} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Hind_Siliguri','Inter',sans-serif]">
      {/* Header */}
      <Header
        currentView={currentView}
        setCurrentView={(view) => {
          if (view === 'services') setSearchQueryForDirectory('');
          setCurrentView(view);
        }}
        savedCount={savedServiceIds.length}
        onOpenAIModal={() => setIsAIModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            {/* 1. Hero Search */}
            <HeroSearch
              onSearchSubmit={handleSearchSubmitFromHero}
              onSelectService={handleSelectServiceDetail}
              services={services}
            />

            {/* 2. Popular Services (Top 8 Cards) */}
            <PopularServices
              services={services}
              onSelectService={handleSelectServiceDetail}
              onLaunchExternal={handleLaunchExternal}
              savedServiceIds={savedServiceIds}
              onToggleSave={handleToggleSave}
            />

            {/* Interactive Cadastral Map Section */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
                    <Map className="w-4 h-4" />
                    <span>{language === 'bn' ? 'জাতীয় ক্যাডাস্ট্রাল জিও-পোর্টাল' : 'National Cadastral Geoportal'}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {language === 'bn' ? 'বাংলাদেশের আসল ভৌগোলিক মানচিত্র ও খতিয়ান (৮ বিভাগ)' : 'Authentic Bangladesh Map & Cadastral Records'}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    {language === 'bn'
                      ? '৮টি প্রশাসনিক বিভাগ, ৬৪টি জেলা ও ৪৯৫টি উপজেলার আসল সীমানা এবং সিএস, এসএ, আরএস ও বিএস দাগ অনুসন্ধান।'
                      : 'Explore authentic borders of 8 divisions, 64 districts, 495 upazilas and CS/SA/RS cadastral surveys.'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentView('interactive-map')}
                    className="px-4 py-2 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{language === 'bn' ? 'পূর্ণাঙ্গ মানচিত্র হাব' : 'Full Screen Map View'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <BangladeshInteractiveMap />
            </section>

            {/* 3. Browse by Task ("আপনি কী করতে চান?") */}
            <TaskBrowser
              services={services}
              onSelectService={handleSelectServiceDetail}
              onLaunchExternal={handleLaunchExternal}
              onNavigateToOffices={() => {
                setCurrentView('offices');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 4. Browse by Institution */}
            <InstitutionBrowser
              institutions={institutions}
              services={services}
              onSelectService={handleSelectServiceDetail}
              onLaunchExternal={handleLaunchExternal}
            />

            {/* 5. FAQs, Official Circulars & Ecosystem Counters */}
            <HomeNoticesFaq sources={sources} />
          </div>
        )}

        {currentView === 'citizen-dashboard' && (
          <CitizenDashboard
            onNavigateToService={(slug) => {
              const matched = services.find((s) => s.slug === slug);
              if (matched) {
                setSelectedServiceForDetail(matched);
              } else {
                setCurrentView('services');
              }
            }}
            onExitToPortal={() => setCurrentView('home')}
          />
        )}

        {currentView === 'services' && (
          <ServiceDirectory
            services={services}
            categories={categories}
            institutions={institutions}
            onSelectService={handleSelectServiceDetail}
            onLaunchExternal={handleLaunchExternal}
            savedServiceIds={savedServiceIds}
            onToggleSave={handleToggleSave}
            initialQuery={searchQueryForDirectory}
          />
        )}

        {currentView === 'tasks' && (
          <div className="py-6">
            <TaskBrowser
              services={services}
              onSelectService={handleSelectServiceDetail}
              onLaunchExternal={handleLaunchExternal}
              onNavigateToOffices={() => {
                setCurrentView('offices');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {currentView === 'institutions' && (
          <div className="py-6">
            <InstitutionBrowser
              institutions={institutions}
              services={services}
              onSelectService={handleSelectServiceDetail}
              onLaunchExternal={handleLaunchExternal}
            />
          </div>
        )}

        {currentView === 'offices' && <LandOfficeFinder />}

        {currentView === 'interactive-map' && (
          <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#005a3e] to-[#004d36] text-white p-6 rounded-2xl shadow-md border border-emerald-700">
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-black tracking-widest text-emerald-300">
                  NATIONAL CADASTRAL GEOPORTAL
                </span>
                <h1 className="text-2xl font-black">
                  {language === 'bn' ? 'বাংলাদেশ ইন্টারেক্টিভ ল্যান্ড ম্যাপ ও খতিয়ান হাব' : 'Bangladesh Interactive Land & Cadastral Hub'}
                </h1>
                <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed">
                  {language === 'bn'
                    ? 'আসল ভৌগোলিক আকৃতি অক্ষুণ্ন রেখে ৩-স্তরের ড্রিল-ডাউন: ৮টি প্রশাসনিক বিভাগ ➔ ৬৪টি জেলা ➔ ৪৯৫টি উপজেলা এবং সিএস (CS), এসএ (SA), আরএস (RS) ও বিএস (BS) দাগ রেকর্ড অনুসন্ধান।'
                    : 'Authentic 3-tier cadastral drilldown: 8 administrative divisions, 64 districts, and Upazilas with complete CS, SA, RS survey dag lineage.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentView('bhumisutra')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'ভূমিসূত্রে যান' : 'Go to BhumiSutra'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            <BangladeshInteractiveMap />
          </div>
        )}

        {currentView === 'bhumisutra' && (
          <BhumiSutraView onBackToPortal={() => setCurrentView('home')} />
        )}

        {currentView === 'helpline' && (
          <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#006a4e] flex items-center justify-center mx-auto">
                <PhoneCall className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">
                {language === 'bn' ? 'ভূমি সেবা হেল্পলাইন ১৬১২২' : 'Land Services Helpline 16122'}
              </h1>
              <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                {language === 'bn'
                  ? 'প্রযুক্তি বা স্মার্টফোনের ঝামেলা ছাড়াই সরাসরি ফোনে কথা বলে ই-নামজারি, ভূমি উন্নয়ন কর ও অন্যান্য ভূমি সেবা গ্রহণ করুন।'
                  : 'Receive assisted telephone land services, e-mutation filing, and tax payment guidance over the phone.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {language === 'bn' ? 'দেশের ভেতর থেকে ডায়াল করুন:' : 'Domestic Dialing:'}
                </span>
                <div className="text-4xl font-extrabold text-[#006a4e] font-mono">
                  {toBnNum(16122)}
                </div>
                <p className="text-xs text-emerald-900">
                  {language === 'bn'
                    ? 'যেকোনো মোবাইল অপারেটর থেকে কল করা যায় (টোল প্রযোজ্য)'
                    : 'Accessible from any telecom operator in Bangladesh'}
                </p>
                <a
                  href="tel:16122"
                  className="inline-block mt-2 px-6 py-2.5 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-bold text-xs"
                >
                  {language === 'bn' ? '১৬১২২ ডায়াল করুন' : 'Call 16122'}
                </a>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {language === 'bn' ? 'বিদেশ বা প্রবাস থেকে ডায়াল করুন:' : 'International Dialing:'}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                  +880 96123 16122
                </div>
                <p className="text-xs text-slate-500">
                  {language === 'bn'
                    ? 'প্রবাসী বাংলাদেশীদের জন্য ২৪ ঘণ্টা খোলা'
                    : 'Dedicated 24/7 channel for non-resident Bangladeshis'}
                </p>
                <a
                  href="tel:+8809612316122"
                  className="inline-block mt-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                >
                  {language === 'bn' ? 'আন্তর্জাতিক নম্বরে কল' : 'Call International'}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs sm:text-sm text-slate-700">
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'bn' ? '১৬১২২-এ কী কী সেবা পাওয়া যায়?' : 'Services Available via 16122'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 pl-1 leading-relaxed">
                <li>
                  {language === 'bn'
                    ? 'ফোনের মাধ্যমে সরাসরি ই-নামজারি ও জমাভাগের আবেদন পূরণ সহায়তা'
                    : 'Assisted application for e-Mutation over the phone'}
                </li>
                <li>
                  {language === 'bn'
                    ? 'হোল্ডিং এন্ট্রি এবং অনলাইনে ভূমি উন্নয়ন কর পরিশোধের নির্দেশনা'
                    : 'Assisted guidance for Land Development Tax assessment and payment'}
                </li>
                <li>
                  {language === 'bn'
                    ? 'খতিয়ান ও পর্চার সার্টিফাইড কপির আবেদন ও ডাকযোগে ডেলিভারি ট্র্যাকিং'
                    : 'Ordering and tracking certified khatian copies via postal delivery'}
                </li>
                <li>
                  {language === 'bn'
                    ? 'ভূমি সংক্রান্ত যেকোনো দুর্নীতি, দালাল চক্র বা অতিরিক্ত অর্থ দাবির তাৎক্ষণিক অভিযোগ গ্রহণ'
                    : 'Reporting grievances, corruption, or harassment by middlemen'}
                </li>
              </ul>
            </div>
          </div>
        )}

        {currentView === 'mydesk' && (
          <CitizenMyDesk
            services={services}
            savedServiceIds={savedServiceIds}
            onToggleSave={handleToggleSave}
            onSelectService={handleSelectServiceDetail}
            onLaunchExternal={handleLaunchExternal}
          />
        )}

        {currentView === 'admin' && (
          <AdminPortal services={services} onRefreshServices={loadData} />
        )}
      </main>

      {/* Footer */}
      <Footer sources={sources} onNavigate={setCurrentView} />

      {/* Unified Service Launch & Pre-Departure Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForDetail}
        onClose={() => setSelectedServiceForDetail(null)}
        onLaunchExternal={(srv) => {
          setSelectedServiceForDetail(null);
          setSelectedServiceForDeparture(srv);
        }}
        isSaved={
          selectedServiceForDetail
            ? savedServiceIds.includes(selectedServiceForDetail.id)
            : false
        }
        onToggleSave={handleToggleSave}
      />

      {/* Explicit Pre-Departure Warning Modal */}
      <DepartureNoticeModal
        service={selectedServiceForDeparture}
        onClose={() => setSelectedServiceForDeparture(null)}
        onConfirmDeparture={handleConfirmDeparture}
      />

      {/* Floating Land AI Advisor Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsAIModalOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#006a4e] to-emerald-800 text-white shadow-2xl hover:shadow-emerald-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/30"
          title="ভূমি সহায়ক এআই"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide">
            {language === 'bn' ? 'ভূমি এআই সহায়ক' : 'Ask Land AI'}
          </span>
        </button>
      </div>

      {/* Land Sector AI Assistant Modal */}
      <LandAIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />
    </div>
  );
};


export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
