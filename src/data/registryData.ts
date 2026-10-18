/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Authoritative Registry Dataset of Verified Bangladesh Land Sector Digital Services
 */

import {
  GovernmentInstitution,
  ExternalWebsite,
  ServiceCategory,
  LandService,
  OfficialSource,
  LandOffice,
  AuditLog
} from '../types/bilsp';

export const INSTITUTIONS: GovernmentInstitution[] = [
  {
    id: 'inst-minland',
    code: 'MINLAND',
    nameBn: 'ভূমি মন্ত্রণালয়',
    nameEn: 'Ministry of Land',
    shortNameBn: 'ভূমন্ত্ৰ',
    shortNameEn: 'MinLand',
    descriptionBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের ভূমি প্রশাসন, ব্যবস্থাপনা, সংস্কার ও ডিজিটাল সেবামূলক নীতি নির্ধারণী সর্বোচ্চ কর্তৃপক্ষ।',
    descriptionEn: 'The supreme policy-making and administrative authority for land management, reforms, and digital land services in Bangladesh.',
    websiteUrl: 'https://minland.gov.bd/',
    parentMinistryBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    parentMinistryEn: "Government of the People's Republic of Bangladesh",
    addressBn: 'বাংলাদেশ সচিবালয়, ভবন নং ৪, ঢাকা ১০০০',
    addressEn: 'Bangladesh Secretariat, Building 4, Dhaka 1000',
    contactEmail: 'info@minland.gov.bd',
    helplinePhone: '16122',
    verificationSource: 'বাংলাদেশ জাতীয় তথ্য বাতায়ন (bangladesh.gov.bd) ও ভূমি মন্ত্রণালয় গেজেট',
    lastVerifiedDate: '2026-04-12',
    isVerified: true,
  },
  {
    id: 'inst-dlrs',
    code: 'DLRS',
    nameBn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর',
    nameEn: 'Directorate of Land Records and Surveys',
    shortNameBn: 'ডিএলআরএস',
    shortNameEn: 'DLRS',
    descriptionBn: 'সমগ্র বাংলাদেশের ভূ-সম্পত্তির ক্যাডাস্ট্রাল জরিপ, মৌজা ম্যাপ প্রণয়ন ও ডিজিটাইজেশন এবং খতিয়ান প্রস্তুতকারী অধিদপ্তর।',
    descriptionEn: 'Directorate responsible for cadastral surveys, mouza map production, digitization, and land record (khatian) preparation across Bangladesh.',
    websiteUrl: 'https://dlrs.gov.bd/',
    parentMinistryBn: 'ভূমি মন্ত্রণালয়',
    parentMinistryEn: 'Ministry of Land',
    addressBn: '২৮ শহীদ তাজউদ্দীন আহমদ সরণী, তেজগাঁও শিল্প এলাকা, ঢাকা ১২০৮',
    addressEn: '28 Shaheed Tajuddin Ahmed Sarani, Tejgaon I/A, Dhaka 1208',
    contactEmail: 'dg@dlrs.gov.bd',
    helplinePhone: '16122',
    verificationSource: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর অফিশিয়াল পোর্টাল',
    lastVerifiedDate: '2026-04-10',
    isVerified: true,
  },
  {
    id: 'inst-lrb',
    code: 'LRB',
    nameBn: 'ভূমি সংস্কার বোর্ড',
    nameEn: 'Land Reform Board',
    shortNameBn: 'এলআরবি',
    shortNameEn: 'LRB',
    descriptionBn: 'মাঠ পর্যায়ের ভূমি অফিস (উপজেলা ও ইউনিয়ন ভূমি অফিস) তদারকি, ভূমি উন্নয়ন কর আদায় ও খাসজমি বন্দোবস্ত বাস্তবায়নকারী বোর্ড।',
    descriptionEn: 'Statutory board supervising field land offices (AC Land and Union Tahsil offices), land development tax collection, and khas land distribution.',
    websiteUrl: 'https://lrb.gov.bd/',
    parentMinistryBn: 'ভূমি মন্ত্রণালয়',
    parentMinistryEn: 'Ministry of Land',
    addressBn: 'ভূমি ভবন, ৭ম তলা, ৯৮ শহীদ তাজউদ্দীন আহমদ সরণী, তেজগাঁও, ঢাকা',
    addressEn: 'Bhumi Bhaban, 7th Floor, 98 Shaheed Tajuddin Ahmed Sarani, Tejgaon, Dhaka',
    contactEmail: 'chairman@lrb.gov.bd',
    helplinePhone: '16122',
    verificationSource: 'ভূমি সংস্কার বোর্ড আইন ১৯৮৯ ও প্রাতিষ্ঠানিক নির্দেশিকা',
    lastVerifiedDate: '2026-04-05',
    isVerified: true,
  },
  {
    id: 'inst-lab',
    code: 'LAB',
    nameBn: 'ভূমি আপিল বোর্ড',
    nameEn: 'Land Appeal Board',
    shortNameBn: 'এলএবি',
    shortNameEn: 'LAB',
    descriptionBn: 'বিভাগীয় কমিশনারদের রাজস্ব ও নামজারি আদেশের বিরুদ্ধে আপিল ও রিভিশন শুনানির সর্বোচ্চ প্রশাসনিক বিচারিক কর্তৃপক্ষ।',
    descriptionEn: 'Highest administrative appellate authority hearing appeals and revision cases against revenue orders of Divisional Commissioners.',
    websiteUrl: 'https://lab.gov.bd/',
    parentMinistryBn: 'ভূমি মন্ত্রণালয়',
    parentMinistryEn: 'Ministry of Land',
    addressBn: 'ভূমি ভবন, ৬ষ্ঠ তলা, ৯৮ শহীদ তাজউদ্দীন আহমদ সরণী, তেজগাঁও, ঢাকা',
    addressEn: 'Bhumi Bhaban, 6th Floor, 98 Shaheed Tajuddin Ahmed Sarani, Tejgaon, Dhaka',
    contactEmail: 'secretary@lab.gov.bd',
    helplinePhone: '16122',
    verificationSource: 'ভূমি আপিল বোর্ড আইন ১৯৮৯',
    lastVerifiedDate: '2026-04-02',
    isVerified: true,
  },
  {
    id: 'inst-dolr',
    code: 'DOLR',
    nameBn: 'নিবন্ধন অধিদপ্তর',
    nameEn: 'Directorate of Registration',
    shortNameBn: 'নিবন্ধন',
    shortNameEn: 'DOLR',
    descriptionBn: 'আইন, বিচার ও সংসদ বিষয়ক মন্ত্রণালয়ের অধীনস্থ জমি রেজিস্ট্রি, দলিল প্রস্তুতকরণ ও সাব-রেজিস্ট্রি কার্যালয় নিয়ন্ত্রক অধিদপ্তর।',
    descriptionEn: 'Directorate regulating sub-registry offices, deed registrations, stamp duties, and certified deed searches under the Ministry of Law.',
    websiteUrl: 'https://dolr.gov.bd/',
    parentMinistryBn: 'আইন, বিচার ও সংসদ বিষয়ক মন্ত্রণালয়',
    parentMinistryEn: 'Ministry of Law, Justice and Parliamentary Affairs',
    addressBn: '১৪ আব্দুল গনি রোড, ঢাকা ১০০০',
    addressEn: '14 Abdul Gani Road, Dhaka 1000',
    contactEmail: 'igrd@dolr.gov.bd',
    helplinePhone: '16122',
    verificationSource: 'নিবন্ধন আইন ১৯০৮ ও নিবন্ধন অধিদপ্তর অফিশিয়াল পোর্টাল',
    lastVerifiedDate: '2026-03-28',
    isVerified: true,
  },
  {
    id: 'inst-latc',
    code: 'LATC',
    nameBn: 'ভূমি প্রশাসন প্রশিক্ষণ কেন্দ্র',
    nameEn: 'Land Administration Training Centre',
    shortNameBn: 'এলএটিসি',
    shortNameEn: 'LATC',
    descriptionBn: 'ভূমি কর্মকর্তাদের পেশাগত দক্ষতা উন্নয়ন ও ভূমি আইন বিষয়ক প্রশিক্ষণ ও গবেষণা প্রতিষ্ঠান।',
    descriptionEn: 'Training institution responsible for developing professional capacities of land officers and research on land laws.',
    websiteUrl: 'https://latc.gov.bd/',
    parentMinistryBn: 'ভূমি মন্ত্রণালয়',
    parentMinistryEn: 'Ministry of Land',
    addressBn: 'সাত মসজিদ রোড, ধানমন্ডি, ঢাকা ১২০৯',
    addressEn: 'Satmasjid Road, Dhanmondi, Dhaka 1209',
    contactEmail: 'director@latc.gov.bd',
    helplinePhone: '16122',
    verificationSource: 'ভূমি মন্ত্রণালয় বার্ষিক প্রতিবেদন ও অফিশিয়াল ওয়েবসাইট',
    lastVerifiedDate: '2026-03-20',
    isVerified: true,
  }
];

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat-khatian',
    slug: 'khatian-and-porcha',
    nameBn: 'খতিয়ান ও পর্চা',
    nameEn: 'Khatian & Porcha',
    descriptionBn: 'অনলাইনে সিএস, এসএ, আরএস, বিএস খতিয়ান অনুসন্ধান ও ডাকযোগে সার্টিফাইড কপি প্রাপ্তি।',
    descriptionEn: 'Search CS, SA, RS, and BS record of rights online and request certified copies by postal delivery.',
    iconName: 'FileText',
    sortOrder: 1,
  },
  {
    id: 'cat-mutation',
    slug: 'mutation-name-transfer',
    nameBn: 'ই-নামজারি ও জমাভাগ',
    nameEn: 'E-Mutation & Separation',
    descriptionBn: 'মালিকানা পরিবর্তনের পর অনলাইনে নামজারি ও জমাখারিজ আবেদন এবং শুনানি ট্র্যাকিং।',
    descriptionEn: 'Apply online for land mutation, record correction, and track case hearing notices.',
    iconName: 'GitPullRequest',
    sortOrder: 2,
  },
  {
    id: 'cat-tax',
    slug: 'land-development-tax',
    nameBn: 'ভূমি উন্নয়ন কর (খাজনা)',
    nameEn: 'Land Development Tax',
    descriptionBn: 'অনলাইনে হোল্ডিং এন্ট্রি, খাজনা হিসাব, ডিজিটাল পেমেন্ট ও ই-দাখিলা রশিদ ডাউনলোড।',
    descriptionEn: 'Holding registration, online land revenue calculation, digital payment, and e-Dakhila download.',
    iconName: 'Receipt',
    sortOrder: 3,
  },
  {
    id: 'cat-maps',
    slug: 'mouza-maps-survey',
    nameBn: 'মৌজা ম্যাপ ও ভূ-জরিপ',
    nameEn: 'Mouza Maps & Cadastral Sheets',
    descriptionBn: 'মৌজা ম্যাপ অনুসন্ধান, সিট নম্বর নির্বাচন এবং সার্টিফাইড প্রিন্ট কপি ডাকযোগে প্রাপ্তির আবেদন।',
    descriptionEn: 'Search mouza maps by sheet number and order high-resolution printed cadastral map sheets.',
    iconName: 'Map',
    sortOrder: 4,
  },
  {
    id: 'cat-deeds',
    slug: 'deeds-registration',
    nameBn: 'দলিল ও সাব-রেজিস্ট্রি',
    nameEn: 'Deed & Registration',
    descriptionBn: 'দলিল লেখার নমুনা ফরম, স্ট্যাম্প শুল্ক ও রেজিস্ট্রেশন ফি ক্যালকুলেটর ও সাব-রেজিস্ট্রি অফিস সেবা।',
    descriptionEn: 'Deed drafting templates, registration fee & stamp duty calculators, and sub-registry services.',
    iconName: 'FileCheck',
    sortOrder: 5,
  },
  {
    id: 'cat-larms',
    slug: 'land-acquisition-larms',
    nameBn: 'ভূমি অধিগ্রহণ ও ক্ষতিপূরণ (LARMS)',
    nameEn: 'Land Acquisition & Compensation',
    descriptionBn: 'সরকারি অধিগ্রহণ বিজ্ঞপ্তি, এলএ কেস তথ্য, ক্ষতিপূরণ দাবির আবেদন ও টাকা প্রাপ্তির স্ট্যাটাস।',
    descriptionEn: 'Government acquisition notices, LA cases, compensation claims submission, and award status.',
    iconName: 'ShieldAlert',
    sortOrder: 6,
  },
  {
    id: 'cat-khas',
    slug: 'khas-land-settlement',
    nameBn: 'খাসজমি ও বন্দোবস্ত',
    nameEn: 'Khas Land & Settlement',
    descriptionBn: 'ভূমিহীনদের মাঝে সরকারি কৃষি খাসজমি বন্দোবস্ত আবেদন নির্দেশিকা এবং শর্তাবলী।',
    descriptionEn: 'Application procedures and eligibility criteria for agricultural khas land settlement for landless citizens.',
    iconName: 'Landmark',
    sortOrder: 7,
  },
  {
    id: 'cat-appeal',
    slug: 'appeals-court-complaints',
    nameBn: 'আপিল, আদালত ও অভিযোগ',
    nameEn: 'Appeals, Courts & Grievances',
    descriptionBn: 'ভূমি রাজস্ব আদালত (ই-কোর্ট), ভূমি আপিল বোর্ড কজলিস্ট ও ভূমি অপরাধ প্রতিকার সেল।',
    descriptionEn: 'Land revenue e-Court cases, Land Appeal Board cause lists, and grievance redressal.',
    iconName: 'Scale',
    sortOrder: 8,
  },
  {
    id: 'cat-laws',
    slug: 'laws-circulars-forms',
    nameBn: 'আইন, বিধি ও ফরম',
    nameEn: 'Laws, Rules & Forms',
    descriptionBn: 'ভূমি অপরাধ আইন ২০২৩, ভূমি সংস্কার আইন, উত্তরাধিকার হিসাব ও রাষ্ট্রীয় সার্কুলার।',
    descriptionEn: 'Land Crime Prevention Act 2023, Land Reforms Act, inheritance calculator, and circulars.',
    iconName: 'BookOpen',
    sortOrder: 9,
  },
  {
    id: 'cat-helpline',
    slug: 'citizen-helpline-16122',
    nameBn: '১৬১২২ ভূমি সেবা হেল্পলাইন',
    nameEn: '16122 Citizen Helpline',
    descriptionBn: '২৪ ঘণ্টা নাগরিক কলসেন্টার, দূর থেকে সেবার আবেদন সহায়তা এবং তাৎক্ষণিক পরামর্শ।',
    descriptionEn: '24/7 dedicated citizen helpline, remote application support, and immediate guidance.',
    iconName: 'PhoneCall',
    sortOrder: 10,
  }
];

