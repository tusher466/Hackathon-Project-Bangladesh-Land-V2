/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Header Component with Responsive Navigation, Language Switcher, and Auth Portal Integration
 */

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Globe,
  Menu,
  X,
  Bookmark,
  ShieldCheck,
  PhoneCall,
  Search,
  ExternalLink,
  Layers,
  Building2,
  MapPin,
  Lock,
  User,
  LogIn,
  LogOut,
  Map,
  Bot,
  Sparkles
} from 'lucide-react';


interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  savedCount: number;
  onOpenAIModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  savedCount,
  onOpenAIModal
}) => {
  const { language, toggleLanguage, t, toBnNum } = useLanguage();
  const { currentUser, userType, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Layers },
    { id: 'bhumisutra', label: language === 'bn' ? 'ভূমিসূত্র (BhumiSutra)' : 'BhumiSutra', icon: Sparkles, isHighlight: true },
    { id: 'services', label: t('navAllServices'), icon: Search },
    { id: 'tasks', label: t('navBrowseTask'), icon: ExternalLink },
    { id: 'institutions', label: t('navInstitutions'), icon: Building2 },
    { id: 'offices', label: t('navFindOffice'), icon: MapPin },
    { id: 'helpline', label: t('navHelpline'), icon: PhoneCall },
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Government Identity Bar */}
      <div className="bg-[#006a4e] text-white text-xs px-4 py-1.5 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f42a41] inline-block border border-white/40"></span>
            <span className="tracking-wide">
              {language === 'bn'
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | ভূমি মন্ত্রণালয় ও সংযুক্ত দপ্তরসমূহ'
                : "Government of the People's Republic of Bangladesh | Ministry of Land & Agencies"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100">
            <a
              href="tel:16122"
              className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/10 px-2.5 py-0.5 rounded-sm"
              title="ভূমি সেবা হটলাইন ১৬১২২"
            >
              <PhoneCall className="w-3 h-3 text-amber-300" />
              <span>{language === 'bn' ? 'ভূমি সেবা হটলাইন: ১৬১২২' : 'Land Helpline: 16122'}</span>
            </a>
            <span className="hidden md:inline text-emerald-300">|</span>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-white font-semibold transition-colors bg-emerald-900/60 px-2 py-0.5 rounded-sm border border-emerald-700 cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
        >
          {/* Emblem Icon */}
          <div className="w-11 h-11 rounded-lg bg-linear-to-br from-[#006a4e] to-emerald-900 flex items-center justify-center text-white shadow-md border-2 border-emerald-600/30 group-hover:scale-105 transition-transform shrink-0">
            <ShieldCheck className="w-6 h-6 text-amber-300" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-none">
                {language === 'bn' ? 'বিআইএলএসপি' : 'BILSP'}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-xs bg-emerald-100 text-emerald-800 border border-emerald-200">
                {language === 'bn' ? 'সমন্বিত পোর্টাল' : 'INTEGRATED'}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 line-clamp-1 leading-snug">
              {language === 'bn'
                ? 'বাংলাদেশ সমন্বিত ভূমি ব্যবস্থাপনা ব্যবস্থা'
                : 'Bangladesh Integrated Land Management System'}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  item.id === 'bhumisutra'
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 font-bold hover:bg-amber-100 shadow-2xs'
                    : isActive
                    ? 'bg-emerald-50 text-[#006a4e] font-semibold border-b-2 border-[#006a4e]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <item.icon className={`w-4 h-4 ${item.id === 'bhumisutra' ? 'text-amber-600 animate-pulse' : isActive ? 'text-[#006a4e]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'bhumisutra' && (
                  <span className="text-[10px] bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded-full font-extrabold uppercase">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Desk + BhumiSutra + AI + Citizen/Admin Auth) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* BhumiSutra Quick Launch Button */}
          <button
            type="button"
            onClick={() => handleNavClick('bhumisutra')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-2xs hover:opacity-95 transition-all cursor-pointer group"
            title="ভূমিসূত্র স্মার্ট ল্যান্ড প্ল্যাটফর্ম"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-45 transition-transform" />
            <span>{language === 'bn' ? 'ভূমিসূত্র' : 'BhumiSutra'}</span>
            <ExternalLink className="w-3 h-3 text-white/80" />
          </button>

          {/* Land AI Assistant Button */}
          <button
            type="button"
            onClick={() => onOpenAIModal && onOpenAIModal()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-50 text-[#006a4e] hover:bg-emerald-100 border border-emerald-300 shadow-2xs transition-all cursor-pointer group"
            title="ভূমি সহায়ক এআই"
          >
            <Bot className="w-4 h-4 text-[#006a4e] group-hover:scale-110 transition-transform" />
            <span>{language === 'bn' ? 'ভূমি এআই' : 'Land AI'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* My Desk (Saved items) */}
          <button
            onClick={() => handleNavClick('mydesk')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border cursor-pointer ${
              currentView === 'mydesk'
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="আমার সংরক্ষিত সেবা"
          >
            <Bookmark className={`w-4 h-4 ${savedCount > 0 ? 'text-amber-600 fill-amber-500' : 'text-slate-400'}`} />
            <span className="hidden md:inline">{t('navMyDesk')}</span>
            {savedCount > 0 && (
              <span className="bg-amber-500 text-white text-xs font-bold px-1.5 py-0.2 rounded-full">
                {toBnNum(savedCount)}
              </span>
            )}
          </button>

          {/* User Auth Buttons or Active Session Quick Nav */}
          {currentUser ? (
            userType === 'CITIZEN' ? (
              <button
                type="button"
                onClick={() => handleNavClick('citizen-dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                  currentView === 'citizen-dashboard'
                    ? 'bg-[#006a4e] text-white border-[#006a4e]'
                    : 'bg-emerald-50 text-[#006a4e] border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                <User className="w-4 h-4 text-emerald-700" />
                <span>{language === 'bn' ? 'নাগরিক ড্যাশবোর্ড' : 'Citizen Dashboard'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNavClick('admin-workspace')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                  currentView === 'admin-workspace'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-300" />
                <span>{language === 'bn' ? 'বিভাগীয় ওয়ার্কস্পেস' : 'Dept Workspace'}</span>
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={() => handleNavClick('auth')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                currentView === 'auth'
                  ? 'bg-slate-900 text-white'
                  : 'bg-[#006a4e] hover:bg-emerald-800 text-white'
              }`}
            >
              <LogIn className="w-4 h-4 text-amber-300" />
              <span>{language === 'bn' ? 'লগইন / নিবন্ধন' : 'Login / Register'}</span>
            </button>
          )}

          {/* Registry Admin link */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-md text-xs font-medium transition-colors border cursor-pointer ${
              currentView === 'admin'
                ? 'bg-slate-100 text-slate-900 border-slate-300'
                : 'text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-900'
            }`}
            title="রেজিস্ট্রি কনসোল"
          >
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden xl:inline">{language === 'bn' ? 'রেজিস্ট্রি' : 'Registry'}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          {currentUser ? (
            <button
              onClick={() => handleNavClick(userType === 'CITIZEN' ? 'citizen-dashboard' : 'admin-workspace')}
              className="p-2 rounded-xl bg-emerald-50 text-[#006a4e] border border-emerald-200"
              title="Dashboard"
            >
              <User className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('auth')}
              className="px-3 py-1.5 rounded-xl bg-[#006a4e] text-white text-xs font-bold"
            >
              {language === 'bn' ? 'লগইন' : 'Login'}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-base font-medium cursor-pointer ${
                currentView === item.id
                  ? 'bg-emerald-50 text-[#006a4e] font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <item.icon className="w-5 h-5 text-slate-400" />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <button
              onClick={() => handleNavClick('mydesk')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-amber-500" />
                <span>{t('navMyDesk')}</span>
              </div>
              {savedCount > 0 && (
                <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {toBnNum(savedCount)}
                </span>
              )}
            </button>

            {currentUser ? (
              <button
                onClick={() => handleNavClick(userType === 'CITIZEN' ? 'citizen-dashboard' : 'admin-workspace')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-base font-bold text-emerald-800 bg-emerald-50"
              >
                <User className="w-5 h-5" />
                <span>{userType === 'CITIZEN' ? (language === 'bn' ? 'আমার ড্যাশবোর্ড' : 'My Dashboard') : (language === 'bn' ? 'বিভাগীয় ওয়ার্কস্পেস' : 'Dept Workspace')}</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('auth')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-base font-bold text-white bg-[#006a4e]"
              >
                <LogIn className="w-5 h-5" />
                <span>{language === 'bn' ? 'নাগরিক ও কর্মকর্তা লগইন' : 'Login / Register'}</span>
              </button>
            )}

            <button
              onClick={toggleLanguage}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              <Globe className="w-5 h-5 text-slate-400" />
              <span>{language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
