/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Popular Services Component (Top 8 citizen land services)
 */

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LandService } from '../types/bilsp';
import {
  FileText,
  GitPullRequest,
  Receipt,
  Map,
  FileCheck,
  ShieldAlert,
  Landmark,
  Scale,
  ExternalLink,
  Info,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface PopularServicesProps {
  services: LandService[];
  onSelectService: (service: LandService) => void;
  onLaunchExternal: (service: LandService) => void;
  savedServiceIds: string[];
  onToggleSave: (serviceId: string) => void;
}

export const PopularServices: React.FC<PopularServicesProps> = ({
  services,
  onSelectService,
  onLaunchExternal,
  savedServiceIds,
  onToggleSave,
}) => {
  const { language, t, toBnNum } = useLanguage();

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'digital-khatian-eporcha':
        return FileText;
      case 'e-mutation-namjari':
        return GitPullRequest;
      case 'land-development-tax-ldtax':
        return Receipt;
      case 'mouza-maps-cadastral-sheets':
        return Map;
      case 'deed-registration-stamp-duty':
        return FileCheck;
      case 'land-acquisition-requisition-larms':
        return ShieldAlert;
      case 'khas-land-settlement-policy':
        return Landmark;
      case 'land-appeal-board-hearing':
      case 'land-revenue-court-system':
      case 'land-crime-prevention-redress':
        return Scale;
      default:
        return FileText;
    }
  };

  // Find the 8 core popular services
  const popularList = services.filter((s) => s.isPopular).slice(0, 8);

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#006a4e]" />
            <span>{language === 'bn' ? 'প্রধান নাগরিক সেবাসমূহ' : 'Core Public Services'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {t('popularServicesHeading')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            {t('popularServicesSub')}
          </p>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5 self-start md:self-auto bg-slate-100 px-3 py-1.5 rounded-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'bn'
              ? 'সকল তথ্য সরকারি গেজেট ও বিধি মোতাবেক যাচাইকৃত'
              : 'Verified against official government gazettes'}
          </span>
        </div>
      </div>

      {/* 8 Popular Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {popularList.map((service) => {
          const IconComponent = getServiceIcon(service.slug);
          const isSaved = savedServiceIds.includes(service.id);

          return (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div className="p-5">
                {/* Header line with icon, verified badge, and bookmark */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#006a4e] group-hover:bg-[#006a4e] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
                      title="অফিসিয়াল পোর্টাল যাচাইকৃত"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      <span>{language === 'bn' ? 'যাচাইকৃত' : 'Verified'}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => onToggleSave(service.id)}
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                      title={isSaved ? 'সংরক্ষিত তালিকা থেকে মুছুন' : 'সংরক্ষণ করুন (My Desk)'}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Service Name */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#006a4e] transition-colors leading-snug line-clamp-2 mb-2">
                  {language === 'bn' ? service.nameBn : service.nameEn}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {language === 'bn' ? service.shortDescriptionBn : service.shortDescriptionEn}
                </p>

                {/* Meta details: Statutory Fee & Service delivery time */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span>{language === 'bn' ? 'সরকারি ফি:' : 'Official Fee:'}</span>
                    <span className="font-semibold text-slate-800">
                      {service.officialFeesTotalBdt !== undefined
                        ? service.officialFeesTotalBdt === 0
                          ? language === 'bn'
                            ? 'বিনামূল্যে'
                            : 'Free'
                          : `${toBnNum(service.officialFeesTotalBdt)} ${language === 'bn' ? 'টাকা' : 'BDT'}`
                        : language === 'bn'
                          ? 'বিধি অনুযায়ী'
                          : 'As per rules'}
                    </span>
                  </div>

                  {service.estimatedDeliveryDaysBn && (
                    <div className="flex items-center justify-between">
                      <span>{language === 'bn' ? 'নিষ্পত্তির সময়:' : 'Timeline:'}</span>
                      <span className="font-medium text-slate-700 truncate max-w-[150px]">
                        {language === 'bn'
                          ? service.estimatedDeliveryDaysBn
                          : service.estimatedDeliveryDaysEn}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: 1 primary action + guide link */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t('detailsAndGuide')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onLaunchExternal(service)}
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-[#006a4e] hover:bg-emerald-800 text-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="অফিসিয়াল সরকারি পোর্টালে যান"
                >
                  <span>{language === 'bn' ? 'সেবায় যান' : 'Go to Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
