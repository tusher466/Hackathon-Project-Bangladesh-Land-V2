/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Bilingual Language Context (Bangla & English)
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types/bilsp';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  toBnNum: (num: number | string) => string;
}

const translations: Record<string, { bn: string; en: string }> = {
  // Brand & Header
  appTitle: {
    bn: 'বাংলাদেশ সমন্বিত ভূমি সেবা পোর্টাল',
    en: 'Bangladesh Integrated Land Services Portal'
  },
  appShortTitle: {
    bn: 'বিআইএলএসপি',
    en: 'BILSP'
  },
  govSubtitle: {
    bn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | ভূমি মন্ত্রণালয় ও সংযুক্ত দপ্তরসমূহ',
    en: "Government of the People's Republic of Bangladesh | Ministry of Land & Agencies"
  },
  navHome: { bn: 'হোম', en: 'Home' },
  navAllServices: { bn: 'সকল সেবা', en: 'All Services' },
  navBrowseTask: { bn: 'কাজের ভিত্তিতে খুঁজুন', en: 'Browse by Task' },
  navInstitutions: { bn: 'দপ্তর ও সংস্থাসমূহ', en: 'Institutions' },
  navFindOffice: { bn: 'ভূমি অফিস খুঁজুন', en: 'Find an Office' },
  navHelpline: { bn: '১৬১২২ হেল্পলাইন', en: '16122 Helpline' },
  navMyDesk: { bn: 'আমার সংরক্ষিত সেবা', en: 'My Desk' },
  navAdmin: { bn: 'প্রশাসনিক প্যানেল', en: 'Admin Portal' },

  // Hero Search
  heroHeading: {
    bn: 'আপনার সকল ভূমি সেবা, এখন এক ঠিকানায়',
    en: 'All Your Land Services, in One Place.'
  },
  heroSubtitle: {
    bn: 'ই-নামজারি, ভূমি উন্নয়ন কর, খতিয়ান-পর্চা, মৌজা ম্যাপ ও ক্ষতিপূরণসহ সরকারের সকল যাচাইকৃত ভূমি সেবার কেন্দ্রীয় প্রবেশদ্বার।',
    en: 'Official unified gateway for e-Mutation, Land Development Tax, Khatian/Porcha records, Mouza maps, and government land services.'
  },
  searchPlaceholder: {
    bn: 'কোন ভূমি সেবা খুঁজছেন? যেমন: নামজারি, খাজনা, খতিয়ান, মৌজা ম্যাপ...',
    en: 'What land service do you need? e.g. mutation, tax, khatian, map...'
  },
  searchButton: { bn: 'অনুসন্ধান করুন', en: 'Search' },
  quickSearches: { bn: 'জনপ্রিয় অনুসন্ধান:', en: 'Popular searches:' },
  noResultsTitle: { bn: 'কোনো সেবা পাওয়া যায়নি', en: 'No services found' },
  noResultsSubtitle: {
    bn: 'অন্য কোনো শব্দ বা ইংরেজিতে লিখে চেষ্টা করুন, অথবা হেল্পলাইন ১৬১২২-এ যোগাযোগ করুন।',
    en: 'Try searching with different keywords, or contact Helpline 16122 for immediate assistance.'
  },

  // Popular Services
  popularServicesHeading: { bn: 'শীর্ষ জনপ্রিয় সেবা', en: 'Most Popular Services' },
  popularServicesSub: {
    bn: 'নাগরিকদের দৈনন্দিন প্রয়োজনীয় সরকারি যাচাইকৃত প্রধান ডিজিটাল ভূমি সেবাসমূহ',
    en: 'Most frequently accessed verified digital land services for citizens'
  },
  viewAllServices: { bn: 'সকল সেবা দেখুন', en: 'View All Services' },

  // Browse by Task
  taskHeading: { bn: 'আপনি কী করতে চান?', en: 'What do you want to do?' },
  taskSub: {
    bn: 'সরকারি দপ্তরের নাম না জেনেও সরাসরি আপনার প্রয়োজন অনুযায়ী সেবা বাছাই করুন',
    en: 'Discover services based on your specific task without needing to know government department names'
  },

  // Integration types & Truthful status
  verifiedExternal: { bn: 'যাচাইকৃত অফিশিয়াল পোর্টাল', en: 'Verified Official Portal' },
  departureNotice: { bn: 'বহিরাগত পোর্টালে যাত্রা নোটিশ', en: 'External Portal Navigation Notice' },
  openOfficialService: { bn: 'অফিসিয়াল ওয়েবসাইটে প্রবেশ করুন', en: 'Continue to Official Website' },
  detailsAndGuide: { bn: 'নির্দেশিকা ও বিস্তারিত', en: 'Details & Guidelines' },
  saveToMyDesk: { bn: 'সংরক্ষণ করুন', en: 'Save to My Desk' },
  savedInMyDesk: { bn: 'সংরক্ষিত হয়েছে', en: 'Saved' },

  // Pre-departure modal
  leavingBILSP: {
    bn: 'আপনি বিআইএলএসপি থেকে সরকারি অফিশিয়াল পোর্টালে যাচ্ছেন',
    en: 'You are leaving BILSP and entering an official government portal'
  },
  leavingBILSPNote: {
    bn: 'বিআইএলএসপি একটি পথনির্দেশক সমন্বিত গেটওয়ে। মূল সেবা প্রদান ও নথিপত্র যাচাই সংশ্লিষ্ট সরকারি পোর্টাল দ্বারাই সম্পাদিত হয়। কখনোই বিআইএলএসপি-তে আপনার পাসওয়ার্ড বা এনআইডি পিন প্রদান করবেন না।',
    en: 'BILSP is an intelligent navigation directory. The actual transaction, verification, and decision belong entirely to the authorized government portal. Never enter your external passwords or credentials into BILSP.'
  },
  proceedToOfficial: { bn: 'অফিসিয়াল সাইটে এগিয়ে যান', en: 'Proceed to Official Site' },
  cancel: { bn: 'বাতিল করুন', en: 'Cancel' },

  // Stats bar
  statServices: { bn: 'যাচাইকৃত ভূমি সেবা', en: 'Verified Land Services' },
  statWebsites: { bn: 'সরকারি ওয়েব ডোমেইন', en: 'Official Web Portals' },
  statHelpline: { bn: '২৪/৭ নাগরিক হটলাইন', en: '24/7 Citizen Helpline' },
  statIntegrations: { bn: 'সরাসরি ডিজিটাল সংযোগ', en: 'Digital Integration Modes' },

  // Helpline banner
  helplineBannerTitle: {
    bn: 'প্রযুক্তি ব্যবহারে জটিলতা? সরাসরি কল করুন ১৬১২২ নম্বরে',
    en: 'Need assistance? Call dedicated Land Helpline 16122'
  },
  helplineBannerSub: {
    bn: 'দেশের যেকোনো অপারেটরের মোবাইল থেকে ১৬১২২ ডায়াল করুন। বিদেশ থেকে +৮৮০ ৯৬১২৩ ১৬১২২ নম্বরে কল করে ঘরে বসেই ভূমি সেবা ও আবেদন পরামর্শ নিন।',
    en: 'Dial 16122 from any mobile network in Bangladesh, or call +880 96123 16122 from abroad for assisted land services.'
  },
  callNow: { bn: '১৬১২২ ডায়াল করুন', en: 'Dial 16122' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bilsp_lang');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bilsp_lang', lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key;
  };

  // Convert numbers to Bengali digits when language is Bengali
  const toBnNum = (num: number | string): string => {
    if (language === 'en') return String(num);
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, toBnNum }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
