/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Shared Multi-Department Administrative Layout with Strict RBAC Permissions Enforcement
 */

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { AdminUser } from '../../types/authAndGeo';
import {
  ShieldCheck,
  Building2,
  Lock,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  User,
  Layers,
  ChevronRight,
  Globe,
  AlertTriangle,
  CheckCircle2,
  FileText,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface NavItem {
  id: string;
  labelBn: string;
  labelEn: string;
  icon: React.ElementType;
  requiredPermission?: string;
  badge?: string;
}

interface AdminLayoutProps {
  currentModule: string;
  setCurrentModule: (mod: string) => void;
  navItems: NavItem[];
  workspaceTitleBn: string;
  workspaceTitleEn: string;
  authorityBn: string;
  authorityEn: string;
  authorityCode: 'MINLAND' | 'DLRS' | 'DOLR';
  children: React.ReactNode;
  onExitToPortal: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentModule,
  setCurrentModule,
  navItems,
  workspaceTitleBn,
  workspaceTitleEn,
  authorityBn,
  authorityEn,
  authorityCode,
  children,
  onExitToPortal,
}) => {
  const { language, toggleLanguage } = useLanguage();
  const { currentUser, logout, hasPermission } = useAuth();
  const admin = currentUser as AdminUser;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  // Authority Theme Styling
  const getAuthorityBadge = () => {
    switch (authorityCode) {
      case 'MINLAND':
        return {
          bg: 'bg-[#006a4e]',
          text: 'text-white',
          border: 'border-emerald-700',
          accent: 'bg-emerald-50 text-emerald-800'
        };
      case 'DLRS':
        return {
          bg: 'bg-[#0369a1]',
          text: 'text-white',
          border: 'border-sky-700',
          accent: 'bg-sky-50 text-sky-800'
        };
      case 'DOLR':
        return {
          bg: 'bg-[#4338ca]',
          text: 'text-white',
          border: 'border-indigo-700',
          accent: 'bg-indigo-50 text-indigo-800'
        };
      default:
        return {
          bg: 'bg-slate-900',
          text: 'text-white',
          border: 'border-slate-800',
          accent: 'bg-slate-100 text-slate-900'
        };
    }
  };

  const theme = getAuthorityBadge();

  const handleModuleClick = (modId: string, reqPerm?: string) => {
    if (reqPerm && !hasPermission(reqPerm)) {
      alert(
        language === 'bn'
          ? 'অ্যাক্সেস নিয়ন্ত্রিত: আপনার ইউজার রোলে এই মডিউলটির জন্য প্রয়োজনীয় পারমিশন নেই।'
          : 'Access Denied: Your assigned role lacks explicit permission for this module.'
      );
      return;
    }
    setCurrentModule(modId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-['Hind_Siliguri','Inter',sans-serif]">
      {/* Top Admin Navigation Header */}
      <header className={`${theme.bg} ${theme.text} sticky top-0 z-40 shadow-md border-b ${theme.border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Left: Brand & Authority */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-black/20 text-white hover:bg-black/30"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-base tracking-tight leading-none">
                    {language === 'bn' ? workspaceTitleBn : workspaceTitleEn}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-white/20 uppercase tracking-wider font-mono">
                    {authorityCode}
                  </span>
                </div>
                <p className="text-[11px] opacity-85 line-clamp-1 leading-snug mt-0.5">
                  {language === 'bn' ? authorityBn : authorityEn}
                </p>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold cursor-pointer border border-white/20"
            >
              {language === 'bn' ? 'English' : 'বাংলা'}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-emerald-200" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white/50" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 p-4 z-50 animate-in fade-in text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold uppercase tracking-wider text-slate-700">
                      {language === 'bn' ? 'প্রশাসনিক নোটিফিকেশন' : 'System Notifications'}
                    </span>
                    <span className="text-[10px] text-slate-400">৩টি নতুন</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <strong className="font-semibold block text-slate-900">
                        {language === 'bn' ? 'নতুন আবেদন মুলতুবি' : 'Pending Review Task'}
                      </strong>
                      <span className="text-slate-500">
                        {language === 'bn' ? 'রমনা সার্কেলে ২টি নতুন ফাইল অপেক্ষমাণ।' : '2 new records pending audit in Ramna.'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <strong className="font-semibold block text-slate-900">
                        {language === 'bn' ? 'সাপ্তাহিক অডিট সম্পন্ন' : 'Weekly Audit Log Clean'}
                      </strong>
                      <span className="text-slate-500">
                        {language === 'bn' ? 'ডিজিটাল রেকর্ড সুরক্ষায় কোনো অসংগতি নেই।' : 'No integrity anomalies detected.'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Drawer Toggle */}
            <button
              type="button"
              onClick={() => setShowProfileDrawer(!showProfileDrawer)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
                {admin?.name?.charAt(0) || 'A'}
              </div>
              <span className="hidden sm:inline text-xs font-semibold truncate max-w-[120px]">
                {language === 'bn' ? admin?.nameBn : admin?.name}
              </span>
            </button>

            {/* Exit/Logout */}
            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-lg bg-black/20 hover:bg-rose-900/60 text-white transition-colors cursor-pointer"
              title="লগআউট"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row p-4 sm:p-6 gap-6 items-start">
        {/* Sidebar */}
        <aside
          className={`lg:w-64 w-full bg-white rounded-2xl border border-slate-200 shadow-xs p-4 shrink-0 space-y-4 ${
            mobileMenuOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* User Profile Mini Badge */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-xs font-bold text-slate-900 font-mono">{admin?.employeeId}</span>
            </div>
            <div className="font-bold text-xs text-slate-800 leading-snug">
              {language === 'bn' ? admin?.designationBn : admin?.designationEn}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {language === 'bn' ? 'স্ট্যাটাস: সক্রিয় কর্মকর্তা' : 'Status: Active Official'}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs sm:text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = currentModule === item.id;
              const isAllowed = !item.requiredPermission || hasPermission(item.requiredPermission);
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModuleClick(item.id, item.requiredPermission)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#006a4e] text-white shadow-xs'
                      : isAllowed
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-slate-400 opacity-60 cursor-not-allowed hover:bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                  </div>

                  {!isAllowed && (
                    <span title="Permission required">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    </span>
                  )}

                  {item.badge && isAllowed && (
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Switch / Exit Back to Citizen Portal */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              type="button"
              onClick={onExitToPortal}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>{language === 'bn' ? 'নাগরিক সেবা পোর্টালে যান' : 'View Public Portal'}</span>
            </button>
          </div>
        </aside>

        {/* Content Workspace Area */}
        <main className="flex-1 w-full overflow-hidden">{children}</main>
      </div>

      {/* User Profile Modal / Drawer */}
      {showProfileDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-xs sm:text-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'bn' ? 'সরকারি কর্মকর্তা প্রোফাইল' : 'Government Official Profile'}
              </h3>
              <button
                type="button"
                onClick={() => setShowProfileDrawer(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">এমপ্লয়ী আইডি:</span>
                <p className="font-mono font-bold text-slate-900 text-sm">{admin?.employeeId}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">কর্মকর্তার নাম:</span>
                <p className="font-bold text-slate-900 text-sm">{language === 'bn' ? admin?.nameBn : admin?.name}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">পদবী ও দায়িত্ব:</span>
                <p className="text-slate-800">{language === 'bn' ? admin?.designationBn : admin?.designationEn}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">নিয়ন্ত্রণকারী কর্তৃপক্ষ:</span>
                <p className="text-slate-800 font-medium">{language === 'bn' ? admin?.authorityBn : admin?.authorityEn}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">অনুমোদিত পারমিশনসমূহ:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {admin?.permissions?.map((p, i) => (
                    <span key={i} className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowProfileDrawer(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold cursor-pointer"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
