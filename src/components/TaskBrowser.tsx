/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Task-Oriented Service Browser ("আপনি কী করতে চান?" / "What do you want to do?")
 */

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LandService } from '../types/bilsp';
import {
  Search,
  FileSignature,
  CreditCard,
  Map,
  Activity,
  Building,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface TaskBrowserProps {
  services: LandService[];
  onSelectService: (service: LandService) => void;
  onLaunchExternal: (service: LandService) => void;
  onNavigateToOffices: () => void;
}

interface TaskDefinition {
  id: string;
  icon: React.ElementType;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  targetSlug: string;
  isSpecialAction?: 'OFFICES';
  highlightStepsBn: string[];
  highlightStepsEn: string[];
}

export const TaskBrowser: React.FC<TaskBrowserProps> = ({
  services,
  onSelectService,
  onLaunchExternal,
  onNavigateToOffices,
}) => {
  const { language, t } = useLanguage();
  const [selectedTaskId, setSelectedTaskId] = useState<string>('task-record');

  const tasks: TaskDefinition[] = [
    {
      id: 'task-record',
      icon: Search,
      titleBn: 'জমির খতিয়ান বা পর্চা খুঁজতে চাই',
      titleEn: 'Find a Land Record (Khatian / Porcha)',
      descBn: 'সিএস, এসএ, আরএস, বিএস বা সিটি জরিপের রেকর্ড অনলাইন থেকে দেখতে বা সার্টিফাইড কপি ডাকযোগে তুলতে চান।',
      descEn: 'Search CS, SA, RS, or BS record of rights online and apply for certified copy delivery.',
      targetSlug: 'digital-khatian-eporcha',
      highlightStepsBn: [
        'ই-পর্চা পোর্টালে বিভাগ, জেলা, উপজেলা ও মৌজা নির্বাচন করুন',
        'খতিয়ান নম্বর বা দাগ নম্বর লিখে সার্চ দিন',
        '১০০ টাকা ফি ও ৪০ টাকা ডাক মাশুল দিয়ে সার্টিফাইড কপি আবেদন করুন'
      ],
      highlightStepsEn: [
        'Select jurisdiction on e-Porcha portal',
        'Search by Khatian or Plot number',
        'Apply for certified stamped copy with 140 BDT fee'
      ]
    },
    {
      id: 'task-mutation',
      icon: FileSignature,
      titleBn: 'নতুন নামজারি (মিউটেশন) করতে চাই',
      titleEn: 'Apply for Land Mutation',
      descBn: 'জমি কেনা, হেবা বা ওয়ারিশসূত্রে নতুন মালিক হয়েছেন? সরকারি রেকর্ডে নিজের নাম অন্তর্ভুক্ত করতে চান।',
      descEn: 'Acquired land via deed or inheritance? Update title in government revenue records.',
      targetSlug: 'e-mutation-namjari',
      highlightStepsBn: [
        'জাতীয় পরিচয়পত্র ও মোবাইল নম্বর দিয়ে ওটিপি যাচাই',
        'দলিল ও পূর্ববর্তী খতিয়ানের কপি আপলোড করুন',
        'আবেদন ফি ৭০ টাকা ও আদেশ শেষে ১,১০০ টাকা পরিশোধ করুন'
      ],
      highlightStepsEn: [
        'Verify identity with NID and Mobile OTP',
        'Upload deed copies and chain documents',
        'Pay statutory fees (total 1,170 BDT strictly according to gazette)'
      ]
    },
    {
      id: 'task-tax',
      icon: CreditCard,
      titleBn: 'জমির খাজনা বা ভূমি উন্নয়ন কর দিতে চাই',
      titleEn: 'Pay Land Development Tax',
      descBn: 'অনলাইনে জমির বকেয়া ও বর্তমান খাজনা হিসাব করে মোবাইল ব্যাংকিংয়ে পরিশোধ ও ই-দাখিলা রশিদ সংগ্রহ করুন।',
      descEn: 'Assess land revenue dues, pay online via bKash/Nagad/cards, and download QR-coded tax receipt.',
      targetSlug: 'land-development-tax-ldtax',
      highlightStepsBn: [
        'ldtax.gov.bd-এ এনআইডি দিয়ে নাগরিক নিবন্ধন করুন',
        'হোল্ডিং এন্ট্রি দিয়ে ইউনিয়ন ভূমি কর্মকর্তার অনুমোদন নিন',
        'অনলাইনে পেমেন্ট করে সাথে সাথেই ই-দাখিলা রশিদ ডাউনলোড করুন'
      ],
      highlightStepsEn: [
        'Register on ldtax.gov.bd with NID',
        'Add holding particulars for Tahsil officer validation',
        'Pay online and instantly obtain QR-coded e-Dakhila'
      ]
    },
    {
      id: 'task-map',
      icon: Map,
      titleBn: 'মৌজা ম্যাপ দেখতে বা তুলতে চাই',
      titleEn: 'Find or Order a Mouza Map',
      descBn: 'জমির অবস্থান ও দাগের সীমানা চিহ্নিত করার জন্য ডিএলআরএস মুদ্রিত সরকারি মৌজা নকশা ডাকযোগে গ্রহণ।',
      descEn: 'Identify parcel boundaries and order authentic DLRS cadastral sheet maps by post.',
      targetSlug: 'mouza-maps-cadastral-sheets',
      highlightStepsBn: [
        'মৌজার নাম ও সিট নম্বর বাছাই করুন',
        '৫২০ টাকা সরকারি ফি বিকাশ/নগদে পরিশোধ করুন',
        'প্লাস্টিক টিউবে মোড়ানো মূল নকশা ডাকযোগে গ্রহণ করুন'
      ],
      highlightStepsEn: [
        'Choose mouza and sheet number',
        'Pay 520 BDT fee including postal charges',
        'Receive printed sheet safely by postal delivery'
      ]
    },
    {
      id: 'task-tracking',
      icon: Activity,
      titleBn: 'আবেদনের বর্তমান অবস্থা দেখতে চাই',
      titleEn: 'Check Application Status',
      descBn: 'পূর্বে দাখিলকৃত নামজারি বা পর্চার আবেদনের ট্র্যাকিং নম্বর দিয়ে অগ্রগতি ও শুনানির দিন যাচাই করুন।',
      descEn: 'Track your pending mutation or certified copy requests using application reference numbers.',
      targetSlug: 'e-mutation-namjari',
      highlightStepsBn: [
        'আপনার আবেদন ফরমের শীর্ষের আবেদন নম্বর বের করুন',
        'অফিসিয়াল ট্র্যাকিং পোর্টালে নম্বর ও বিভাগ দিন',
        'শুনানির তারিখ ও এসিল্যান্ডের আদেশনামা দেখুন'
      ],
      highlightStepsEn: [
        'Locate tracking ID from application receipt',
        'Input tracking number into verified portal',
        'Check hearing schedule and order sheet'
      ]
    },
    {
      id: 'task-office',
      icon: Building,
      titleBn: 'সংশ্লিষ্ট ভূমি অফিস খুঁজতে চাই',
      titleEn: 'Find the Responsible Land Office',
      descBn: 'আপনার এলাকা কোন এসিল্যান্ড সার্কেল, ইউনিয়ন ভূমি অফিস বা সাব-রেজিস্ট্রি অফিসের আওতাভুক্ত তা জানুন।',
      descEn: 'Locate your local AC Land Office, Sub-Registry, or District Revenue Branch.',
      targetSlug: '',
      isSpecialAction: 'OFFICES',
      highlightStepsBn: [
        'আপনার বিভাগ ও জেলা নির্বাচন করুন',
        'উপজেলা সহকারী কমিশনার (ভূমি) অফিসের ঠিকানা ও ফোন পান',
        'প্রয়োজনে সরাসরি ১৬১২২ হেল্পলাইনে কথা বলুন'
      ],
      highlightStepsEn: [
        'Choose your Division and District',
        'Access AC Land office telephone & address',
        'Or dial 16122 for direct assistance'
      ]
    },
    {
      id: 'task-complaint',
      icon: AlertTriangle,
      titleBn: 'জমি নিয়ে অভিযোগ বা আপিল করতে চাই',
      titleEn: 'Submit Complaint or Appeal',
      descBn: 'জমি জবরদখল, জাল দলিল বা দুর্নীতির বিরুদ্ধে আইনি অভিযোগ অথবা রাজস্ব আদেশের বিরুদ্ধে আপিল।',
      descEn: 'File grievances against illegal possession, deed forgery under 2023 Act, or revenue appeals.',
      targetSlug: 'land-crime-prevention-redress',
      highlightStepsBn: [
        'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩-এর ধারা জানুন',
        'ম্যাজিস্ট্রেট বা এসিল্যান্ড বরাবর দখলের বিবরণী দাখিল করুন',
        'তাৎক্ষণিক সহায়তার জন্য ১৬১২২ কলসেন্টারে জানান'
      ],
      highlightStepsEn: [
        'Review Land Crime Prevention Act 2023',
        'File petition before Executive Magistrate',
        'Lodge immediate grievance via 16122 hotline'
      ]
    },
    {
      id: 'task-laws',
      icon: BookOpen,
      titleBn: 'ভূমি আইন ও নিয়মাবলী জানতে চাই',
      titleEn: 'Learn Land Laws & Procedures',
      descBn: 'ভূমি সংস্কার আইন, ভূমি উন্নয়ন কর আইন ২০২৩, কৃষি খাসজমি বন্দোবস্ত ও অর্পিত সম্পত্তির সরকারি গেজেট।',
      descEn: 'Official legal acts, gazette circulars, inheritance guides, and statutory rights.',
      targetSlug: 'land-crime-prevention-redress',
      highlightStepsBn: [
        '২০২৩ সালের নতুন ভূমি আইনসমূহ পর্যালোচনা করুন',
        'ওয়ারিশ সূত্রে ফারায়েজ ও মালিকানা নিয়মাবলী জানুন',
        'মন্ত্রণালয়ের অফিশিয়াল পরিপত্র সরাসরি পড়ুন'
      ],
      highlightStepsEn: [
        'Inspect new 2023 land enactments',
        'Understand succession and faraiz regulations',
        'Read authenticated circulars from Ministry'
      ]
    }
  ];

  const currentTask = tasks.find((t) => t.id === selectedTaskId) || tasks[0];
  const matchedService = services.find((s) => s.slug === currentTask.targetSlug);

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto bg-slate-50/70 border-y border-slate-200">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#006a4e] uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-[#006a4e]" />
          <span>{language === 'bn' ? 'সহজ পথনির্দেশ' : 'Guided Assistance'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t('taskHeading')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
          {t('taskSub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Task list buttons */}
        <div className="lg:col-span-5 space-y-2">
          {tasks.map((task) => {
            const isSelected = selectedTaskId === task.id;
            const Icon = task.icon;

            return (
              <button
                key={task.id}
                type="button"
                onClick={() => setSelectedTaskId(task.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#006a4e] shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-lg transition-colors shrink-0 ${
                      isSelected
                        ? 'bg-[#006a4e] text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-[#006a4e]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4
                      className={`text-sm sm:text-base font-semibold transition-colors ${
                        isSelected ? 'text-[#006a4e]' : 'text-slate-900'
                      }`}
                    >
                      {language === 'bn' ? task.titleBn : task.titleEn}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {language === 'bn' ? task.descBn : task.descEn}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-[#006a4e] translate-x-1' : 'text-slate-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Task Solution Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full w-fit mb-4 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>
              {language === 'bn'
                ? 'অনুমোদিত সরকারি পদ্ধতি ও সেবা সংযুক্তি'
                : 'Verified Government Procedure & Action'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            {language === 'bn' ? currentTask.titleBn : currentTask.titleEn}
          </h3>

          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            {language === 'bn' ? currentTask.descBn : currentTask.descEn}
          </p>

          {/* Quick Steps Checklist */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-6">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <span>{language === 'bn' ? 'কার্যপ্রণালী সংক্ষেপে:' : 'Procedure at a Glance:'}</span>
            </h5>
            <div className="space-y-2.5">
              {(language === 'bn' ? currentTask.highlightStepsBn : currentTask.highlightStepsEn).map(
                (step, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Primary Action Target */}
          {currentTask.isSpecialAction === 'OFFICES' ? (
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onNavigateToOffices}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>{language === 'bn' ? 'ভূমি অফিস খুঁজুন' : 'Search Land Offices'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:16122"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>{language === 'bn' ? '১৬১২২ নম্বরে কল করুন' : 'Dial Helpline 16122'}</span>
              </a>
            </div>
          ) : matchedService ? (
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => onLaunchExternal(matchedService)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#006a4e] hover:bg-emerald-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>
                  {language === 'bn'
                    ? 'অনলাইন অফিশিয়াল পোর্টালে যান'
                    : 'Open Official Government Portal'}
                </span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectService(matchedService)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'bn' ? 'পূর্ণাঙ্গ নির্দেশিকা পড়ুন' : 'Read Full Guide'}</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
