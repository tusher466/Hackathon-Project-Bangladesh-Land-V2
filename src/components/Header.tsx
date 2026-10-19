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
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Layers },
    { id: 'bhumisutra', label: language === 'bn' ? 'ভূমিসূত্র' : 'BhumiSutra', icon: Sparkles, isHighlight: true },
    { id: 'interactive-map', label: language === 'bn' ? 'ইন্টারেক্টিভ মানচিত্র' : 'Interactive Map', icon: Map },
    { id: 'services', label: t('navAllServices'), icon: Search },
    { id: 'tasks', label: t('navBrowseTask'), icon: ExternalLink },
    { id: 'institutions', label: t('navInstitutions'), icon: Building2 },
    { id: 'offices', label: t('navFindOffice'), icon: MapPin },
    { id: 'helpline', label: t('navHelpline'), icon: PhoneCall },
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    setLoginMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      {/* Top Government Identity Bar */}
      <div className="bg-gradient-to-r from-[#004e36] via-[#006a4e] to-[#004d36] text-white text-xs px-4 py-1.5 font-medium border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Republic Branding */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-full border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f42a41] inline-block border border-amber-300 ring-1 ring-white/40 shadow-xs" />
              <span className="text-[11px] font-semibold text-emerald-100 tracking-wide">
                {language === 'bn' ? 'বাংলাদেশ সরকার' : 'Govt of Bangladesh'}
              </span>
            </div>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-[11px] text-emerald-100 tracking-wide">
              {language === 'bn'
                ? 'ভূমি মন্ত্রণালয় • ভূমি রেকর্ড ও জরিপ অধিদপ্তর (DLRS) • নিবন্ধন পরিদপ্তর (আইন মন্ত্রণালয়)'
                : 'Ministry of Land • DLRS • Directorate of Registration (Law Ministry)'}
            </span>
          </div>

          {/* Hotline & Language & Dept Jump */}
          <div className="flex items-center gap-3 text-emerald-100 text-xs">
            <a
              href="tel:16122"
              className="flex items-center gap-1.5 text-white bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 px-2.5 py-0.5 rounded-full border border-amber-400/40 transition-all font-semibold shadow-xs"
              title="ভূমি সেবা হটলাইন ১৬১২২"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <PhoneCall className="w-3 h-3 text-amber-300" />
              <span>{language === 'bn' ? 'হটলাইন: ১৬১২২' : 'Helpline: 16122'}</span>
            </a>

            <span className="text-white/30 hidden md:inline">|</span>

            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 hover:text-white font-bold transition-all bg-emerald-950/60 hover:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-600/60 cursor-pointer shadow-2xs"
              title="Switch Language"
            >
              <Globe className="w-3 h-3 text-emerald-300" />
              <span className="text-[11px]">{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Executive Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden shrink-0"
        >
          {/* Emblem Icon */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#006a4e] via-emerald-800 to-teal-900 flex items-center justify-center text-white shadow-md border border-emerald-500/40 group-hover:scale-105 group-hover:shadow-emerald-900/20 transition-all shrink-0">
            <ShieldCheck className="w-6 h-6 text-amber-300" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none group-hover:text-[#006a4e] transition-colors">
                {language === 'bn' ? 'বিআইএলএসপি' : 'BILSP'}
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                {language === 'bn' ? 'সমন্বিত পোর্টাল' : 'INTEGRATED'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 line-clamp-1 leading-snug">
              {language === 'bn'
                ? 'বাংলাদেশ সমন্বিত ভূমি ও দলিল রেজিস্ট্রি পোর্টাল'
                : 'Bangladesh Integrated Land & Registration Portal'}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                  item.id === 'bhumisutra'
                    ? 'bg-gradient-to-r from-amber-50 to-emerald-50 text-amber-950 border border-amber-300/80 font-bold hover:from-amber-100 hover:to-emerald-100 shadow-2xs'
                    : isActive
                    ? 'bg-emerald-50 text-[#006a4e] font-bold border border-emerald-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <item.icon className={`w-4 h-4 ${item.id === 'bhumisutra' ? 'text-amber-600 animate-pulse' : isActive ? 'text-[#006a4e]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'bhumisutra' && (
                  <span className="text-[9px] bg-gradient-to-r from-amber-500 to-amber-600 text-white px-1.5 py-0.2 rounded-full font-black uppercase tracking-wider shadow-2xs">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls Group */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* BhumiSutra Direct Launch Button */}
          <button
            type="button"
            onClick={() => handleNavClick('bhumisutra')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white shadow-xs hover:shadow-md transition-all cursor-pointer group"
            title="ভূমিসূত্র স্মার্ট ল্যান্ড প্ল্যাটফর্ম"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-45 transition-transform" />
            <span>{language === 'bn' ? 'ভূমিসূত্র' : 'BhumiSutra'}</span>
            <ExternalLink className="w-3 h-3 text-white/90" />
          </button>

          {/* Land AI Assistant Button */}
          <button
            type="button"
            onClick={() => onOpenAIModal && onOpenAIModal()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-[#006a4e] border border-emerald-300/80 shadow-2xs transition-all cursor-pointer group"
            title="ভূমি সহায়ক এআই"
          >
            <Bot className="w-4 h-4 text-[#006a4e] group-hover:scale-110 transition-transform" />
            <span>{language === 'bn' ? 'ভূমি এআই' : 'Land AI'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* My Desk (Saved items) */}
          <button
            onClick={() => handleNavClick('mydesk')}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              currentView === 'mydesk'
                ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="আমার সংরক্ষিত সেবা"
          >
            <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'text-amber-600 fill-amber-500' : 'text-slate-400'}`} />
            <span className="hidden xl:inline">{t('navMyDesk')}</span>
            {savedCount > 0 && (
              <span className="bg-amber-500 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                {toBnNum(savedCount)}
              </span>
            )}
          </button>

          {/* Separated User & Department Auth */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleNavClick(userType === 'CITIZEN' ? 'citizen-dashboard' : 'admin-workspace')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
                  userType === 'CITIZEN'
                    ? 'bg-emerald-50 text-[#006a4e] border-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                }`}
              >
                {userType === 'CITIZEN' ? (
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                ) : (
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                )}
                <span className="max-w-[120px] truncate">
                  {currentUser.nameBn || currentUser.name || 'ড্যাশবোর্ড'}
                </span>
              </button>
              <button
                type="button"
                onClick={logout}
                className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-300 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                title="লগআউট"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => handleNavClick('auth')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#006a4e] hover:bg-emerald-800 text-white shadow-xs transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'bn' ? 'লগইন / নিবন্ধন' : 'Login / Register'}</span>
              </button>
            </div>
          )}

          {/* Registry Admin link */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              currentView === 'admin'
                ? 'bg-slate-100 text-slate-900 border-slate-300'
                : 'text-slate-400 border-transparent hover:bg-slate-100 hover:text-slate-700'
            }`}
            title="রেজিস্ট্রি কনসোল ও অডিট লগ"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-2">
          {currentUser ? (
            <button
              onClick={() => handleNavClick(userType === 'CITIZEN' ? 'citizen-dashboard' : 'admin-workspace')}
              className="p-2 rounded-xl bg-emerald-50 text-[#006a4e] border border-emerald-200"
              title="Dashboard"
            >
              <User className="w-4 h-4" />
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
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