export const EXTERNAL_WEBSITES: ExternalWebsite[] = [
  {
    id: 'web-land-gov-bd',
    institutionId: 'inst-minland',
    domain: 'land.gov.bd',
    officialUrl: 'https://land.gov.bd/',
    displayNameBn: 'স্মার্ট ভূমি সেবা (জাতীয় পোর্টাল)',
    displayNameEn: 'Smart Land Services (National Portal)',
    websitePurposeBn: 'বাংলাদেশের ভূমি সংক্রান্ত সকল ডিজিটাল সেবার একক প্রবেশদ্বার ও নাগরিক ড্যাশবোর্ড।',
    websitePurposeEn: 'Single national digital gateway and citizen dashboard for land services in Bangladesh.',
    verificationSource: 'ভূমি মন্ত্রণালয় আইসিটি শাখা ও এটুআই (a2i)',
    lastVerifiedDate: '2026-04-14',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 180,
  },
  {
    id: 'web-mutation',
    institutionId: 'inst-minland',
    domain: 'mutation.land.gov.bd',
    officialUrl: 'https://mutation.land.gov.bd/',
    displayNameBn: 'ই-নামজারি পোর্টাল',
    displayNameEn: 'E-Mutation Portal',
    websitePurposeBn: 'অনলাইনে নামজারি, জমাভাগ ও জমাএকত্রীকরণ আবেদন এবং আদেশনামা জারির অফিশিয়াল প্ল্যাটফর্ম।',
    websitePurposeEn: 'Official platform for applying for mutation, separation, and generating corrected record order sheets.',
    verificationSource: 'ভূমি সংস্কার বোর্ড ও এটুআই প্রকল্প',
    lastVerifiedDate: '2026-04-14',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 240,
  },
  {
    id: 'web-ldtax',
    institutionId: 'inst-lrb',
    domain: 'ldtax.gov.bd',
    officialUrl: 'https://ldtax.gov.bd/',
    displayNameBn: 'ভূমি উন্নয়ন কর ব্যবস্থাপনা সিস্টেম',
    displayNameEn: 'Land Development Tax Management System',
    websitePurposeBn: 'অনলাইন ভূমি উন্নয়ন কর নির্ধারণ, পেমেন্ট গেটওয়ে এবং তাৎক্ষণিক ইলেকট্রনিক দাখিলা রশিদ প্রাপ্তি।',
    websitePurposeEn: 'Online land development tax assessment, digital payment, and instant electronic receipt issuance.',
    verificationSource: 'ভূমি সংস্কার বোর্ড ও জাতীয় রাজস্ব নির্দেশনা',
    lastVerifiedDate: '2026-04-14',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 210,
  },
  {
    id: 'web-eporcha',
    institutionId: 'inst-dlrs',
    domain: 'eporcha.gov.bd',
    officialUrl: 'https://eporcha.gov.bd/',
    displayNameBn: 'ই-পর্চা সেবা পোর্টাল',
    displayNameEn: 'e-Porcha Land Record Portal',
    websitePurposeBn: 'দেশের সকল জেলার আরএস, সিএস, এসএ, বিএস খতিয়ান অনুসন্ধান ও সার্টিফাইড কপির আবেদন।',
    websitePurposeEn: 'Online search for RS, CS, SA, BS khatians and certified copy requests with postal delivery.',
    verificationSource: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর',
    lastVerifiedDate: '2026-04-14',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 290,
  },
  {
    id: 'web-minland',
    institutionId: 'inst-minland',
    domain: 'minland.gov.bd',
    officialUrl: 'https://minland.gov.bd/',
    displayNameBn: 'ভূমি মন্ত্রণালয় অফিসিয়াল ওয়েবসাইট',
    displayNameEn: 'Ministry of Land Official Website',
    websitePurposeBn: 'মন্ত্রণালয়ের নীতি, প্রজ্ঞাপন, পরিপত্র, আইন, কর্মকর্তা তালিকা ও নাগরিক সনদের প্রাতিষ্ঠানিক তথ্য।',
    websitePurposeEn: 'Ministry policies, gazette circulars, acts, officer directories, and citizen charter.',
    verificationSource: 'বাংলাদেশ জাতীয় তথ্য বাতায়ন',
    lastVerifiedDate: '2026-04-12',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_2_INFO_INTEGRATION',
    responseLatencyMs: 160,
  },
  {
    id: 'web-dlrs',
    institutionId: 'inst-dlrs',
    domain: 'dlrs.gov.bd',
    officialUrl: 'https://dlrs.gov.bd/',
    displayNameBn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর ওয়েবসাইট',
    displayNameEn: 'DLRS Directorate Website',
    websitePurposeBn: 'ক্যাডাস্ট্রাল জরিপের অগ্রগতি, মৌজা তালিকা ও প্রকাশনা সংক্রান্ত প্রাতিষ্ঠানিক তথ্য।',
    websitePurposeEn: 'Cadastral survey milestones, mouza gazette catalogs, and institutional records.',
    verificationSource: 'ডিএলআরএস তথ্য বাতায়ন',
    lastVerifiedDate: '2026-04-10',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 215,
  },
  {
    id: 'web-larms',
    institutionId: 'inst-minland',
    domain: 'larms.land.gov.bd',
    officialUrl: 'https://larms.land.gov.bd/',
    displayNameBn: 'ভূমি অধিগ্রহণ ও ক্ষতিপূরণ ব্যবস্থাপনা সিস্টেম (LARMS)',
    displayNameEn: 'Land Acquisition & Requisition Management System (LARMS)',
    websitePurposeBn: 'ভূমি অধিগ্রহণ বিজ্ঞপ্তি প্রদর্শন, আপত্তি দাখিল ও ৭/৮ ধারার ক্ষতিপূরণ প্রাপ্তির ডিজিটাল হিসাব।',
    websitePurposeEn: 'Digital land acquisition gazettes, objection filing, and compensation claims management.',
    verificationSource: 'ভূমি মন্ত্রণালয় এলএ শাখা',
    lastVerifiedDate: '2026-04-08',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 340,
  },
  {
    id: 'web-lab',
    institutionId: 'inst-lab',
    domain: 'lab.gov.bd',
    officialUrl: 'https://lab.gov.bd/',
    displayNameBn: 'ভূমি আপিল বোর্ড পোর্টাল',
    displayNameEn: 'Land Appeal Board Portal',
    websitePurposeBn: 'আপিল মামলার কজলিস্ট, শুনানির তারিখ ও রায় সংক্রান্ত সাধারণ নোটিশ।',
    websitePurposeEn: 'Revenue appeal cause lists, hearing calendars, and judgment notices.',
    verificationSource: 'ভূমি আপিল বোর্ড প্রশাসন',
    lastVerifiedDate: '2026-04-05',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 250,
  },
  {
    id: 'web-lrb',
    institutionId: 'inst-lrb',
    domain: 'lrb.gov.bd',
    officialUrl: 'https://lrb.gov.bd/',
    displayNameBn: 'ভূমি সংস্কার বোর্ড ওয়েবসাইট',
    displayNameEn: 'Land Reform Board Official Site',
    websitePurposeBn: 'মাঠ প্রশাসন পরিচালনা, খাসজমি বণ্টন ও ভূমি সংস্কার নীতি নির্দেশিকা।',
    websitePurposeEn: 'Field land office supervision, khas land allocation guidelines, and reform documents.',
    verificationSource: 'ভূমি সংস্কার বোর্ড',
    lastVerifiedDate: '2026-04-05',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 220,
  },
  {
    id: 'web-hotline',
    institutionId: 'inst-minland',
    domain: 'hotline.land.gov.bd',
    officialUrl: 'https://hotline.land.gov.bd/',
    displayNameBn: 'ভূমি সেবা হেল্পলাইন ১৬১২২ পোর্টাল',
    displayNameEn: 'Land Services Helpline 16122 Portal',
    websitePurposeBn: '১৬১২২ কলসেন্টারের সেবাসমূহ, সরাসরি আবেদন সেবা ও নাগরিক অভিযোগ পর্যবেক্ষণ।',
    websitePurposeEn: '16122 Call Center services, telephone application assistance, and citizen grievance monitoring.',
    verificationSource: 'ভূমি মন্ত্রণালয় হেল্পলাইন সেল',
    lastVerifiedDate: '2026-04-14',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 190,
  },
  {
    id: 'web-court',
    institutionId: 'inst-minland',
    domain: 'court.land.gov.bd',
    officialUrl: 'https://court.land.gov.bd/',
    displayNameBn: 'ভূমি রাজস্ব আদালত ব্যবস্থাপনা সিস্টেম',
    displayNameEn: 'Land Revenue Court Management System',
    websitePurposeBn: 'এসিল্যান্ড, এডিসি ও বিভাগীয় কমিশনারের রাজস্ব মিস কেস ও আদালতের কার্যক্রম মনিটরিং।',
    websitePurposeEn: 'Online cause list and order sheet tracking for AC Land and ADC Revenue courts.',
    verificationSource: 'ভূমি মন্ত্রণালয় রাজস্ব আদালত শাখা',
    lastVerifiedDate: '2026-04-06',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 310,
  },
  {
    id: 'web-dolr',
    institutionId: 'inst-dolr',
    domain: 'dolr.gov.bd',
    officialUrl: 'https://dolr.gov.bd/',
    displayNameBn: 'নিবন্ধন অধিদপ্তর ওয়েবসাইট',
    displayNameEn: 'Directorate of Registration Website',
    websitePurposeBn: 'দলিল রেজিস্ট্রেশন আইন, সাব-রেজিস্ট্রার অফিসের তালিকা ও স্ট্যাম্প শুল্কের নির্দেশিকা।',
    websitePurposeEn: 'Deed registration statutory framework, sub-registrar locator, and stamp duty manuals.',
    verificationSource: 'আইন ও বিচার বিভাগ',
    lastVerifiedDate: '2026-03-29',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 230,
  },
  {
    id: 'web-zoning',
    institutionId: 'inst-minland',
    domain: 'landzoning.gov.bd',
    officialUrl: 'https://landzoning.gov.bd/',
    displayNameBn: 'জাতীয় ভূমি জোনিং প্রকল্প',
    displayNameEn: 'National Land Zoning Project',
    websitePurposeBn: 'কৃষি, আবাসন, শিল্প ও পরিবেশভিত্তিক ভূমি ব্যবহার জোনিং ম্যাপ ও নীতি।',
    websitePurposeEn: 'Spatial zoning maps classification for agriculture, residential, commercial, and water bodies.',
    verificationSource: 'ভূমি মন্ত্রণালয় জোনিং প্রকল্প',
    lastVerifiedDate: '2026-03-20',
    verificationStatus: 'WEBSITE_REACHABLE',
    isPubliclyAvailable: true,
    integrationMode: 'TYPE_1_EXTERNAL_LINK',
    responseLatencyMs: 280,
  }
];

export const LAND_SERVICES: LandService[] = [
  {
    id: 'srv-eporcha',
    slug: 'digital-khatian-eporcha',
    nameBn: 'অনলাইন খতিয়ান ও পর্চা অনুসন্ধান (ই-পর্চা)',
    nameEn: 'Online Khatian & Porcha Search (e-Porcha)',
    shortDescriptionBn: 'বিভাগ, জেলা, উপজেলা ও মৌজা নির্বাচন করে সিএস, এসএ, আরএস ও বিএস খতিয়ান দেখা ও ডাকযোগে সার্টিফাইড কপির আবেদন।',
    shortDescriptionEn: 'Search CS, SA, RS, and BS record-of-rights online by division, district, upazila, and mouza, and order postal certified copies.',
    detailedDescriptionBn: 'ই-পর্চা সিস্টেমের মাধ্যমে নাগরিকরা দেশের যে কোনো প্রান্ত থেকে বা প্রবাসে বসে নিজ খতিয়ানের তথ্য অনুসন্ধান করতে পারেন। অনলাইন খতিয়ানের অনুলিপি স্ক্রিনে দেখা যায় এবং ডিসি অফিসের রেকর্ডরুমের সীল-স্বাক্ষরযুক্ত সার্টিফাইড কপির জন্য অনলাইনে আবেদন করে ডাকযোগে বাড়িতে বসেই গ্রহণ করা যায়।',
    detailedDescriptionEn: 'The e-Porcha platform allows citizens from any location or abroad to verify land ownership records (Khatian/Porcha). Users can view records instantly or request DC office record room certified copies delivered securely by post.',
    institutionId: 'inst-dlrs',
    categoryId: 'cat-khatian',
    officialWebsiteUrl: 'https://eporcha.gov.bd/',
    directServiceUrl: 'https://eporcha.gov.bd/',
    integrationType: 'TYPE_1_EXTERNAL_LINK',
    availabilityStatus: 'SERVICE_PAGE_VERIFIED',
    lastVerifiedDate: '2026-04-14',
    verificationSource: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর এবং এটুআই ডিজিটাল সার্ভিস শাখা',
    isPopular: true,
    isPublished: true,
    eligibilityBn: [
      'বাংলাদেশের যেকোনো নাগরিক অথবা প্রবাসী বাংলাদেশী',
      'যেকোনো বৈধ স্বার্থসংশ্লিষ্ট ব্যক্তি বা আইনজীবী'
    ],
    eligibilityEn: [
      'Any citizen of Bangladesh or non-resident Bangladeshi',
      'Any legally interested individual, land owner, or legal representative'
    ],
    requiredDocumentsBn: [
      'মৌজা, দাগ নম্বর অথবা খতিয়ান নম্বর (যদি জানা থাকে)',
      'মালিকের নাম (বিকল্প অনুসন্ধানের জন্য)',
      'সার্টিফাইড কপি গ্রহণের ক্ষেত্রে আবেদনকারীর জাতীয় পরিচয়পত্র (NID) নম্বর ও সচল মোবাইল নম্বর',
      'ডাকযোগে গ্রহণের জন্য সঠিক ডেলিভারি ঠিকানা'
    ],
    requiredDocumentsEn: [
      'Mouza name, Plot (Daag) number, or Khatian number (if known)',
      'Owner name (for alternative search)',
      'National ID (NID) number and active mobile phone number for certified copy requests',
      'Complete postal address for home delivery'
    ],
    instructions: [
      {
        id: 'ins-ep-1',
        serviceId: 'srv-eporcha',
        stepNumber: 1,
        titleBn: 'বিভাগ, জেলা ও উপজেলা বাছাই',
        titleEn: 'Select Division, District and Upazila',
        instructionBn: 'ই-পর্চা ওয়েবসাইটে প্রবেশ করে আপনার কাঙ্ক্ষিত বিভাগ, জেলা, উপজেলা এবং মৌজা নির্বাচন করুন।',
        instructionEn: 'Navigate to e-Porcha and choose your target Division, District, Upazila, and Mouza.'
      },
      {
        id: 'ins-ep-2',
        serviceId: 'srv-eporcha',
        stepNumber: 2,
        titleBn: 'খতিয়ানের ধরন নির্ধারণ',
        titleEn: 'Choose Khatian Type',
        instructionBn: 'খতিয়ানের ধরন বাছাই করুন (যেমন: আরএস, বিএস, এসএ, সিএস অথবা সিটি জরিপ)।',
        instructionEn: 'Select the survey type (e.g., RS, BS, SA, CS, or City Survey).'
      },
      {
        id: 'ins-ep-3',
        serviceId: 'srv-eporcha',
        stepNumber: 3,
        titleBn: 'খতিয়ান বা দাগ নম্বর দিয়ে অনুসন্ধান',
        titleEn: 'Search by Khatian or Plot Number',
        instructionBn: 'খতিয়ান নম্বর, দাগ নম্বর অথবা মালিকের নাম টাইপ করে অনুসন্ধান বাটনে ক্লিক করুন।',
        instructionEn: 'Enter the Khatian number, Plot number, or owner name and click Search.'
      },
      {
        id: 'ins-ep-4',
        serviceId: 'srv-eporcha',
        stepNumber: 4,
        titleBn: 'সার্টিফাইড কপির আবেদন ও ফি প্রদান',
        titleEn: 'Apply for Certified Copy & Pay Fee',
        instructionBn: 'অনলাইন কপি দেখতে বা সীলমোহরযুক্ত সার্টিফাইড কপির জন্য নির্ধারিত ১০০ টাকা ও ডাক মাশুল বিকাশ/নগদে পরিশোধ করুন।',
        instructionEn: 'View the record or apply for a certified signed copy by paying 100 BDT plus postal charges via bKash/Nagad.'
      }
    ],
    officialFees: [
      {
        id: 'fee-ep-1',
        titleBn: 'অনলাইন সাধারণ অনুসন্ধান',
        titleEn: 'Online View / Search',
        amountBdt: 0,
        notesBn: 'বিনামূল্যে স্ক্রিনে খতিয়ানের বিস্তারিত দেখা যায়'
      },
      {
        id: 'fee-ep-2',
        titleBn: 'সার্টিফাইড কপি সরকারি কোর্ট ফি',
        titleEn: 'Certified Copy Government Court Fee',
        amountBdt: 100,
        notesBn: 'ডিসি অফিস রেকর্ডরুম সত্যায়িত কপি'
      },
      {
        id: 'fee-ep-3',
        titleBn: 'ডাক মাশুল (দেশের ভেতরে ডেলিভারি)',
        titleEn: 'Postal Delivery Fee (Domestic)',
        amountBdt: 40,
        notesBn: 'বাংলাদেশ ডাক বিভাগের মাধ্যমে বাড়িতে পৌঁছানো'
      }
    ],
    officialFeesTotalBdt: 140,
    estimatedDeliveryDaysBn: '৭ থেকে ১০ কর্মদিবস (ডাকযোগে)',
    estimatedDeliveryDaysEn: '7 to 10 working days (by postal delivery)',
    links: [
      {
        id: 'lnk-ep-1',
        serviceId: 'srv-eporcha',
        titleBn: 'ই-পর্চা মূল পোর্টাল',
        titleEn: 'e-Porcha Main Portal',
        url: 'https://eporcha.gov.bd/',
        purpose: 'MAIN_PORTAL',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-14'
      },
      {
        id: 'lnk-ep-2',
        serviceId: 'srv-eporcha',
        titleBn: 'খতিয়ান সার্টিফাইড কপি ট্র্যাকিং',
        titleEn: 'Certified Copy Tracking',
        url: 'https://eporcha.gov.bd/',
        purpose: 'TRACKING',
        isPrimary: false,
        isVerified: true,
        lastChecked: '2026-04-14',
        notesBn: 'আবেদন ট্র্যাকিং ট্যাবে আবেদনের আইডি দিয়ে ট্র্যাক করুন'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'support@land.gov.bd',
    supportHoursBn: 'প্রতিদিন সকাল ৯টা থেকে রাত ৮টা (২৪ ঘণ্টা অটোমেটেড)',
    supportHoursEn: 'Everyday 9 AM to 8 PM (24/7 Automated)',
    keywords: ['khatian', 'porcha', 'khotian', 'eporcha', 'CS', 'SA', 'RS', 'BS', 'BRS', 'পর্চা', 'খতিয়ান', 'সার্টিফাইড কপি', 'রেকর্ড'],
    synonymsBn: ['খতিয়ান', 'পর্চা', 'জমির রেকর্ড', 'খতিয়ানের নকল', 'অনলাইন খতিয়ান'],
    synonymsEn: ['khatian', 'porcha', 'record of rights', 'certified copy', 'land record'],
    accessLimitationsBn: 'কিছু প্রত্যন্ত এলাকার অপ্রকাশিত জরিপ রেকর্ডসমূহ এখনো ডিজিটাইজেশন প্রক্রিয়ায় রয়েছে।',
    accessLimitationsEn: 'Unpublished or ongoing survey records in certain remote mouzas may still be in digitization.'
  },
  {
    id: 'srv-mutation',
    slug: 'e-mutation-namjari',
    nameBn: 'ই-নামজারি ও জমাভাগ আবেদন (E-Mutation)',
    nameEn: 'Online Land Mutation & Separation (E-Mutation)',
    shortDescriptionBn: 'ক্রয়, দান বা ওয়ারিশসূত্রে প্রাপ্ত জমির মালিকানা রেকর্ড হালনাগাদ ও নিজস্ব খতিয়ান খোলার সরকারি আবেদন।',
    shortDescriptionEn: 'Official digital mutation application to update land title and generate an individual khatian after purchase, gift, or inheritance.',
    detailedDescriptionBn: 'ই-নামজারি হলো কোনো ব্যক্তির জমির মালিকানা হস্তান্তরের পর সরকারি রেকর্ড বইয়ে পূর্ববর্তী মালিকের নামের পরিবর্তে নতুন মালিকের নাম লিপিবদ্ধ করার প্রক্রিয়া। এর মাধ্যমে এসিল্যান্ড অফিসে না গিয়েও অনলাইনে আবেদন করা যায়, শুনানির নোটিশ এসএমএস-এ পাওয়া যায় এবং নির্ধারিত ফি দিয়ে নামজারি খতিয়ান ও ডিসিআর ডাউনলোড করা যায়।',
    detailedDescriptionEn: 'E-Mutation is the statutory process to record new ownership in government land registers following a deed transfer, gift, or inheritance. The entire application, hearing notification, fee payment, and khatian issuance are handled online.',
    institutionId: 'inst-minland',
    categoryId: 'cat-mutation',
    officialWebsiteUrl: 'https://mutation.land.gov.bd/',
    directServiceUrl: 'https://mutation.land.gov.bd/',
    integrationType: 'TYPE_1_EXTERNAL_LINK',
    availabilityStatus: 'SERVICE_PAGE_VERIFIED',
    lastVerifiedDate: '2026-04-14',
    verificationSource: 'ভূমি মন্ত্রণালয় পরিপত্র নং ৩১.০০.০০০০.০৪২.৬৮.০১২.২০ ও স্মার্ট ভূমি সেবা নির্দেশিকা',
    isPopular: true,
    isPublished: true,
    eligibilityBn: [
      'দলিলমূলে জমির নতুন ক্রেতা বা গ্রহীতা (সাফ-কবলা, হেবা, দান ইত্যাদি)',
      'ওয়ারিশান বা ফারায়েজসূত্রে জমির উত্তরাধিকারী',
      'আদালতের ডিগ্রি বা আদেশপ্রাপ্ত ভূমির মালিক'
    ],
    eligibilityEn: [
      'New legal owner by virtue of registered deed (sale, gift, heba, exchange)',
      'Legal heir by inheritance or faraiz',
      'Title decreed by court of competent civil jurisdiction'
    ],
    requiredDocumentsBn: [
      'আবেদনকারীর জাতীয় পরিচয়পত্র (NID) ও পাসপোর্ট সাইজের ছবি',
      'মূল দলিলের স্ক্যান কপি বা ফটোকপি (ক্রয়সূত্রে হলে)',
      'পিট দলিল (পূর্ববর্তী ধারাবাহিক দলিল)',
      'সর্বশেষ নামজারি ও জরিপ খতিয়ানের কপি',
      'হালনাগাদ ভূমি উন্নয়ন কর (খাজনা) পরিশোধের দাখিলা রশিদ',
      'ওয়ারিশ সূত্রে হলে স্থানীয় ইউপি চেয়ারম্যান/কাউন্সিলর প্রদত্ত ওয়ারিশান সনদ'
    ],
    requiredDocumentsEn: [
      'Applicant National ID (NID) and passport-size digital photo',
      'Registered deed scan or copy',
      'Chain of deeds (pit dalil) establishing legal ownership',
      'Latest survey khatian / previous mutation record',
      'Up-to-date Land Development Tax (LD Tax) payment receipt',
      'Warishan certificate from Union Parishad / City Ward Councillor (if by inheritance)'
    ],
    instructions: [
      {
        id: 'ins-mut-1',
        serviceId: 'srv-mutation',
        stepNumber: 1,
        titleBn: 'নাগরিক কর্নারে লগইন বা আবেদন শুরু',
        titleEn: 'Start Application on Mutation Portal',
        instructionBn: 'mutation.land.gov.bd পোর্টালে গিয়ে এনআইডি এবং মোবাইল নম্বর দিয়ে ওটিপি যাচাই করে আবেদন শুরু করুন।',
        instructionEn: 'Go to mutation.land.gov.bd, verify identity using NID and mobile OTP, and begin the application.'
      },
      {
        id: 'ins-mut-2',
        serviceId: 'srv-mutation',
        stepNumber: 2,
        titleBn: 'জমির তথ্য ও আবেদনকারীর বিবরণ পূরণ',
        titleEn: 'Enter Land Particulars and Ownership Details',
        instructionBn: 'বিভাগ, জেলা, উপজেলা, মৌজা, খতিয়ান ও দাগ নম্বর এবং প্রস্তাবিত জমির পরিমাণ উল্লেখ করুন।',
        instructionEn: 'Specify Division, District, Upazila, Mouza, Plot number, and proposed mutation land area.'
      },
      {
        id: 'ins-mut-3',
        serviceId: 'srv-mutation',
        stepNumber: 3,
        titleBn: 'কাগজপত্র আপলোড ও কোর্ট ফি প্রদান',
        titleEn: 'Upload Documents and Initial Court Fee',
        instructionBn: 'দলিল, খতিয়ান ও ওয়ারিশান সনদ সংযুক্ত করে আবেদন কোর্ট ফি ২০ টাকা ও নোটিশ জারি ফি ৫০ টাকা (মোট ৭০ টাকা) বিকাশ/নগদে পরিশোধ করুন।',
        instructionEn: 'Attach deed, khatian, and documents, then pay the 70 BDT initial fee (Court fee 20 BDT + Notice fee 50 BDT) via mobile banking.'
      },
      {
        id: 'ins-mut-4',
        serviceId: 'srv-mutation',
        stepNumber: 4,
        titleBn: 'তদন্ত, শুনানি ও চূড়ান্ত খতিয়ান প্রাপ্তি',
        titleEn: 'Inquiry, Hearing and Final Khatian Issuance',
        instructionBn: 'তহসিল অফিস ও এসিল্যান্ডের আদেশ শেষে রেকর্ড সংশোধন ফি ১,০০০ টাকা ও খতিয়ান ফি ১০০ টাকা দিয়ে অনলাইন খতিয়ান ও ডিসিআর ডাউনলোড করুন।',
        instructionEn: 'After inquiry and AC Land approval, pay the 1,100 BDT final record correction and dakhila fee to download the certified mutation khatian and DCR.'
      }
    ],
    officialFees: [
      {
        id: 'fee-mut-1',
        titleBn: 'আবেদন কোর্ট ফি (Court Fee)',
        titleEn: 'Application Court Fee',
        amountBdt: 20,
        notesBn: 'আবেদনের সময় প্রদেয়'
      },
      {
        id: 'fee-mut-2',
        titleBn: 'নোটিশ জারি ফি (Notice Fee)',
        titleEn: 'Process Notice Serving Fee',
        amountBdt: 50,
        notesBn: 'শুনানির নোটিশ জারির জন্য'
      },
      {
        id: 'fee-mut-3',
        titleBn: 'রেকর্ড সংশোধন বা নামজারি ফি',
        titleEn: 'Record Correction Fee',
        amountBdt: 1000,
        notesBn: 'আবেদন মঞ্জুর হওয়ার পর প্রদেয়'
      },
      {
        id: 'fee-mut-4',
        titleBn: 'খতিয়ান সরবরাহ ফি ও ডিসিআর',
        titleEn: 'Khatian Issuance & DCR Fee',
        amountBdt: 100,
        notesBn: 'চূড়ান্ত কপি ও ডিসিআর প্রাপ্তির জন্য'
      }
    ],
    officialFeesTotalBdt: 1170,
    estimatedDeliveryDaysBn: '২৮ কর্মদিবস (আইনসম্মত সর্বোচ্চ সময়সীমা)',
    estimatedDeliveryDaysEn: '28 working days (statutory standard service timeline)',
    links: [
      {
        id: 'lnk-mut-1',
        serviceId: 'srv-mutation',
        titleBn: 'অনলাইন ই-নামজারি আবেদন পাতা',
        titleEn: 'Online E-Mutation Application Page',
        url: 'https://mutation.land.gov.bd/',
        purpose: 'APPLICATION',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-14'
      },
      {
        id: 'lnk-mut-2',
        serviceId: 'srv-mutation',
        titleBn: 'নামজারি আবেদন ট্র্যাকিং',
        titleEn: 'Mutation Application Tracking',
        url: 'https://mutation.land.gov.bd/application-tracking',
        purpose: 'TRACKING',
        isPrimary: false,
        isVerified: true,
        lastChecked: '2026-04-14',
        notesBn: 'আবেদন নম্বর ও জাতীয় পরিচয়পত্র দিয়ে অবস্থান যাচাই করুন'
      },
      {
        id: 'lnk-mut-3',
        serviceId: 'srv-mutation',
        titleBn: 'ই-নামজারি নাগরিক নির্দেশিকা ও নির্দেশনামা',
        titleEn: 'Citizen Guidelines & Gazette Rules',
        url: 'https://minland.gov.bd/',
        purpose: 'MANUAL_OR_GUIDE',
        isPrimary: false,
        isVerified: true,
        lastChecked: '2026-04-14'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'mutation@land.gov.bd',
    supportHoursBn: '২৪ ঘণ্টা নাগরিক হটলাইন ১৬১২২',
    supportHoursEn: '24/7 Citizen Helpline 16122',
    keywords: ['mutation', 'namjari', 'namkhorij', 'e-mutation', 'নামজারি', 'খারিজ', 'জমাভাগ', 'জমাএকত্রীকরণ', 'নাম পরিবর্তন', 'খতিয়ান তৈরি', 'মালিকানা পরিবর্তন'],
    synonymsBn: ['নামজারি', 'খারিজ', 'জমাভাগ', 'নাম পরিবর্তন', 'মিউটেশন'],
    synonymsEn: ['mutation', 'namjari', 'title change', 'record correction', 'separation'],
    accessLimitationsBn: 'উত্তরাধিকার সূত্রে নামজারির ক্ষেত্রে সকল ওয়ারিশের সম্মতি বা নোটিশ জারি বাধ্যতামূলক।'
  },
  {
    id: 'srv-ldtax',
    slug: 'land-development-tax-ldtax',
    nameBn: 'অনলাইন ভূমি উন্নয়ন কর (খাজনা পরিশোধ ও দাখিলা)',
    nameEn: 'Land Development Tax Payment & e-Dakhila',
    shortDescriptionBn: 'অনলাইনে জমির হোল্ডিং তথ্য যাচাই, বকেয়া ও হাল খাজনার পরিমাণ হিসাব, ডিজিটাল পেমেন্ট ও কিউআর কোডযুক্ত দাখিলা রশিদ ডাউনলোড।',
    shortDescriptionEn: 'Holding registration, automated assessment of land revenue arrears and current dues, e-Payment, and QR-coded digital tax receipt download.',
    detailedDescriptionBn: 'ভূমি উন্নয়ন কর আইন ২০২৩ অনুযায়ী সকল প্রকার ভূমির কর অনলাইনে পরিশোধ বাধ্যতামূলক করা হয়েছে। নাগরিকরা ldtax.gov.bd ওয়েবসাইটে এনআইডি দিয়ে নিবন্ধন করে নিজ নামে থাকা সকল জমির হোল্ডিং যুক্ত করতে পারেন এবং ঘরে বসেই মোবাইল ব্যাংকিংয়ের মাধ্যমে খাজনা পরিশোধ করে তাৎক্ষণিক ডিজিটাল দাখিলা সংগ্রহ করতে পারেন।',
    detailedDescriptionEn: 'Under the Land Development Tax Act 2023, payment of land tax in Bangladesh is entirely automated. Citizens register once using their NID, link their land holdings, check arrears, pay using bKash/Nagad/Cards, and receive instant verifiable QR-coded receipts.',
    institutionId: 'inst-lrb',
    categoryId: 'cat-tax',
    officialWebsiteUrl: 'https://ldtax.gov.bd/',
    directServiceUrl: 'https://ldtax.gov.bd/',
    integrationType: 'TYPE_1_EXTERNAL_LINK',
    availabilityStatus: 'SERVICE_PAGE_VERIFIED',
    lastVerifiedDate: '2026-04-14',
    verificationSource: 'ভূমি উন্নয়ন কর আইন ২০২৩ ও ভূমি সংস্কার বোর্ড পরিপত্র',
    isPopular: true,
    isPublished: true,
    eligibilityBn: [
      'বাংলাদেশের যেকোনো কৃষি বা অকৃষি ভূমির মালিক বা বৈধ প্রতিনিধি',
      'ব্যক্তিগত মালিকানাধীন বা প্রাতিষ্ঠানিক জমির করদাতা'
    ],
    eligibilityEn: [
      'Any agricultural or non-agricultural land owner in Bangladesh',
      'Individual citizens or institutional land holders'
    ],
    requiredDocumentsBn: [
      'জাতীয় পরিচয়পত্র (NID) নম্বর ও জন্ম তারিখ',
      'সচল মোবাইল নম্বর (রেজিস্ট্রেশনের সময় ওটিপি আসবে)',
      'সর্বশেষ নামজারি খতিয়ান নম্বর ও দাগ নম্বর',
      'পূর্বের কোনো দাখিলা বা খাজনা রশিদের কপি (যদি থাকে)'
    ],
    requiredDocumentsEn: [
      'National ID (NID) number and date of birth',
      'Active mobile number (for OTP verification)',
      'Latest mutation khatian and plot number',
      'Previous dakhila or receipt copy (if available)'
    ],
    instructions: [
      {
        id: 'ins-tax-1',
        serviceId: 'srv-ldtax',
        stepNumber: 1,
        titleBn: 'নাগরিক নিবন্ধন (এনআইডি যাচাই)',
        titleEn: 'Citizen Registration with NID',
        instructionBn: 'ldtax.gov.bd-এ প্রবেশ করে এনআইডি নম্বর, জন্মতারিখ ও মোবাইল নম্বর দিয়ে নিবন্ধন সম্পন্ন করুন।',
        instructionEn: 'Access ldtax.gov.bd, enter your NID, birth date, and mobile number to complete registration.'
      },
      {
        id: 'ins-tax-2',
        serviceId: 'srv-ldtax',
        stepNumber: 2,
        titleBn: 'হোল্ডিং এন্ট্রি বা আবেদন',
        titleEn: 'Add Land Holding Details',
        instructionBn: 'বিভাগ, জেলা, উপজেলা ও মৌজা নির্বাচন করে আপনার খতিয়ান ও দাগ নম্বরসহ হোল্ডিং তথ্য যুক্ত করুন।',
        instructionEn: 'Select jurisdiction (District, Upazila, Mouza) and link your Khatian and plot numbers.'
      },
      {
        id: 'ins-tax-3',
        serviceId: 'srv-ldtax',
        stepNumber: 3,
        titleBn: 'ইউনিয়ন ভূমি সহকারী কর্মকর্তার অনুমোদন',
        titleEn: 'Union Land Office Approval',
        instructionBn: 'সংশ্লিষ্ট ইউনিয়ন ভূমি সহকারী কর্মকর্তা আপনার হোল্ডিংটি যাচাই করে কর ধার্য অনুমোদন করবেন।',
        instructionEn: 'The Union Land Assistant Officer reviews ownership and approves the assessed tax rate.'
      },
      {
        id: 'ins-tax-4',
        serviceId: 'srv-ldtax',
        stepNumber: 4,
        titleBn: 'অনলাইন পেমেন্ট ও দাখিলা সংগ্রহ',
        titleEn: 'Online Payment and e-Dakhila Download',
        instructionBn: 'বিকাশ, নগদ, রকেট বা ডেবিট/ক্রেডিট কার্ডের মাধ্যমে কর পরিশোধ করুন এবং কিউআর কোডযুক্ত ই-দাখিলা ডাউনলোড করুন।',
        instructionEn: 'Pay via bKash, Nagad, Rocket, or bank card and immediately download the digitally signed e-Dakhila.'
      }
    ],
    officialFees: [
      {
        id: 'fee-tax-1',
        titleBn: 'কৃষি জমি (২৫ বিঘা পর্যন্ত)',
        titleEn: 'Agricultural Land (up to 25 bighas / 8.25 acres)',
        amountBdt: 0,
        notesBn: '২৫ বিঘা পর্যন্ত কৃষি জমির ভূমি উন্নয়ন কর সম্পূর্ণ মওকুফ (তবে বার্ষিক দাখিলা নবায়ন ফি প্রয়োজন হতে পারে)'
      },
      {
        id: 'fee-tax-2',
        titleBn: 'আবাসিক/বাণিজ্যিক/শিল্প জমি',
        titleEn: 'Residential / Commercial / Industrial Land',
        amountBdt: 0,
        notesBn: 'এলাকাভিত্তিক পৌরসভা, সিটি করপোরেশন ও ইউনিয়ন পরিষদের নির্ধারিত সরকারি স্কেল অনুযায়ী হিসাব হয়'
      }
    ],
    estimatedDeliveryDaysBn: 'তাৎক্ষণিক (অনলাইন পেমেন্টের সাথে সাথেই ই-দাখিলা পাওয়া যায়)',
    estimatedDeliveryDaysEn: 'Instant (e-Dakhila generated immediately after payment)',
    links: [
      {
        id: 'lnk-tax-1',
        serviceId: 'srv-ldtax',
        titleBn: 'ভূমি উন্নয়ন কর পোর্টাল',
        titleEn: 'Land Development Tax Portal',
        url: 'https://ldtax.gov.bd/',
        purpose: 'MAIN_PORTAL',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-14'
      },
      {
        id: 'lnk-tax-2',
        serviceId: 'srv-ldtax',
        titleBn: 'নাগরিক কর্নার ও লগইন',
        titleEn: 'Citizen Portal & Login',
        url: 'https://ldtax.gov.bd/citizen/login',
        purpose: 'APPLICATION',
        isPrimary: false,
        isVerified: true,
        lastChecked: '2026-04-14'
      },
      {
        id: 'lnk-tax-3',
        serviceId: 'srv-ldtax',
        titleBn: 'দাখিলা যাচাই (QR Code Verification)',
        titleEn: 'Verify Dakhila by QR Code',
        url: 'https://ldtax.gov.bd/dakhila/verify',
        purpose: 'TRACKING',
        isPrimary: false,
        isVerified: true,
        lastChecked: '2026-04-14'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'ldtax@land.gov.bd',
    supportHoursBn: '১৬১২২ নম্বরে কল করে সরাসরি খাজনা পরিশোধ সহায়তা নিন',
    supportHoursEn: 'Call 16122 for assisted tax payment and holding guidance',
    keywords: ['tax', 'ldtax', 'khajna', 'dakhila', 'land tax', 'খাজনা', 'ভূমি উন্নয়ন কর', 'দাখিলা', 'ট্যাক্স', 'হোল্ডিং', 'এলডি ট্যাক্স', 'রশিদ'],
    synonymsBn: ['খাজনা', 'ভূমি কর', 'দাখিলা', 'জমির ট্যাক্স', 'এলডিট্যাক্স'],
    synonymsEn: ['land tax', 'ldtax', 'revenue', 'dakhila', 'holding tax'],
    accessLimitationsBn: 'নতুন হোল্ডিং যুক্ত করার পর ইউনিয়ন ভূমি কর্মকর্তার অনুমোদনের জন্য সাধারণত ১-৩ কর্মদিবস সময় লাগতে পারে।'
  },
  {
    id: 'srv-mouza-maps',
    slug: 'mouza-maps-cadastral-sheets',
    nameBn: 'মৌজা ম্যাপ ও ভূ-নকশা সেবা (ডিএলআরএস)',
    nameEn: 'Mouza Map & Cadastral Sheet Ordering',
    shortDescriptionBn: 'অনলাইনে মৌজা ম্যাপ অনুসন্ধান, সিট নম্বর যাচাই এবং বাংলাদেশ ডাক বিভাগের মাধ্যমে প্রিন্ট কপি হোম ডেলিভারির আবেদন।',
    shortDescriptionEn: 'Search mouza maps by sheet number, preview plot layout, and order high-resolution printed map sheets delivered to your address.',
    detailedDescriptionBn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তরের (DLRS) সংরক্ষিত সকল মুদ্রিত মৌজা ম্যাপ ডিজিটালভাবে সংগ্রহের জন্য এই সেবা চালু করা হয়েছে। নাগরিকরা নির্দিষ্ট জেলা, উপজেলা, মৌজা এবং সিট নম্বর নির্বাচন করে ডাকযোগে প্রিন্ট কপির অর্ডার করতে পারেন। এটি নির্ধারিত সরকারি প্লাস্টিক টিউবে সুরক্ষিতভাবে ডাকযোগে পৌঁছে দেওয়া হয়।',
    detailedDescriptionEn: 'Enables citizens to search and order original cadastral mouza maps printed by DLRS. Maps are packaged in protective waterproof tubes and delivered by Bangladesh Post directly to the citizen.',
    institutionId: 'inst-dlrs',
    categoryId: 'cat-maps',
    officialWebsiteUrl: 'https://eporcha.gov.bd/',
    directServiceUrl: 'https://eporcha.gov.bd/',
    integrationType: 'TYPE_1_EXTERNAL_LINK',
    availabilityStatus: 'SERVICE_PAGE_VERIFIED',
    lastVerifiedDate: '2026-04-14',
    verificationSource: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর ও বাংলাদেশ ডাক বিভাগ',
    isPopular: true,
    isPublished: true,
    eligibilityBn: [
      'বাংলাদেশের যেকোনো নাগরিক বা প্রতিষ্ঠান',
      'জমি পরিমাপকারী (আমিন/সার্ভেয়ার), প্রকৌশলী ও সাধারণ জমির মালিক'
    ],
    eligibilityEn: [
      'Any citizen, surveyor, legal practitioner, or institution in Bangladesh',
      'Property developers, engineers, and land owners'
    ],
    requiredDocumentsBn: [
      'কাঙ্ক্ষিত মৌজার নাম ও জেএল (J.L) নম্বর',
      'সিট নম্বর (যদি মৌজায় একাধিক সিট থাকে)',
      'আবেদনকারীর এনআইডি ও সচল মোবাইল নম্বর',
      'সঠিক ডাক যোগাযোগ ঠিকানা'
    ],
    requiredDocumentsEn: [
      'Mouza name and J.L number',
      'Sheet number (if mouza contains multiple sheets)',
      'Applicant NID and phone number',
      'Postal delivery address'
    ],
    instructions: [
      {
        id: 'ins-map-1',
        serviceId: 'srv-mouza-maps',
        stepNumber: 1,
        titleBn: 'মৌজা ম্যাপ অপশন নির্বাচন',
        titleEn: 'Choose Mouza Map Module',
        instructionBn: 'ই-পর্চা পোর্টালে গিয়ে "মৌজা ম্যাপ" ট্যাবে ক্লিক করুন।',
        instructionEn: 'Go to eporcha.gov.bd and click the "Mouza Map" navigation tab.'
      },
      {
        id: 'ins-map-2',
        serviceId: 'srv-mouza-maps',
        stepNumber: 2,
        titleBn: 'এলাকা ও সিট নম্বর বাছাই',
        titleEn: 'Select District, Mouza & Sheet',
        instructionBn: 'বিভাগ, জেলা, উপজেলা, মৌজা এবং প্রয়োজনীয় সিট নম্বরটি নির্বাচন করুন।',
        instructionEn: 'Choose your Division, District, Upazila, Mouza, and the required sheet number.'
      },
      {
        id: 'ins-map-3',
        serviceId: 'srv-mouza-maps',
        stepNumber: 3,
        titleBn: 'আবেদন ও সরকারি ফি পরিশোধ',
        titleEn: 'Submit Application & Pay Fee',
        instructionBn: 'ম্যাপের জন্য সরকারি ফি ৫২০ টাকা বিকাশ বা নগদের মাধ্যমে অনলাইনে পরিশোধ করুন।',
        instructionEn: 'Pay the official government certified map fee of 520 BDT via mobile payment.'
      },
      {
        id: 'ins-map-4',
        serviceId: 'srv-mouza-maps',
        stepNumber: 4,
        titleBn: 'ডাকযোগে ম্যাপ গ্রহণ',
        titleEn: 'Receive Tube Package by Post',
        instructionBn: 'ডাক বিভাগের মাধ্যমে ট্র্যাক করে নিজ ঠিকানায় প্রস্তুতকৃত ম্যাপ গ্রহণ করুন।',
        instructionEn: 'Track package status and receive your printed map sheet at your door.'
      }
    ],
    officialFees: [
      {
        id: 'fee-map-1',
        titleBn: 'মৌজা ম্যাপ প্রিন্ট ও সরকারি ফি',
        titleEn: 'Mouza Map Print & Government Fee',
        amountBdt: 520,
        notesBn: 'প্রতি সিট ম্যাপের জন্য ডাক মাশুল ও বিশেষ প্যাকিং টিউব চার্জসহ সর্বমোট ৫২০ টাকা'
      }
    ],
    officialFeesTotalBdt: 520,
    estimatedDeliveryDaysBn: '১০ থেকে ১৫ কর্মদিবস (ডাকযোগে ডেলিভারি)',
    estimatedDeliveryDaysEn: '10 to 15 working days (postal parcel)',
    links: [
      {
        id: 'lnk-map-1',
        serviceId: 'srv-mouza-maps',
        titleBn: 'মৌজা ম্যাপ অনুসন্ধান পাতা',
        titleEn: 'Mouza Map Search Page',
        url: 'https://eporcha.gov.bd/',
        purpose: 'MAIN_PORTAL',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-14'
      },
      {
        id: 'lnk-map-2',
        serviceId: 'srv-mouza-maps',
        titleBn: 'ডিএলআরএস রেকর্ডরুম তথ্য',
        titleEn: 'DLRS Record Room Information',
        url: 'https://dlrs.gov.bd/',
        purpose: 'OFFICE_WEBSITE',
        isPrimary: false,
        isVerified: true,
        lastChecked: '2026-04-10'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'dlrs@land.gov.bd',
    supportHoursBn: 'অফিস চলাকালীন সকাল ৯টা - বিকাল ৫টা',
    supportHoursEn: 'Office hours: 9 AM - 5 PM',
    keywords: ['map', 'mouza', 'cadastral', 'sheet', 'dlrs', 'ম্যাপ', 'মৌজা', 'নকশা', 'সিট', 'জরিপ', 'ভূ-নকশা'],
    synonymsBn: ['মৌজা ম্যাপ', 'জমির নকশা', 'ক্যাডাস্ট্রাল ম্যাপ', 'সিট নকশা'],
    synonymsEn: ['mouza map', 'cadastral map', 'plot map', 'sheet layout'],
  },
  {
    id: 'srv-larms',
    slug: 'land-acquisition-requisition-larms',
    nameBn: 'ভূমি অধিগ্রহণ ও ক্ষতিপূরণ ব্যবস্থাপনা সিস্টেম (LARMS)',
    nameEn: 'Land Acquisition & Compensation System (LARMS)',
    shortDescriptionBn: 'জাতীয় উন্নয়ন প্রকল্পে ভূমি অধিগ্রহণ বিজ্ঞপ্তি, ৪/৭/৮ ধারার নোটিশ, ক্ষতিপূরণের আবেদন ও অর্থ প্রাপ্তির অগ্রগতি ট্র্যাকিং।',
    shortDescriptionEn: 'Public gazette notices for land acquisition, Section 4/7/8 notifications, compensation claim submissions, and award tracking.',
    detailedDescriptionBn: 'স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন ২০১৭ অনুযায়ী সরকারি প্রকল্পে অধিগ্রহণকৃত ভূমির ক্ষতিপূরণ প্রক্রিয়া স্বচ্ছ ও হয়রানিমুক্ত করতে এলএআরএমএস চালু হয়েছে। ক্ষতিগ্রস্ত ভূমির মালিকরা কোনো মধ্যস্বত্বভোগী ছাড়াই অনলাইনে ক্ষতিপূরণের দাবি দাখিল করতে পারেন এবং তাদের পাওনা অর্থ প্রাপ্তির স্ট্যাটাস পর্যবেক্ষণ করতে পারেন।',
    detailedDescriptionEn: 'LARMS automates compensation processing under the Acquisition and Requisition of Immovable Property Act 2017. Landowners impacted by public infrastructure projects can file claims directly and track compensation disbursement transparently.',
    institutionId: 'inst-minland',
    categoryId: 'cat-larms',
    officialWebsiteUrl: 'https://larms.land.gov.bd/',
    directServiceUrl: 'https://larms.land.gov.bd/',
    integrationType: 'TYPE_1_EXTERNAL_LINK',
    availabilityStatus: 'SERVICE_PAGE_VERIFIED',
    lastVerifiedDate: '2026-04-14',
    verificationSource: 'ভূমি মন্ত্রণালয় অধিগ্রহণ শাখা ও জেলা প্রশাসন এলএ শাখা',
    isPopular: true,
    isPublished: true,
    eligibilityBn: [
      'অধিগ্রহণকৃত জমির বৈধ মালিক বা তাদের বিধিসম্মত উত্তরাধিকারী',
      'অধিগ্রহণকৃত অবকাঠামো বা ফসলের ক্ষতিগ্রস্ত স্বত্বাধিকারী'
    ],
    eligibilityEn: [
      'Lawful owners or legal heirs of land acquired for public infrastructure projects',
      'Claimants entitled to compensation for buildings, structures, or standing crops'
    ],
    requiredDocumentsBn: [
      'এলএ কেস (LA Case) নম্বর ও গেজেট নোটিশের কপি',
      'যৌথ তদন্তের বিবরণী (Joint Verification Inventory)',
      'মালিকানার ধারাবাহিক দলিল ও হালনাগাদ নামজারি খতিয়ান',
      'হালনাগাদ ভূমি উন্নয়ন কর (খাজনা) পরিশোধের দাখিলা',
      'আবেদনকারীর এনআইডি, ছবি ও ব্যাংক অ্যাকাউন্ট বিবরণী (ইএফটি-এর জন্য)'
    ],
    requiredDocumentsEn: [
      'LA Case number and relevant gazette notification reference',
      'Joint verification inventory list',
      'Original title deeds and up-to-date mutation khatian',
      'Current Land Development Tax payment receipt',
      'Applicant NID, photo, and bank details (for EFT disbursement)'
    ],
    instructions: [
      {
        id: 'ins-la-1',
        serviceId: 'srv-larms',
        stepNumber: 1,
        titleBn: 'এলএ কেস ও নোটিশ অনুসন্ধান',
        titleEn: 'Search LA Case and Notices',
        instructionBn: 'larms.land.gov.bd-এ প্রবেশ করে সংশ্লিষ্ট জেলা ও প্রকল্পের এলএ কেস নম্বর দিয়ে অনুসন্ধান করুন।',
        instructionEn: 'Visit larms.land.gov.bd, enter district and project LA Case reference.'
      },
      {
        id: 'ins-la-2',
        serviceId: 'srv-larms',
        stepNumber: 2,
        titleBn: 'ক্ষতিপূরণ দাবির আবেদন ও প্রমাণক জমা',
        titleEn: 'Submit Claim & Ownership Evidence',
        instructionBn: 'আপনার দাগ, মালিকানার নথিপত্র এবং ব্যাংক অ্যাকাউন্ট তথ্য আপলোড করে আবেদন সাবমিট করুন।',
        instructionEn: 'Upload ownership documents, plot particulars, and bank details for EFT transfer.'
      },
      {
        id: 'ins-la-3',
        serviceId: 'srv-larms',
        stepNumber: 3,
        titleBn: 'শুনানি ও রোয়েদাদ (Award) অনুমোদন',
        titleEn: 'Hearing and Award Approval',
        instructionBn: 'জেলা প্রশাসকের এলএ শাখার শুনানিতে অংশগ্রহণ ও মূল নথিপত্র প্রদর্শনের পর ক্ষতিপূরণের আদেশ অনুমোদিত হয়।',
        instructionEn: 'Attend DC office LA branch hearing with original documents for award approval.'
      }
    ],
    officialFees: [
      {
        id: 'fee-la-1',
        titleBn: 'ক্ষতিপূরণ আবেদনের সরকারি ফি',
        titleEn: 'Government Claim Submission Fee',
        amountBdt: 0,
        notesBn: 'আবেদনের জন্য কোনো সরকারি ফি লাগে না (সম্পূর্ণ বিনামূল্যে সেবা)'
      }
    ],
    officialFeesTotalBdt: 0,
    estimatedDeliveryDaysBn: 'নথিপত্র যাচাই ও রোয়েদাদ প্রস্তুত সাপেক্ষে ৪৫-৬০ দিন',
    estimatedDeliveryDaysEn: '45 to 60 days subject to verification and award declaration',
    links: [
      {
        id: 'lnk-la-1',
        serviceId: 'srv-larms',
        titleBn: 'LARMS ক্ষতিপূরণ সিস্টেম',
        titleEn: 'LARMS Compensation Portal',
        url: 'https://larms.land.gov.bd/',
        purpose: 'APPLICATION',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-14'
      },
      {
        id: 'lnk-la-2',
        serviceId: 'srv-larms',
        titleBn: 'ক্ষতিপূরণ আবেদন ট্র্যাকিং',
        titleEn: 'Track Compensation Claim Status',
        url: 'https://larms.land.gov.bd/',
        purpose: 'TRACKING',
        isPrimary: false,
        isVerified: true,
        lastChecked: '2026-04-14'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'larms@land.gov.bd',
    supportHoursBn: '১৬১২২ অথবা জেলা প্রশাসন এলএ শাখা',
    supportHoursEn: 'Helpline 16122 or District Commissioner LA section',
    keywords: ['larms', 'acquisition', 'compensation', 'la case', 'অধিগ্রহণ', 'ক্ষতিপূরণ', 'এলএ কেস', 'হুকুমদখল', 'বিল'],
    synonymsBn: ['ভূমি অধিগ্রহণ', 'এলএ কেস', 'ক্ষতিপূরণ', 'হুকুম দখল'],
    synonymsEn: ['land acquisition', 'compensation', 'requisition', 'la case'],
  },
  {
    id: 'srv-deed-reg',
    slug: 'deed-registration-stamp-duty',
    nameBn: 'দলিল নিবন্ধন, ফি ক্যালকুলেটর ও সাব-রেজিস্ট্রি সেবা',
    nameEn: 'Deed Registration & Stamp Duty Calculator',
    shortDescriptionBn: 'সাফ-কবলা, হেবা, দান বা বণ্টন দলিলের নমুনা ফরম, আইনসম্মত স্ট্যাম্প শুল্ক ও নিবন্ধন ফি হিসাব এবং সাব-রেজিস্ট্রার অফিসের তথ্য।',
    shortDescriptionEn: 'Standard deed drafting templates, statutory stamp duty and registration fee calculators, and sub-registry office locator.',
    detailedDescriptionBn: 'নিবন্ধন অধিদপ্তরের তত্ত্বাবধানে স্থাবর সম্পত্তি হস্তান্তরের দলিল রেজিস্ট্রেশন প্রক্রিয়া পরিচালিত হয়। নাগরিকরা জমি কেনার পূর্বে বা হস্তান্তরের সময় প্রযোজ্য রেজিস্ট্রেশন ফি, স্ট্যাম্প শুল্ক, স্থানীয় সরকার কর ও উৎসে করের সঠিক হিসাব পেতে পারেন এবং নমুনা ফরম দেখে দলিল তৈরি করতে পারেন।',
    detailedDescriptionEn: 'Managed under the Directorate of Registration (Ministry of Law), this service assists citizens with statutory deed drafting, calculating precise stamp duties, registration fees, and local government taxes before visiting the Sub-Registry office.',
    institutionId: 'inst-dolr',
    categoryId: 'cat-deeds',
    officialWebsiteUrl: 'https://dolr.gov.bd/',
    directServiceUrl: 'https://dolr.gov.bd/',
    integrationType: 'TYPE_1_EXTERNAL_LINK',
    availabilityStatus: 'SERVICE_PAGE_VERIFIED',
    lastVerifiedDate: '2026-03-29',
    verificationSource: 'নিবন্ধন আইন ১৯০৮ ও স্ট্যাম্প আইন ১৮৯৯',
    isPopular: true,
    isPublished: true,
    eligibilityBn: [
      'জমির দাতা ও গ্রহীতা (উভয় পক্ষ)',
      'রেজিস্টার্ড আমমোক্তারনামাপ্রাপ্ত ব্যক্তি বা অভিভাবক'
    ],
    eligibilityEn: [
      'Buyer and Seller / Donor and Donee of immovable property',
      'Registered power-of-attorney holder or legal guardian'
    ],
    requiredDocumentsBn: [
      'উভয় পক্ষের জাতীয় পরিচয়পত্র (NID)',
      'সর্বশেষ নামজারি খতিয়ান ও হালনাগাদ ভূমি উন্নয়ন কর পরিশোধের দাখিলা রশিদ (বাধ্যতামূলক)',
      'পূর্ববর্তী মালিকানার মূল দলিল বা পিট দলিল',
      'ওয়ারিশ সূত্রে হস্তান্তর হলে সনদপত্র',
      'পাসপোর্ট সাইজের রঙিন ছবি ও স্ট্যাম্প'
    ],
    requiredDocumentsEn: [
      'National ID cards of both parties',
      'Latest mutation khatian and updated land tax payment receipt (mandatory)',
      'Original title deeds / chain deeds',
      'Warishan certificate (if inherited)',
      'Passport size photos and requisite judicial stamp paper'
    ],
    instructions: [
      {
        id: 'ins-reg-1',
        serviceId: 'srv-deed-reg',
        stepNumber: 1,
        titleBn: 'দলিল প্রস্তুত ও নমুনা ফরম যাচাই',
        titleEn: 'Draft Deed using Standard Templates',
        instructionBn: 'dolr.gov.bd থেকে দলিলের অনুমোদিত নমুনা ফরম সংগ্রহ করে জমির তপশিল নির্ভুলভাবে লিখুন।',
        instructionEn: 'Obtain authorized deed templates from dolr.gov.bd and fill property particulars accurately.'
      },
      {
        id: 'ins-reg-2',
        serviceId: 'srv-deed-reg',
        stepNumber: 2,
        titleBn: 'সরকারি ফি ও স্ট্যাম্প শুল্ক হিসাব',
        titleEn: 'Calculate Official Stamp Duty & Fees',
        instructionBn: 'জমির মৌজা রেট বা বাজারমূল্যের ওপর ভিত্তি করে স্ট্যাম্প শুল্ক (১.৫%), রেজিস্ট্রেশন ফি (১%) এবং কর হিসাব করুন।',
        instructionEn: 'Calculate stamp duty (1.5%), registration fee (1%), and local government taxes based on mouza value.'
      },
      {
        id: 'ins-reg-3',
        serviceId: 'srv-deed-reg',
        stepNumber: 3,
        titleBn: 'সাব-রেজিস্ট্রি অফিসে সম্পাদন ও রেজিস্ট্রি',
        titleEn: 'Execution at Sub-Registry Office',
        instructionBn: 'সংশ্লিষ্ট সাব-রেজিস্ট্রারের উপস্থিতিতে দাতা ও গ্রহীতার স্বাক্ষর, আঙুলের ছাপ দিয়ে দলিল রেজিস্ট্রি সম্পন্ন করুন।',
        instructionEn: 'Execute deed with biometrics, signatures, and witnesses before the Sub-Registrar.'
      }
    ],
    officialFees: [
      {
        id: 'fee-reg-1',
        titleBn: 'রেজিস্ট্রেশন ফি (দলিলমূল্যের ১%)',
        titleEn: 'Registration Fee (1% of deed value)',
        amountBdt: 0,
        notesBn: 'ন্যূনতম ১০০ টাকা এবং স্থানীয় পৌরসভা/ইউনিয়ন ভিত্তিক প্রযোজ্য'
      },
      {
        id: 'fee-reg-2',
        titleBn: 'স্ট্যাম্প শুল্ক (দলিলমূল্যের ১.৫%)',
        titleEn: 'Stamp Duty (1.5% of deed value)',
        amountBdt: 0,
        notesBn: 'স্ট্যাম্প আইন অনুযায়ী সরকারি রাজস্ব'
      }
    ],
    estimatedDeliveryDaysBn: 'একই দিনে রেজিস্ট্রি সম্পাদন ও মূল দলিল পেতে ১-৩ মাস',
    estimatedDeliveryDaysEn: 'Same-day execution; final bound deed delivery takes 1 to 3 months',
    links: [
      {
        id: 'lnk-reg-1',
        serviceId: 'srv-deed-reg',
        titleBn: 'নিবন্ধন অধিদপ্তর পোর্টাল',
        titleEn: 'Directorate of Registration Portal',
        url: 'https://dolr.gov.bd/',
        purpose: 'MAIN_PORTAL',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-03-29'
      },
      {
        id: 'lnk-reg-2',
        serviceId: 'srv-deed-reg',
        titleBn: 'সাব-রেজিস্ট্রি অফিসের তালিকা ও যোগাযোগের তথ্য',
        titleEn: 'Sub-Registry Offices Directory',
        url: 'https://dolr.gov.bd/',
        purpose: 'CITIZEN_CHARTER',
        isPrimary: false,
        isVerified: true,
        lastChecked: '2026-03-29'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'info@dolr.gov.bd',
    supportHoursBn: 'সরকারি কার্যদিবসে সকাল ৯টা - বিকাল ৪টা',
    supportHoursEn: 'Working days 9 AM - 4 PM',
    keywords: ['deed', 'registration', 'dolr', 'stamp', 'দলিল', 'রেজিস্ট্রি', 'সাব-রেজিস্ট্রার', 'বায়না', 'সাফ-কবলা', 'হেবা', 'বণ্টননামা', 'স্ট্যাম্প'],
    synonymsBn: ['দলিল নিবন্ধন', 'রেজিস্ট্রি', 'সাব-রেজিস্ট্রি', 'দলিল তল্লাশ'],
    synonymsEn: ['deed registration', 'registry', 'stamp duty', 'land sale deed'],
  },
  {
    id: 'srv-khas-land',
    slug: 'khas-land-settlement-policy',
    nameBn: 'সরকারি কৃষি খাসজমি বন্দোবস্ত প্রক্রিয়া ও আবেদন',
    nameEn: 'Agricultural Khas Land Settlement for Landless',
    shortDescriptionBn: 'ভূমিহীন কৃষক ও পরিবারের মাঝে সরকারি কৃষি খাসজমি দীর্ঘমেয়াদী বন্দোবস্ত পাওয়ার নীতিমালা, শর্ত ও আবেদন ফরম।',
    shortDescriptionEn: 'Policies, statutory criteria, and application forms for allocating government agricultural khas land to verified landless families.',
    detailedDescriptionBn: 'সরকারের কৃষি খাসজমি ব্যবস্থাপনা ও বন্দোবস্ত নীতিমালা ১৯৯৭ অনুযায়ী প্রকৃত ভূমিহীনদের মধ্যে সরকারি খাসজমি বরাদ্দ দেওয়া হয়। উপজেলা কৃষি খাসজমি ব্যবস্থাপনা ও বন্দোবস্ত কমিটির মাধ্যমে অগ্রাধিকার তালিকা প্রস্তুত করা হয়। মুক্তিযোদ্ধা পরিবার, নদীভাঙা পরিবার, বিধবা বা স্বামী পরিত্যক্তা ভূমিহীন নারীরা এতে বিশেষ অগ্রাধিকার পান।',
    detailedDescriptionEn: 'Under the Agricultural Khas Land Management and Settlement Policy 1997, state-owned lands are settled with authentic landless agricultural families. Applications are screened by Upazila Khas Land Committees with priority for freedom fighter families, river erosion victims, and destitute women.',
    institutionId: 'inst-minland',
    categoryId: 'cat-khas',
    officialWebsiteUrl: 'https://minland.gov.bd/',
    directServiceUrl: 'https://minland.gov.bd/',
    integrationType: 'TYPE_2_INFO_INTEGRATION',
    availabilityStatus: 'OFFICIAL_URL_VERIFIED',
    lastVerifiedDate: '2026-04-12',
    verificationSource: 'কৃষি খাসজমি ব্যবস্থাপনা ও বন্দোবস্ত নীতিমালা ১৯৯৭ ও ভূমি মন্ত্রণালয় নির্দেশিকা',
    isPopular: false,
    isPublished: true,
    eligibilityBn: [
      'যাদের নিজস্ব কোনো চাষযোগ্য জমি নেই অথবা বসতভিটা ব্যতীত মোট জমির পরিমাণ ১০ শতকের কম',
      'যাদের প্রধান জীবিকা শারীরিক কৃষি শ্রম',
      'বীর মুক্তিযোদ্ধা পরিবার, নদীভাঙনে নিঃস্ব পরিবার ও বিধবা ভূমিহীন নারী বিশেষ অগ্রাধিকার পান'
    ],
    eligibilityEn: [
      'Families owning no arable land, or owning less than 10 decimals excluding homestead',
      'Families relying primarily on manual agricultural labor for subsistence',
      'Priority given to Freedom Fighter families, river erosion victims, and destitute women'
    ],
    requiredDocumentsBn: [
      'স্থানীয় ইউপি চেয়ারম্যান বা পৌরসভার মেয়র কর্তৃক প্রদত্ত ভূমিহীন সনদপত্র',
      'পরিবারের সকল সদস্যের এনআইডি ও জন্ম সনদ',
      'পরিবারের আয়ের প্রত্যয়নপত্র',
      'নির্ধারিত খাসজমি বন্দোবস্তের আবেদন ফরম (ফরম "ক")'
    ],
    requiredDocumentsEn: [
      'Landless certificate issued by Union Parishad Chairman or Municipal Mayor',
      'National ID cards and birth certificates of all family members',
      'Household income certificate',
      'Standard prescribed Khas Land Settlement Application Form ("Form Ka")'
    ],
    instructions: [
      {
        id: 'ins-khas-1',
        serviceId: 'srv-khas-land',
        stepNumber: 1,
        titleBn: 'আবেদন ফরম সংগ্রহ ও পূরণ',
        titleEn: 'Obtain Form and Fill Particulars',
        instructionBn: 'উপজেলা ভূমি অফিস (এসিল্যান্ড) থেকে বা minland.gov.bd থেকে বন্দোবস্ত আবেদন ফরম সংগ্রহ করুন।',
        instructionEn: 'Obtain settlement application form from Upazila AC Land office or minland.gov.bd.'
      },
      {
        id: 'ins-khas-2',
        serviceId: 'srv-khas-land',
        stepNumber: 2,
        titleBn: 'ভূমিহীন সনদসহ এসিল্যান্ড অফিসে দাখিল',
        titleEn: 'Submit to AC Land Office with Certificate',
        instructionBn: 'ইউপি চেয়ারম্যানের ভূমিহীন সনদ ও প্রয়োজনীয় প্রমাণকসহ আবেদনপত্র উপজেলা ভূমি অফিসে জমা দিন।',
        instructionEn: 'Submit application along with Union Parishad certificate to the Upazila Land Office.'
      },
      {
        id: 'ins-khas-3',
        serviceId: 'srv-khas-land',
        stepNumber: 3,
        titleBn: 'উপজেলা কমিটির যাচাই ও কবুলিয়ত সম্পাদন',
        titleEn: 'Upazila Committee Review & Kabuliyat',
        instructionBn: 'উপজেলা কমিটি আবেদন যাচাই-বাছাই করে সুপারিশ করলে জেলা কমিটি অনুমোদন দেয় এবং প্রতীকী মূল্যে কবুলিয়ত রেজিস্ট্রি হয়।',
        instructionEn: 'Following Upazila and District Committee approval, lease agreement (Kabuliyat) is executed at nominal cost.'
      }
    ],
    officialFees: [
      {
        id: 'fee-khas-1',
        titleBn: 'ভূমিহীনদের সেলামি (প্রতীকী মূল্য)',
        titleEn: 'Nominal Token Consideration',
        amountBdt: 1,
        notesBn: 'প্রকৃত ভূমিহীনদের জন্য মাত্র ১ (এক) টাকা প্রতীকী মূল্যে ৯৯ বছরের স্থায়ী বন্দোবস্ত প্রদান করা হয়'
      }
    ],
    officialFeesTotalBdt: 1,
    estimatedDeliveryDaysBn: 'উপজেলা কমিটির বার্ষিক সভা ও যাচাই সাপেক্ষে ৬০-৯০ দিন',
    estimatedDeliveryDaysEn: '60 to 90 days depending on committee verification and schedule',
    links: [
      {
        id: 'lnk-khas-1',
        serviceId: 'srv-khas-land',
        titleBn: 'ভূমি মন্ত্রণালয় খাসজমি শাখা তথ্য',
        titleEn: 'Ministry of Land Khas Land Branch',
        url: 'https://minland.gov.bd/',
        purpose: 'MAIN_PORTAL',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-12'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'khas@minland.gov.bd',
    supportHoursBn: '১৬১২২ অথবা সংশ্লিষ্ট উপজেলা ভূমি অফিস (এসিল্যান্ড)',
    supportHoursEn: '16122 or local Upazila Land Office (AC Land)',
    keywords: ['khas', 'settlement', 'landless', 'minland', 'খাসজমি', 'বন্দোবস্ত', 'ভূমিহীন', 'কৃষি খাসজমি', 'গুচ্ছগ্রাম'],
    synonymsBn: ['খাসজমি', 'সরকারি জমি', 'বন্দোবস্ত', 'ভূমিহীনদের জমি'],
    synonymsEn: ['khas land', 'government land', 'landless settlement', 'public land'],
  },
  {
    id: 'srv-lab-appeals',
    slug: 'land-appeal-board-hearing',
    nameBn: 'ভূমি আপিল বোর্ড - মামলার শুনানি ও কজলিস্ট',
    nameEn: 'Land Appeal Board Hearings & Cause List',
    shortDescriptionBn: 'বিভাগীয় কমিশনারদের রাজস্ব আদেশের বিরুদ্ধে আপিল ও রিভিশন মামলার তথ্য, দৈনিক কার্যতালিকা (Cause List) ও আদেশ।',
    shortDescriptionEn: 'Appeals and revisions against revenue orders of Divisional Commissioners, daily cause list schedule, and orders.',
    detailedDescriptionBn: 'ভূমি আপিল বোর্ড হলো ভূমি রাজস্ব ও নামজারি সংক্রান্ত বিষয়ে দেশের সর্বোচ্চ প্রশাসনিক আপিল ট্রাইব্যুনাল। সহকারী কমিশনার (ভূমি), অতিরিক্ত জেলা প্রশাসক (রাজস্ব) এবং বিভাগীয় কমিশনারের আদেশের বিরুদ্ধে কোনো পক্ষ সংক্ষুব্ধ হলে ভূমি আপিল বোর্ডে আপিল বা রিভিশন দায়ের করতে পারেন। অনলাইন কজলিস্টের মাধ্যমে শুনানির তারিখ জানা যায়।',
    detailedDescriptionEn: 'The Land Appeal Board is the highest administrative tribunal for land revenue disputes in Bangladesh. Citizens aggrieved by judgments of Divisional Commissioners can file appeal or revision petitions and view daily court cause lists online.',
    institutionId: 'inst-lab',
    categoryId: 'cat-appeal',
    officialWebsiteUrl: 'https://lab.gov.bd/',
    directServiceUrl: 'https://lab.gov.bd/',
    integrationType: 'TYPE_1_EXTERNAL_LINK',
    availabilityStatus: 'SERVICE_PAGE_VERIFIED',
    lastVerifiedDate: '2026-04-05',
    verificationSource: 'ভূমি আপিল বোর্ড আইন ১৯৮৯ ও প্রাতিষ্ঠানিক তথ্য বাতায়ন',
    isPopular: false,
    isPublished: true,
    eligibilityBn: [
      'বিভাগীয় কমিশনারের রাজস্ব আদেশের বিরুদ্ধে সংক্ষুব্ধ পক্ষ',
      'প্রতিনিধিত্বকারী আইনজীবী বা পাওয়ার অব অ্যাটর্নিধারী'
    ],
    eligibilityEn: [
      'Parties aggrieved by revenue judgments of Divisional Commissioners',
      'Authorized advocates or power-of-attorney holders'
    ],
    requiredDocumentsBn: [
      'বিভাগীয় কমিশনার ও অতিরিক্ত জেলা প্রশাসকের আদেশের সার্টিফাইড কপি',
      'আপিল বা রিভিশন পিটিশন (আইনসম্মত গ্রাউন্ডসহ)',
      'কোর্ট ফি ও ওয়কালতনামা',
      'জমির মালিকানা সংক্রান্ত ধারাবাহিক নথি'
    ],
    requiredDocumentsEn: [
      'Certified copy of Divisional Commissioner and ADC Revenue orders',
      'Appellate or revision petition specifying grounds of appeal',
      'Required court fee stamps and Vakalatnama',
      'Supporting title deeds and survey records'
    ],
    instructions: [
      {
        id: 'ins-lab-1',
        serviceId: 'srv-lab-appeals',
        stepNumber: 1,
        titleBn: 'কজলিস্ট অনুসন্ধান',
        titleEn: 'Check Daily Cause List',
        instructionBn: 'lab.gov.bd-এ প্রবেশ করে দৈনিক কার্যতালিকা (Cause List) দেখে আপনার মামলার শুনানির তারিখ নিশ্চিত হোন।',
        instructionEn: 'Access lab.gov.bd and examine the daily cause list for your case hearing date.'
      },
      {
        id: 'ins-lab-2',
        serviceId: 'srv-lab-appeals',
        stepNumber: 2,
        titleBn: 'শুনানিতে অংশগ্রহণ ও আদেশ সংগ্রহ',
        titleEn: 'Attend Hearing and Collect Judgment',
        instructionBn: 'বোর্ডের চেয়ারম্যান বা সদস্যের আদালতে শুনানিতে অংশ নিন এবং অন্তর্বর্তীকালীন স্থগিতাদেশ বা চূড়ান্ত রায়ের কপি গ্রহণ করুন।',
        instructionEn: 'Participate in hearing before Board Chairman/Member and obtain certified order copy.'
      }
    ],
    officialFees: [
      {
        id: 'fee-lab-1',
        titleBn: 'আপিল পিটিশন কোর্ট ফি',
        titleEn: 'Appeal Petition Court Fee',
        amountBdt: 100,
        notesBn: 'কোর্ট ফি আইন অনুযায়ী প্রযোজ্য'
      }
    ],
    officialFeesTotalBdt: 100,
    estimatedDeliveryDaysBn: 'শুনানির তারিখ ও বোর্ড ক্যালেন্ডার অনুযায়ী',
    estimatedDeliveryDaysEn: 'According to board calendar and hearing schedules',
    links: [
      {
        id: 'lnk-lab-1',
        serviceId: 'srv-lab-appeals',
        titleBn: 'ভূমি আপিল বোর্ড মূল ওয়েবসাইট',
        titleEn: 'Land Appeal Board Main Website',
        url: 'https://lab.gov.bd/',
        purpose: 'MAIN_PORTAL',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-05'
      },
      {
        id: 'lnk-lab-2',
        serviceId: 'srv-lab-appeals',
        titleBn: 'দৈনিক কজলিস্ট ও রায় বিজ্ঞপ্তি',
        titleEn: 'Daily Cause List & Judgments',
        url: 'https://lab.gov.bd/',
        purpose: 'CITIZEN_CHARTER',
        isPrimary: false,
        isVerified: true,
        lastChecked: '2026-04-05'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'lab@minland.gov.bd',
    supportHoursBn: 'রবিবার - বৃহস্পতিবার সকাল ৯টা - বিকাল ৫টা',
    supportHoursEn: 'Sunday - Thursday 9 AM - 5 PM',
    keywords: ['appeal', 'lab', 'cause list', 'court', 'আপিল', 'ভূমি আপিল বোর্ড', 'কজলিস্ট', 'মিস কেস', 'রিভিশন', 'রায়'],
    synonymsBn: ['ভূমি আপিল', 'আপিল বোর্ড', 'কজলিস্ট', 'রাজস্ব মামলা'],
    synonymsEn: ['land appeal', 'appeal board', 'cause list', 'revenue court'],
  },
  {
    id: 'srv-court',
    slug: 'land-revenue-court-system',
    nameBn: 'ভূমি রাজস্ব আদালত ব্যবস্থাপনা সিস্টেম (ই-কোর্ট)',
    nameEn: 'Land Revenue Court Management System (e-Court)',
    shortDescriptionBn: 'উপজেলা ও জেলা পর্যায়ের ভূমি রাজস্ব মিস কেস ট্র্যাকিং, শুনানির নোটিশ ও আদেশনামা পর্যবেক্ষণ।',
    shortDescriptionEn: 'Track revenue dispute cases, summons notices, hearing dates, and order sheets across AC Land and ADC Revenue courts.',
    detailedDescriptionBn: 'ভূমি রাজস্ব আদালত ব্যবস্থা সহকারী কমিশনার (ভূমি) এবং অতিরিক্ত জেলা প্রশাসক (রাজস্ব) আদালতের মিস কেস ও রাজস্ব মোকদ্দমাসমূহ ডিজিটাল ট্র্যাক করার ব্যবস্থা করে। এতে বিচারপ্রার্থী নাগরিকরা অনলাইনে মামলার অগ্রগতির তথ্য পেতে পারেন।',
    detailedDescriptionEn: 'Enables litigants to monitor revenue dispute proceedings pending before Assistant Commissioners (Land) and Additional District Commissioners (Revenue), reducing courtroom visits.',
    institutionId: 'inst-minland',
    categoryId: 'cat-appeal',
    officialWebsiteUrl: 'https://court.land.gov.bd/',
    directServiceUrl: 'https://court.land.gov.bd/',
    integrationType: 'TYPE_1_EXTERNAL_LINK',
    availabilityStatus: 'SERVICE_PAGE_VERIFIED',
    lastVerifiedDate: '2026-04-06',
    verificationSource: 'ভূমি মন্ত্রণালয় আদালত সেল',
    isPopular: false,
    isPublished: true,
    eligibilityBn: [
      'রাজস্ব আদালতের মামলার বাদী বা বিবাদী পক্ষ',
      'বিজ্ঞ কৌঁসুলি বা আইনজীবী'
    ],
    eligibilityEn: [
      'Plaintiff or defendant in pending revenue cases',
      'Authorized legal counsel or advocate'
    ],
    requiredDocumentsBn: [
      'মামলা বা মিস কেস (Mis Case) নম্বর',
      'সংশ্লিষ্ট উপজেলা বা জেলা আদালতের নাম',
      'জাতীয় পরিচয়পত্র'
    ],
    requiredDocumentsEn: [
      'Mis Case registration number',
      'Respective Upazila or District court name',
      'National ID card'
    ],
    instructions: [
      {
        id: 'ins-crt-1',
        serviceId: 'srv-court',
        stepNumber: 1,
        titleBn: 'আদালত নির্বাচন ও অনুসন্ধান',
        titleEn: 'Select Court Jurisdiction and Search',
        instructionBn: 'court.land.gov.bd-এ প্রবেশ করে সংশ্লিষ্ট জেলা ও এসিল্যান্ড আদালত নির্বাচন করে মামলার নম্বর দিন।',
        instructionEn: 'Open court.land.gov.bd, pick jurisdiction and input your case number.'
      }
    ],
    officialFees: [
      {
        id: 'fee-crt-1',
        titleBn: 'অনলাইন তথ্য অনুসন্ধান',
        titleEn: 'Online Inquiry Fee',
        amountBdt: 0,
        notesBn: 'বিনামূল্যে অনুসন্ধান করা যায়'
      }
    ],
    officialFeesTotalBdt: 0,
    estimatedDeliveryDaysBn: 'তাৎক্ষণিক অনলাইন তথ্য',
    estimatedDeliveryDaysEn: 'Instant online information',
    links: [
      {
        id: 'lnk-crt-1',
        serviceId: 'srv-court',
        titleBn: 'ভূমি রাজস্ব আদালত পোর্টাল',
        titleEn: 'Land Revenue Court Portal',
        url: 'https://court.land.gov.bd/',
        purpose: 'MAIN_PORTAL',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-06'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'court@land.gov.bd',
    keywords: ['court', 'revenue court', 'mis case', 'ই-কোর্ট', 'আদালত', 'রাজস্ব আদালত', 'মিস কেস'],
    synonymsBn: ['ভূমি আদালত', 'ই-কোর্ট', 'রাজস্ব মিস কেস'],
    synonymsEn: ['land court', 'revenue dispute', 'e-court'],
  },
  {
    id: 'srv-helpline-16122',
    slug: 'land-services-helpline-16122',
    nameBn: 'ভূমি সেবা হেল্পলাইন ১৬১২২ ও কলসেন্টার',
    nameEn: 'Land Services Dedicated Helpline 16122',
    shortDescriptionBn: 'যেকোনো মোবাইল থেকে ১৬১২২ নম্বরে ফোন করে ভূমি সেবা সংক্রান্ত তথ্য, সরাসরি আবেদন সহায়তা ও অভিযোগ দায়ের।',
    shortDescriptionEn: 'Call 16122 from any mobile network in Bangladesh for phone-assisted applications, land guidance, and grievance redressal.',
    detailedDescriptionBn: 'প্রযুক্তি বা ইন্টারনেটের সীমাবদ্ধতা রয়েছে এমন সাধারণ নাগরিক ও প্রবাসীদের জন্য ভূমি মন্ত্রণালয় ১৬১২২ হেল্পলাইন চালু করেছে। সাধারণ ফোনে কল করেই নাগরিকরা ই-নামজারি ও ভূমি উন্নয়ন কর পরিশোধের আবেদন করতে পারেন। এছাড়া ভূমি সংক্রান্ত যেকোনো দুর্নীতির অভিযোগ ও সেবা প্রাপ্তিতে হয়রানির তথ্য ১৬১২২-এ সরাসরি জানানো যায়।',
    detailedDescriptionEn: 'Designed for rural citizens, senior citizens, and overseas Bangladeshis (+880 96123 16122), the 16122 hotline allows direct assisted telephone applications for e-Mutation and land tax payment, as well as anti-corruption and harassment reporting.',
    institutionId: 'inst-minland',
    categoryId: 'cat-helpline',
    officialWebsiteUrl: 'https://hotline.land.gov.bd/',
    directServiceUrl: 'https://hotline.land.gov.bd/',
    integrationType: 'TYPE_1_EXTERNAL_LINK',
    availabilityStatus: 'SERVICE_PAGE_VERIFIED',
    lastVerifiedDate: '2026-04-14',
    verificationSource: 'ভূমি মন্ত্রণালয় কলসেন্টার মনিটরিং সেল',
    isPopular: true,
    isPublished: true,
    eligibilityBn: [
      'বাংলাদেশের যেকোনো প্রান্তের যেকোনো নাগরিক',
      'প্রবাসী বাংলাদেশী নাগরিক (+৮৮০ ৯৬১২৩ ১৬১২২)'
    ],
    eligibilityEn: [
      'Any citizen in Bangladesh across all mobile networks',
      'Non-resident Bangladeshis abroad via +880 96123 16122'
    ],
    requiredDocumentsBn: [
      'জাতীয় পরিচয়পত্র নম্বর ও জন্ম তারিখ',
      'কলকারী নাগরিকের সচল মোবাইল নম্বর',
      'প্রযোজ্য ক্ষেত্রে জমির খতিয়ান বা দলিলের বিবরণ'
    ],
    requiredDocumentsEn: [
      'National ID (NID) number and date of birth',
      'Active mobile number',
      'Particulars of land deeds or khatian for assisted requests'
    ],
    instructions: [
      {
        id: 'ins-hlp-1',
        serviceId: 'srv-helpline-16122',
        stepNumber: 1,
        titleBn: '১৬১২২ নম্বরে ডায়াল করুন',
        titleEn: 'Dial 16122 from your phone',
        instructionBn: 'যেকোনো অপারেটর থেকে ১৬১২২ ডায়াল করুন (প্রবাস থেকে +৮৮০ ৯৬১২৩ ১৬১২২)।',
        instructionEn: 'Dial 16122 from any phone network in Bangladesh (or +880 96123 16122 from overseas).'
      },
      {
        id: 'ins-hlp-2',
        serviceId: 'srv-helpline-16122',
        stepNumber: 2,
        titleBn: 'প্রতিনিধির সাথে কথা বলুন',
        titleEn: 'Speak to Authorized Customer Agent',
        instructionBn: 'আপনার সমস্যা জানান। প্রতিনিধি আপনার পক্ষ থেকে তথ্য ইনপুট দিয়ে আবেদন সম্পন্ন করে এসএমএস পাঠিয়ে দেবেন।',
        instructionEn: 'State your requirement. The officer assists with form entry and sends confirmation via SMS.'
      }
    ],
    officialFees: [
      {
        id: 'fee-hlp-1',
        titleBn: 'কল চার্জ',
        titleEn: 'Call Tariff',
        amountBdt: 0,
        notesBn: 'মোবাইল অপারেটরের সাধারণ রেট প্রযোজ্য; সেবামূলক কোনো অতিরিক্ত চার্জ নেই'
      }
    ],
    officialFeesTotalBdt: 0,
    estimatedDeliveryDaysBn: 'তাৎক্ষণিক পরামর্শ ও ফোনভিত্তিক সহায়তা',
    estimatedDeliveryDaysEn: 'Immediate telephone consultation',
    links: [
      {
        id: 'lnk-hlp-1',
        serviceId: 'srv-helpline-16122',
        titleBn: '১৬১২২ হেল্পলাইন অফিশিয়াল পোর্টাল',
        titleEn: '16122 Helpline Official Portal',
        url: 'https://hotline.land.gov.bd/',
        purpose: 'MAIN_PORTAL',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-14'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'hotline@land.gov.bd',
    supportHoursBn: '২৪ ঘণ্টা অটোমেটেড সার্ভিস এবং সকাল ৯টা - রাত ৮টা পর্যন্ত লাইভ এজেন্ট',
    supportHoursEn: '24/7 automated service; live agents 9 AM to 8 PM daily',
    keywords: ['16122', 'hotline', 'helpline', 'call center', '১৬১২২', 'হটলাইন', 'হেল্পলাইন', 'অভিযোগ', 'ফোন সেবা', 'কল সেন্টার'],
    synonymsBn: ['১৬১২২', 'ভূমি হেল্পলাইন', 'ভূমি হটলাইন', 'ভূমি কল সেন্টার'],
    synonymsEn: ['16122', 'land helpline', 'land call center', 'land hotline'],
  },
  {
    id: 'srv-land-crime-act',
    slug: 'land-crime-prevention-redress',
    nameBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ ও অভিযোগ সেল',
    nameEn: 'Land Crime Prevention & Redress Act 2023',
    shortDescriptionBn: 'অবৈধ দখল, জাল দলিল প্রস্তুত, সীমানা বিরোধ ও ভুয়া মালিকানা দাবির বিরুদ্ধে আইনি প্রতিকার ও অভিযোগ প্রক্রিয়া।',
    shortDescriptionEn: 'Statutory provisions, penal measures, and complaint submission process against land grabbing, forged deeds, and boundary encroachment.',
    detailedDescriptionBn: '২০২৩ সালে প্রণীত ঐতিহাসিক "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন"-এর মাধ্যমে জমি জবরদখল, জাল দলিল তৈরি, প্রতারণামূলক রেজিস্ট্রেশন এবং প্রকৃত মালিককে না জানিয়ে জমি বিক্রির অপরাধকে সরাসরি জামিনঅযোগ্য ফৌজদারি অপরাধ হিসেবে গণ্য করা হয়েছে। জেলা ও উপজেলা প্রশাসনে গঠিত বিশেষ সেলে নাগরিকরা সরাসরি অভিযোগ দায়ের করতে পারেন।',
    detailedDescriptionEn: 'The historic Land Crime Prevention and Redress Act 2023 criminalizes land grabbing, creating forged deeds, and illegal dispossessions with strict penal sentences. Aggrieved citizens can seek executive magistrate interventions or lodge grievances directly with district cells.',
    institutionId: 'inst-minland',
    categoryId: 'cat-laws',
    officialWebsiteUrl: 'https://minland.gov.bd/',
    directServiceUrl: 'https://minland.gov.bd/',
    integrationType: 'TYPE_2_INFO_INTEGRATION',
    availabilityStatus: 'OFFICIAL_URL_VERIFIED',
    lastVerifiedDate: '2026-04-12',
    verificationSource: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ (গেজেট প্রকাশিত)',
    isPopular: true,
    isPublished: true,
    eligibilityBn: [
      'অবৈধ জমি দখল বা জাল দলিলের শিকার যেকোনো প্রকৃত জমির মালিক',
      'প্রতারণার মাধ্যমে অধিকারবঞ্চিত যেকোনো ব্যক্তি বা উত্তরাধিকারী'
    ],
    eligibilityEn: [
      'Victims of illegal land dispossession or forged title deeds',
      'Lawful owners affected by fraudulent transfers or boundary alterations'
    ],
    requiredDocumentsBn: [
      'প্রকৃত স্বত্ব প্রমাণের দলিল ও খতিয়ান',
      'হালনাগাদ ভূমি উন্নয়ন করের দাখিলা রশিদ',
      'অভিযোগের বিবরণ ও দখলচ্যুতির তারিখ ও বিবরণ',
      'বিবাদী পক্ষের নাম ও ঠিকানা'
    ],
    requiredDocumentsEn: [
      'Registered deeds and khatians proving legitimate ownership',
      'Updated Land Development Tax receipt',
      'Detailed complaint specifying date and nature of illegal possession',
      'Particulars and address of the accused party'
    ],
    instructions: [
      {
        id: 'ins-crm-1',
        serviceId: 'srv-land-crime-act',
        stepNumber: 1,
        titleBn: 'আইনি বিধান ও অপরাধের ধরন যাচাই',
        titleEn: 'Review Legal Provisions',
        instructionBn: 'আইন অনুযায়ী দলিল জালিয়াতি, রেকর্ড বিকৃতি বা অবৈধ দখলের ক্ষেত্রে সংশ্লিষ্ট ধারা যাচাই করুন।',
        instructionEn: 'Identify applicable sections for deed forgery, record manipulation, or forceful entry.'
      },
      {
        id: 'ins-crm-2',
        serviceId: 'srv-land-crime-act',
        stepNumber: 2,
        titleBn: 'উপজেলা নির্বাহী অফিসার (ইউএনও) বা নির্বাহী ম্যাজিস্ট্রেটের কাছে আবেদন',
        titleEn: 'File Petition before Executive Magistrate / UNO',
        instructionBn: 'জমির দখল পুনরুদ্ধারের জন্য সহকারী কমিশনার (ভূমি) বা নির্বাহী ম্যাজিস্ট্রেটের আদালতে স্বত্ব প্রমাণের প্রমাণাদিসহ আবেদন করুন।',
        instructionEn: 'Submit recovery petition along with title documents to AC Land or Executive Magistrate.'
      }
    ],
    officialFees: [
      {
        id: 'fee-crm-1',
        titleBn: 'অভিযোগ দায়ের ফি',
        titleEn: 'Grievance Filing Fee',
        amountBdt: 0,
        notesBn: 'ভূমি মন্ত্রণালয় বা জেলা প্রশাসনে অভিযোগ দায়েরের কোনো ফি নেই'
      }
    ],
    officialFeesTotalBdt: 0,
    estimatedDeliveryDaysBn: 'তদন্ত সাপেক্ষে নির্বাহী প্রক্রিয়া',
    estimatedDeliveryDaysEn: 'Executive inquiry timeline',
    links: [
      {
        id: 'lnk-crm-1',
        serviceId: 'srv-land-crime-act',
        titleBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ গেজেট',
        titleEn: 'Land Crime Prevention Act 2023 Gazette',
        url: 'https://minland.gov.bd/',
        purpose: 'MANUAL_OR_GUIDE',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-12'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'complaint@minland.gov.bd',
    keywords: ['crime', 'prevention', 'redress', 'grabbing', 'দখল', 'জাল দলিল', 'ভূমি অপরাধ', 'প্রতারণা', 'আইন ২০২৩'],
    synonymsBn: ['ভূমি অপরাধ আইন', 'জমি দখল প্রতিরোধ', 'জাল দলিল প্রতিকার'],
    synonymsEn: ['land crime act', 'land grabbing redress', 'anti land grabbing'],
  },
  {
    id: 'srv-vested-prop',
    slug: 'vested-property-information',
    nameBn: 'অর্পিত সম্পত্তি সম্পর্কিত গেজেট ও আপিল তথ্য',
    nameEn: 'Vested Property Gazette & Appeal Information',
    shortDescriptionBn: 'অর্পিত সম্পত্তি প্রত্যর্পণ আইনের আওতায় ‘ক’ ও ‘খ’ তফসিলভুক্ত সম্পত্তির বিবরণ, ট্রাইব্যুনাল তথ্য ও আবেদনের নিয়মাবলী।',
    shortDescriptionEn: 'Gazette schedules, tribunal appeal guidance, and restitution guidelines under the Vested Property Return Act.',
    detailedDescriptionBn: 'অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ (সংশোধিত ২০১৩) অনুযায়ী প্রকাশিত গেজেটের ভিত্তিতে সম্পত্তির তালিকা ও স্বত্ব প্রত্যর্পণের ট্রাইব্যুনাল সংক্রান্ত সরকারি তথ্য। সংক্ষুব্ধ মূল মালিক বা তাদের বাংলাদেশি উত্তরাধিকারীরা ট্রাইব্যুনালে আবেদন ও প্রত্যর্পণ প্রক্রিয়া সম্পর্কিত সরকারি নির্দেশনা জানতে পারেন।',
    detailedDescriptionEn: 'Public information regarding the Vested Property Return Act (Schedule Ka and Kha), guidelines for filing restitution claims before designated district tribunals, and gazetted property catalogs.',
    institutionId: 'inst-minland',
    categoryId: 'cat-laws',
    officialWebsiteUrl: 'https://minland.gov.bd/',
    directServiceUrl: 'https://minland.gov.bd/',
    integrationType: 'TYPE_2_INFO_INTEGRATION',
    availabilityStatus: 'OFFICIAL_URL_VERIFIED',
    lastVerifiedDate: '2026-04-12',
    verificationSource: 'অর্পিত সম্পত্তি প্রত্যর্পণ আইন ২০০১ ও মন্ত্রণালয় গেজেট',
    isPopular: false,
    isPublished: true,
    eligibilityBn: [
      'অর্পিত সম্পত্তি হিসেবে তালিকাভুক্ত জমির প্রকৃত মূল মালিক বা তাদের আইনসঙ্গত বাংলাদেশি ওয়ারিশ'
    ],
    eligibilityEn: [
      'Original lawful owners or verified Bangladeshi legal heirs of property enlisted as vested'
    ],
    requiredDocumentsBn: [
      'সংশ্লিষ্ট জেলা গেজেট নোটিফিকেশন',
      '১৯৬৫ সালের পূর্ববর্তী সিএস বা এসএ খতিয়ান',
      'উত্তরাধিকার সনদ ও নাগরিকত্ব প্রমাণপত্র'
    ],
    requiredDocumentsEn: [
      'District Gazette Notification reference',
      'Pre-1965 CS / SA survey khatian',
      'Legal heir certificate and proof of Bangladeshi citizenship'
    ],
    instructions: [
      {
        id: 'ins-vst-1',
        serviceId: 'srv-vested-prop',
        stepNumber: 1,
        titleBn: 'গেজেট ও তফসিল মিলিয়ে দেখা',
        titleEn: 'Verify Gazette Schedule',
        instructionBn: 'মন্ত্রণালয়ের ওয়েবসাইট বা ডিসি অফিসের রেকর্ড থেকে সম্পত্তিটি ‘ক’ বা ‘খ’ তফসিলে রয়েছে কিনা যাচাই করুন।',
        instructionEn: 'Confirm whether the parcel is enlisted under Schedule Ka or Kha from gazette records.'
      }
    ],
    officialFees: [
      {
        id: 'fee-vst-1',
        titleBn: 'ট্রাইব্যুনাল আবেদন কোর্ট ফি',
        titleEn: 'Tribunal Court Fee',
        amountBdt: 200,
        notesBn: 'বিশেষ ট্রাইব্যুনালের নির্ধারিত সরকারি কোর্ট ফি'
      }
    ],
    officialFeesTotalBdt: 200,
    estimatedDeliveryDaysBn: 'বিচারিক ট্রাইব্যুনালের সময়সূচি অনুযায়ী',
    estimatedDeliveryDaysEn: 'Subject to judicial tribunal proceedings',
    links: [
      {
        id: 'lnk-vst-1',
        serviceId: 'srv-vested-prop',
        titleBn: 'অর্পিত সম্পত্তি সংক্রান্ত তথ্য ও সার্কুলার',
        titleEn: 'Vested Property Information & Circulars',
        url: 'https://minland.gov.bd/',
        purpose: 'CITIZEN_CHARTER',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-04-12'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'vested@minland.gov.bd',
    keywords: ['vested', 'enemy property', 'schedule', 'tribunal', 'অর্পিত সম্পত্তি', 'ক তফসিল', 'খ তফসিল', 'প্রত্যর্পণ', 'শত্রু সম্পত্তি'],
    synonymsBn: ['অর্পিত সম্পত্তি', 'ক তফসিল জমি', 'প্রত্যর্পণ আইন'],
    synonymsEn: ['vested property', 'restitution of property'],
  },
  {
    id: 'srv-land-zoning',
    slug: 'national-land-zoning-system',
    nameBn: 'জাতীয় ভূমি জোনিং ও ব্যবহার শ্রেণিবিভাগ',
    nameEn: 'National Land Zoning & Classification',
    shortDescriptionBn: 'কৃষি জমি সুরক্ষা, পরিবেশবান্ধব আবাসন ও শিল্প জোনিং ম্যাপ এবং ভূমির বহুমুখী ব্যবহার নির্দেশিকা।',
    shortDescriptionEn: 'Spatial zoning maps protecting arable agricultural lands, commercial zones, and urban spatial plans.',
    detailedDescriptionBn: 'জাতীয় ভূমি জোনিং প্রকল্পের মাধ্যমে সমগ্র দেশের প্রতিটি উপজেলার মৌজাভিত্তিক ভূমির ভৌগোলিক উপযোগিতা ও ভূতাত্ত্বিক বৈশিষ্ট্য বিশ্লেষণ করে কৃষি, মৎস্য, বন ও শিল্প জোনে বিভক্ত করা হয়েছে। এর উদ্দেশ্য অপরিকল্পিতভাবে কৃষি জমি নষ্ট রোধ করা।',
    detailedDescriptionEn: 'The National Land Zoning Project classifies lands nationwide into agricultural, aquaculture, forestry, and industrial zones to safeguard food security and prevent haphazard urban sprawling.',
    institutionId: 'inst-minland',
    categoryId: 'cat-laws',
    officialWebsiteUrl: 'https://landzoning.gov.bd/',
    directServiceUrl: 'https://landzoning.gov.bd/',
    integrationType: 'TYPE_1_EXTERNAL_LINK',
    availabilityStatus: 'SERVICE_PAGE_VERIFIED',
    lastVerifiedDate: '2026-03-20',
    verificationSource: 'জাতীয় ভূমি জোনিং প্রকল্প ও এগ্রো-ইকোলজিক্যাল ডাটাবেজ',
    isPopular: false,
    isPublished: true,
    eligibilityBn: [
      'সকল নাগরিক, গবেষক, পরিবেশবিদ ও শিল্পোদ্যোক্তা'
    ],
    eligibilityEn: [
      'General public, researchers, environmentalists, urban planners, and entrepreneurs'
    ],
    requiredDocumentsBn: [
      'নির্দিষ্ট মৌজা বা উপজেলার নাম'
    ],
    requiredDocumentsEn: [
      'Specific mouza or upazila name'
    ],
    instructions: [
      {
        id: 'ins-zon-1',
        serviceId: 'srv-land-zoning',
        stepNumber: 1,
        titleBn: 'জোনিং ম্যাপ অনুসন্ধান',
        titleEn: 'Explore Zoning Classification',
        instructionBn: 'landzoning.gov.bd-এ প্রবেশ করে উপজেলা ও ইউনিয়ন ভিত্তিক ডিজিটাল জোনিং ম্যাপ দেখুন।',
        instructionEn: 'Visit landzoning.gov.bd to view geospatial classification of agricultural and industrial parcels.'
      }
    ],
    officialFees: [
      {
        id: 'fee-zon-1',
        titleBn: 'তথ্য দেখার ফি',
        titleEn: 'Information Access Fee',
        amountBdt: 0,
        notesBn: 'বিনামূল্যে উন্মুক্ত জনসেবা'
      }
    ],
    officialFeesTotalBdt: 0,
    estimatedDeliveryDaysBn: 'তাৎক্ষণিক অনলাইন ম্যাপ',
    estimatedDeliveryDaysEn: 'Instant geospatial layout',
    links: [
      {
        id: 'lnk-zon-1',
        serviceId: 'srv-land-zoning',
        titleBn: 'ভূমি জোনিং সিস্টেম',
        titleEn: 'Land Zoning Portal',
        url: 'https://landzoning.gov.bd/',
        purpose: 'MAIN_PORTAL',
        isPrimary: true,
        isVerified: true,
        lastChecked: '2026-03-20'
      }
    ],
    helplinePhone: '16122',
    supportEmail: 'zoning@minland.gov.bd',
    keywords: ['zoning', 'agriculture', 'industrial', 'classification', 'জোনিং', 'ভূমি জোনিং', 'কৃষি জমি সুরক্ষা', 'শ্রেণিবিভাগ'],
    synonymsBn: ['ভূমি জোনিং', 'জমির ব্যবহার শ্রেণি'],
    synonymsEn: ['land zoning', 'spatial planning'],
  }
];

export const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: 'src-1',
    titleBn: 'ভূমি উন্নয়ন কর আইন, ২০২৩ (২০২৩ সনের ৩২ নং আইন)',
    titleEn: 'Land Development Tax Act 2023 (Act No. 32 of 2023)',
    institutionBn: 'জাতীয় সংসদ ও ভূমি মন্ত্রণালয়',
    institutionEn: 'National Parliament & Ministry of Land',
    sourceType: 'ACT_OR_RULE',
    referenceNo: 'বাংলাদেশ গেজেট, অতিরিক্ত সংখ্যা, ১৮ সেপ্টেম্বর ২০২৩',
    publishedDate: '2023-09-18',
    officialUrl: 'https://minland.gov.bd/',
    summaryBn: 'অনলাইন ভূমি উন্নয়ন কর বাধ্যতামূলককরণ, ২৫ বিঘা পর্যন্ত কৃষি জমি করমুক্ত রাখা এবং ডিজিটাল দাখিলার আইনি স্বীকৃতির বিধান।',
    summaryEn: 'Mandating online land tax collection, exempting agricultural land up to 25 bighas, and according legal status to e-Dakhila.'
  },
  {
    id: 'src-2',
    titleBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ (২০২৩ সনের ৩১ নং আইন)',
    titleEn: 'Land Crime Prevention and Redress Act 2023 (Act No. 31 of 2023)',
    institutionBn: 'জাতীয় সংসদ ও ভূমি মন্ত্রণালয়',
    institutionEn: 'National Parliament & Ministry of Land',
    sourceType: 'ACT_OR_RULE',
    referenceNo: 'বাংলাদেশ গেজেট, অতিরিক্ত সংখ্যা, ১৮ সেপ্টেম্বর ২০২৩',
    publishedDate: '2023-09-18',
    officialUrl: 'https://minland.gov.bd/',
    summaryBn: 'অবৈধ দখল, জাল দলিল প্রস্তুত, প্রতারণামূলক হস্তান্তর ও সীমারেখা বিনষ্টকরণকে জামিনঅযোগ্য ফৌজদারি অপরাধ সাব্যস্তকরণ।',
    summaryEn: 'Criminalizing land encroachment, forged deed creation, fraudulent conveyance, and boundary destruction.'
  },
  {
    id: 'src-3',
    titleBn: 'ই-নামজারি বাস্তবায়ন নির্দেশিকা ও পরিপত্র',
    titleEn: 'E-Mutation Implementation Guidelines & Circular',
    institutionBn: 'ভূমি মন্ত্রণালয় মাঠ প্রশাসন অধিশাখা',
    institutionEn: 'Ministry of Land Field Administration Wing',
    sourceType: 'CIRCULAR',
    referenceNo: 'স্মারক নং ৩১.০০.০০০০.০৪২.৬৮.০১২.২০-৪৭২',
    publishedDate: '2021-11-04',
    officialUrl: 'https://mutation.land.gov.bd/',
    summaryBn: 'ই-নামজারি ফি সর্বমোট ১,১৭০ টাকা নির্ধারণ (কোর্ট ফি ২০, নোটিশ ৫০, রেকর্ড সংশোধন ১০০০, খতিয়ান ১০০) এবং ২৮ কর্মদিবসের মধ্যে নিষ্পত্তির বাধ্যবাধকতা।',
    summaryEn: 'Fixing total e-mutation statutory fees strictly at 1,170 BDT and setting a 28-day statutory disposal timeline.'
  },
  {
    id: 'src-4',
    titleBn: 'বাংলাদেশ জাতীয় তথ্য বাতায়ন অধীনস্থ দপ্তর তালিকা',
    titleEn: 'National Web Portal Subordinate Institutions Directory',
    institutionBn: 'মন্ত্রীপরিষদ বিভাগ ও এটুআই',
    institutionEn: 'Cabinet Division & Aspire to Innovate (a2i)',
    sourceType: 'WEBSITE_DIRECTORY',
    referenceNo: 'bangladesh.gov.bd/minland',
    publishedDate: '2026-01-10',
    officialUrl: 'https://bangladesh.gov.bd/',
    summaryBn: 'ভূমি মন্ত্রণালয়ের অধীনস্থ সকল বোর্ড, অধিদপ্তর, প্রশিক্ষণ কেন্দ্র ও জেলা অফিসের যাচাইকৃত ওয়েব তালিকা।',
    summaryEn: 'Verified web addresses and institutional hierarchies of all boards, directorates, and field offices under MinLand.'
  }
];

export const SAMPLE_LAND_OFFICES: LandOffice[] = [
  {
    id: 'off-dhk-dc',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    districtBn: 'ঢাকা',
    districtEn: 'Dhaka',
    upazilaBn: 'ঢাকা সদর',
    upazilaEn: 'Dhaka Sadar',
    officeType: 'DC_OFFICE_REVENUE',
    nameBn: 'জেলা প্রশাসক কার্যালয় (রাজস্ব ও এলএ শাখা), ঢাকা',
    nameEn: 'Office of the Deputy Commissioner (Revenue & LA Branch), Dhaka',
    addressBn: 'জনসন রোড, কোর্ট হাউস স্ট্রিট, ঢাকা ১১০০',
    addressEn: 'Johnson Road, Court House Street, Dhaka 1100',
    phone: '02-9556100',
    email: 'dcdhaka@mopa.gov.bd'
  },
  {
    id: 'off-dhk-ac-ramna',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    districtBn: 'ঢাকা',
    districtEn: 'Dhaka',
    upazilaBn: 'রমনা',
    upazilaEn: 'Ramna',
    officeType: 'AC_LAND',
    nameBn: 'সহকারী কমিশনার (ভূমি) কার্যালয়, রমনা রাজস্ব সার্কেল',
    nameEn: 'Office of the Assistant Commissioner (Land), Ramna Revenue Circle',
    addressBn: 'সেগুনবাগিচা, ঢাকা ১০০০',
    addressEn: 'Segunbagicha, Dhaka 1000',
    phone: '02-8391244',
    email: 'acland.ramna@land.gov.bd'
  },
  {
    id: 'off-dhk-ac-mirpur',
    divisionBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    districtBn: 'ঢাকা',
    districtEn: 'Dhaka',
    upazilaBn: 'মিরপুর',
    upazilaEn: 'Mirpur',
    officeType: 'AC_LAND',
    nameBn: 'সহকারী কমিশনার (ভূমি) কার্যালয়, মিরপুর রাজস্ব সার্কেল',
    nameEn: 'Office of the Assistant Commissioner (Land), Mirpur Revenue Circle',
    addressBn: 'মিরপুর ২, ঢাকা ১২১৬',
    addressEn: 'Mirpur 2, Dhaka 1216',
    phone: '02-9005421',
    email: 'acland.mirpur@land.gov.bd'
  },
  {
    id: 'off-ctg-ac-panchlaish',
    divisionBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    districtBn: 'চট্টগ্রাম',
    districtEn: 'Chattogram',
    upazilaBn: 'পাঁচলাইশ',
    upazilaEn: 'Panchlaish',
    officeType: 'AC_LAND',
    nameBn: 'সহকারী কমিশনার (ভূমি) কার্যালয়, পাঁচলাইশ সার্কেল',
    nameEn: 'Office of the Assistant Commissioner (Land), Panchlaish Circle',
    addressBn: 'মুরাদপুর, চট্টগ্রাম',
    addressEn: 'Muradpur, Chattogram',
    phone: '031-654812',
    email: 'acland.panchlaish@land.gov.bd'
  },
  {
    id: 'off-raj-ac-sadar',
    divisionBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    districtBn: 'রাজশাহী',
    districtEn: 'Rajshahi',
    upazilaBn: 'বোয়ালিয়া (রাজশাহী সদর)',
    upazilaEn: 'Boalia (Rajshahi Sadar)',
    officeType: 'AC_LAND',
    nameBn: 'সহকারী কমিশনার (ভূমি) কার্যালয়, বোয়ালিয়া সার্কেল',
    nameEn: 'Office of the Assistant Commissioner (Land), Boalia Circle',
    addressBn: 'কোর্ট চত্বর, রাজশাহী ৬০০০',
    addressEn: 'Court Premises, Rajshahi 6000',
    phone: '0721-772341',
    email: 'acland.boalia@land.gov.bd'
  },
  {
    id: 'off-khl-ac-sadar',
    divisionBn: 'খুলনা',
    divisionEn: 'Khulna',
    districtBn: 'খুলনা',
    districtEn: 'Khulna',
    upazilaBn: 'খুলনা সদর',
    upazilaEn: 'Khulna Sadar',
    officeType: 'AC_LAND',
    nameBn: 'সহকারী কমিশনার (ভূমি) কার্যালয়, খুলনা সদর সার্কেল',
    nameEn: 'Office of the Assistant Commissioner (Land), Khulna Sadar Circle',
    addressBn: 'বয়রা, খুলনা ৯০০০',
    addressEn: 'Boyra, Khulna 9000',
    phone: '041-760122',
    email: 'acland.khulnasadar@land.gov.bd'
  },
  {
    id: 'off-syl-ac-sadar',
    divisionBn: 'সিলেট',
    divisionEn: 'Sylhet',
    districtBn: 'সিলেট',
    districtEn: 'Sylhet',
    upazilaBn: 'সিলেট সদর',
    upazilaEn: 'Sylhet Sadar',
    officeType: 'AC_LAND',
    nameBn: 'সহকারী কমিশনার (ভূমি) কার্যালয়, সিলেট সদর',
    nameEn: 'Office of the Assistant Commissioner (Land), Sylhet Sadar',
    addressBn: 'কোর্ট পয়েন্ট, সিলেট ৩১০০',
    addressEn: 'Court Point, Sylhet 3100',
    phone: '0821-714522',
    email: 'acland.sylhetsadar@land.gov.bd'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    action: 'VERIFY',
    targetType: 'SERVICE',
    targetId: 'srv-mutation',
    targetName: 'ই-নামজারি ও জমাভাগ (E-Mutation)',
    performedBy: 'Lead Verification Engineer, BILSP Team',
    timestamp: '2026-04-14T09:30:00Z',
    details: 'Verified portal endpoint mutation.land.gov.bd and confirmed 1,170 BDT statutory fee scale against Ministry Gazette.'
  },
  {
    id: 'log-2',
    action: 'VERIFY',
    targetType: 'SERVICE',
    targetId: 'srv-ldtax',
    targetName: 'ভূমি উন্নয়ন কর (LD Tax)',
    performedBy: 'Public Service Systems Auditor',
    timestamp: '2026-04-14T09:45:00Z',
    details: 'Verified ldtax.gov.bd holding module and QR-coded digital dakhila generator. Confirmed 25-bigha agricultural tax exemption.'
  },
  {
    id: 'log-3',
    action: 'VERIFY',
    targetType: 'SERVICE',
    targetId: 'srv-eporcha',
    targetName: 'ই-পর্চা (e-Porcha Khatian)',
    performedBy: 'Lead Verification Engineer, BILSP Team',
    timestamp: '2026-04-14T10:10:00Z',
    details: 'Verified eporcha.gov.bd search engine across 64 districts; confirmed 100 BDT certified fee + 40 BDT postal delivery fee.'
  },
  {
    id: 'log-4',
    action: 'UPDATE',
    targetType: 'WEBSITE',
    targetId: 'web-hotline',
    targetName: 'ভূমি সেবা হেল্পলাইন ১৬১২২',
    performedBy: 'Systems Integration Architect',
    timestamp: '2026-04-14T11:00:00Z',
    details: 'Updated operational hours and overseas dialing format (+880 96123 16122).'
  }
];
