/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Pre-Seeded Admin & Citizen Accounts & Administrative Demo Records
 */

import {
  AdminUser,
  CitizenUser,
  MutationApplication,
  LandTaxRecord,
  CadastralSheetRecord,
  DeedRecord
} from '../types/authAndGeo';

// Pre-seeded Authorized Government Administrative Personnel
export const SEEDED_ADMIN_USERS: AdminUser[] = [
  {
    id: 'adm-minland-01',
    employeeId: 'MINLAND-REC-101',
    name: 'Mustafa Kamal',
    nameBn: 'মোঃ মোস্তফা কামাল',
    email: 'mustafa.kamal@minland.gov.bd',
    designationBn: 'সহকারী কমিশনার (ভূমি) ও রাজস্ব অডিটর',
    designationEn: 'Assistant Commissioner (Land) & Revenue Auditor',
    authorityBn: 'ভূমি মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    authorityEn: "Ministry of Land, Government of the People's Republic of Bangladesh",
    authorityCode: 'MINLAND',
    category: 'CATEGORY_1_RECORDS_TAX',
    role: 'ADMIN_CATEGORY_1',
    permissions: [
      'manage_records',
      'manage_mutation',
      'manage_tax',
      'audit_read',
      'khatian_approval',
      'acland_hearing_notice'
    ],
    twoFactorEnabled: true,
    lastLogin: '2026-04-14 09:15 AM'
  },
  {
    id: 'adm-dlrs-02',
    employeeId: 'DLRS-SRV-204',
    name: 'Dr. Saidur Rahman',
    nameBn: 'ড. সাইদুর রহমান',
    email: 'saidur.rahman@dlrs.gov.bd',
    designationBn: 'সহকারী সেটেলমেন্ট অফিসার ও জিআইএস প্রধান',
    designationEn: 'Assistant Settlement Officer & GIS Lead',
    authorityBn: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর (ডিএলআরএস)',
    authorityEn: 'Directorate of Land Records and Surveys (DLRS)',
    authorityCode: 'DLRS',
    category: 'CATEGORY_2_SURVEY_MAPPING',
    role: 'ADMIN_CATEGORY_2',
    permissions: [
      'manage_survey',
      'manage_cadastral_maps',
      'cs_sa_rs_layers',
      'validate_geometries',
      'digitization_audit',
      'mouza_sheet_publish'
    ],
    twoFactorEnabled: true,
    lastLogin: '2026-04-14 10:20 AM'
  },
  {
    id: 'adm-dolr-03',
    employeeId: 'DOLR-REG-305',
    name: 'Tahmina Chowdhury',
    nameBn: 'তাহমিনা চৌধুরী',
    email: 'tahmina.chowdhury@dolr.gov.bd',
    designationBn: 'সাব-রেজিস্ট্রার ও প্রধান রেকর্ড সংরক্ষক',
    designationEn: 'Sub-Registrar & Head of Deed Custody',
    authorityBn: 'নিবন্ধন অধিদপ্তর, আইন ও বিচার বিভাগ',
    authorityEn: 'Department of Registration, Ministry of Law',
    authorityCode: 'DOLR',
    category: 'CATEGORY_3_DEED_REGISTRATION',
    role: 'ADMIN_CATEGORY_3',
    permissions: [
      'manage_deeds',
      'sub_registry_records',
      'verify_deed_links',
      'stamp_revenue_audit',
      'confidentiality_oversight'
    ],
    twoFactorEnabled: false,
    lastLogin: '2026-04-14 08:45 AM'
  }
];

// Pre-seeded Citizen Users
export const SEEDED_CITIZEN_USERS: CitizenUser[] = [
  {
    id: 'ctz-01',
    name: 'Kazi Ariful Islam',
    nameBn: 'কাজী আরিফুল ইসলাম',
    mobile: '01711002233',
    mobileVerified: true,
    email: 'ariful.islam@example.com',
    emailVerified: true,
    nid: '1985269251000012',
    nidStatus: 'VERIFIED',
    accountStatus: 'ACTIVE',
    createdAt: '2026-01-15',
    role: 'CITIZEN',
    savedParcels: ['pcl-ramna-101', 'pcl-ramna-104']
  },
  {
    id: 'ctz-02',
    name: 'Nasrin Sultana',
    nameBn: 'নাসরীন সুলতানা',
    mobile: '01819988776',
    mobileVerified: true,
    email: 'nasrin.sultana@example.com',
    emailVerified: false,
    nid: '1992269251000088',
    nidStatus: 'PENDING_VERIFICATION',
    accountStatus: 'PENDING_VERIFICATION',
    createdAt: '2026-04-10',
    role: 'CITIZEN',
    savedParcels: ['pcl-mirpur-201']
  }
];

// Category 1: Mutation Applications Demo Data (Ministry of Land)
export const DEMO_MUTATION_APPLICATIONS: MutationApplication[] = [
  {
    id: 'mut-app-901',
    caseNo: 'MUT-DHK-RAM-2026-0481',
    applicantNameBn: 'কাজী আরিফুল ইসলাম',
    applicantNameEn: 'Kazi Ariful Islam',
    applicantMobile: '01711002233',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    upazilaId: 'upz-ramna',
    mouzaNameBn: 'সেগুনবাগিচা',
    khatianNo: '৩১৮',
    dagNo: '১২০৪',
    areaDecimals: 8.5,
    applicationDate: '2026-04-02',
    status: 'HEARING_SCHEDULED',
    hearingDate: '2026-04-20',
    statutoryFeePaidBdt: 70
  },
  {
    id: 'mut-app-902',
    caseNo: 'MUT-DHK-MIR-2026-1120',
    applicantNameBn: 'রোকেয়া খাতুন',
    applicantNameEn: 'Rokeya Khatun',
    applicantMobile: '01912334455',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    upazilaId: 'upz-mirpur',
    mouzaNameBn: 'পাইকপাড়া',
    khatianNo: '৭৮৯',
    dagNo: '৩৪০২',
    areaDecimals: 6.0,
    applicationDate: '2026-03-25',
    status: 'DCR_ISSUED',
    statutoryFeePaidBdt: 1170
  },
  {
    id: 'mut-app-903',
    caseNo: 'MUT-CTG-PAN-2026-0219',
    applicantNameBn: 'ফারহানা আখতার',
    applicantNameEn: 'Farhana Akhter',
    applicantMobile: '01815667788',
    divisionId: 'div-chattogram',
    districtId: 'dist-chattogram',
    upazilaId: 'upz-panchlaish',
    mouzaNameBn: 'মুরাদপুর',
    khatianNo: '৪১২',
    dagNo: '৭৮১',
    areaDecimals: 10.4,
    applicationDate: '2026-04-08',
    status: 'PENDING_INSPECTION',
    statutoryFeePaidBdt: 70
  },
  {
    id: 'mut-app-904',
    caseNo: 'MUT-DHK-SAV-2026-3104',
    applicantNameBn: 'মোঃ এনামুল হক',
    applicantNameEn: 'Md. Enamul Haque',
    applicantMobile: '01611223344',
    divisionId: 'div-dhaka',
    districtId: 'dist-dhaka',
    upazilaId: 'upz-savar',
    mouzaNameBn: 'হেমায়েতপুর',
    khatianNo: '৫৬২',
    dagNo: '৯১০',
    areaDecimals: 18.0,
    applicationDate: '2026-03-10',
    status: 'APPROVED',
    statutoryFeePaidBdt: 1170
  }
];

// Category 1: Land Development Tax Holdings (Ministry of Land / LRB)
export const DEMO_TAX_RECORDS: LandTaxRecord[] = [
  {
    id: 'tax-rec-101',
    holdingNo: 'HLD-RAM-58-1204',
    ownerNameBn: 'আবুল কালাম আজাদ',
    ownerNameEn: 'Abul Kalam Azad',
    nidLastDigits: '4812',
    upazilaId: 'upz-ramna',
    mouzaNameBn: 'সেগুনবাগিচা',
    landAreaDecimals: 8.5,
    annualTaxBdt: 1250,
    arrearsBdt: 0,
    currentDuesBdt: 1250,
    lastPaymentDate: '2025-05-18',
    paymentStatus: 'DUE'
  },
  {
    id: 'tax-rec-102',
    holdingNo: 'HLD-MIR-72-3402',
    ownerNameBn: 'নাসরীন জাহান',
    ownerNameEn: 'Nasreen Jahan',
    nidLastDigits: '9012',
    upazilaId: 'upz-mirpur',
    mouzaNameBn: 'পাইকপাড়া',
    landAreaDecimals: 6.0,
    annualTaxBdt: 950,
    arrearsBdt: 0,
    currentDuesBdt: 0,
    lastPaymentDate: '2026-02-12',
    paymentStatus: 'PAID'
  },
  {
    id: 'tax-rec-103',
    holdingNo: 'HLD-RAM-58-1206',
    ownerNameBn: 'তানভীর আহমেদ',
    ownerNameEn: 'Tanvir Ahmed',
    nidLastDigits: '7741',
    upazilaId: 'upz-ramna',
    mouzaNameBn: 'সেগুনবাগিচা',
    landAreaDecimals: 5.75,
    annualTaxBdt: 860,
    arrearsBdt: 1720,
    currentDuesBdt: 2580,
    paymentStatus: 'DUE'
  },
  {
    id: 'tax-rec-104',
    holdingNo: 'HLD-SAV-12-8801',
    ownerNameBn: 'মোঃ রফিকুল ইসলাম (কৃষক)',
    ownerNameEn: 'Md. Rafiqul Islam',
    nidLastDigits: '3310',
    upazilaId: 'upz-savar',
    mouzaNameBn: 'বলিয়ারপুর',
    landAreaDecimals: 120.0, // < 25 bighas agri
    annualTaxBdt: 0,
    arrearsBdt: 0,
    currentDuesBdt: 0,
    paymentStatus: 'EXEMPTED' // 25-bigha exemption under Act 2023
  }
];

// Category 2: Cadastral Survey Sheets (DLRS)
export const DEMO_CADASTRAL_SHEETS: CadastralSheetRecord[] = [
  {
    id: 'sheet-dlrs-01',
    sheetNo: 'সিট নং-০১',
    mouzaNameBn: 'সেগুনবাগিচা',
    mouzaNameEn: 'Segunbagicha',
    jlNo: '৫৮',
    upazilaId: 'upz-ramna',
    surveyType: 'RS',
    surveyYear: '1988',
    scale: '১৬ ইঞ্চি = ১ মাইল (1:3960)',
    digitizedDate: '2025-08-14',
    qualityScorePercent: 98.4,
    topologicalIntegrity: 'PASS',
    geoReferenced: true,
    parcelsCount: 340
  },
  {
    id: 'sheet-dlrs-02',
    sheetNo: 'সিট নং-০২',
    mouzaNameBn: 'কাকরাইল',
    mouzaNameEn: 'Kakrail',
    jlNo: '৫৯',
    upazilaId: 'upz-ramna',
    surveyType: 'RS',
    surveyYear: '1989',
    scale: '১৬ ইঞ্চি = ১ মাইল',
    digitizedDate: '2025-09-02',
    qualityScorePercent: 95.8,
    topologicalIntegrity: 'PASS',
    geoReferenced: true,
    parcelsCount: 285
  },
  {
    id: 'sheet-dlrs-03',
    sheetNo: 'সিট নং-০১ (ঐতিহাসিক সিএস)',
    mouzaNameBn: 'সেগুনবাগিচা (CS রেকর্ড)',
    mouzaNameEn: 'Segunbagicha (CS Record)',
    jlNo: '৫৮',
    upazilaId: 'upz-ramna',
    surveyType: 'CS',
    surveyYear: '1914',
    scale: '১৬ ইঞ্চি = ১ মাইল',
    digitizedDate: '2024-11-20',
    qualityScorePercent: 91.2,
    topologicalIntegrity: 'WARNING',
    geoReferenced: true,
    parcelsCount: 190
  },
  {
    id: 'sheet-dlrs-04',
    sheetNo: 'সিট নং-০৩',
    mouzaNameBn: 'পাইকপাড়া (সিটি জরিপ)',
    mouzaNameEn: 'Paikpara (City Survey)',
    jlNo: '৭২',
    upazilaId: 'upz-mirpur',
    surveyType: 'RS',
    surveyYear: '2004',
    scale: '৩২ ইঞ্চি = ১ মাইল',
    digitizedDate: '2026-01-10',
    qualityScorePercent: 99.1,
    topologicalIntegrity: 'PASS',
    geoReferenced: true,
    parcelsCount: 420
  }
];

// Category 3: Registered Deed Records (Department of Registration / Ministry of Law)
export const DEMO_DEED_RECORDS: DeedRecord[] = [
  {
    id: 'deed-rec-01',
    deedNo: '৪৫০২/২০২২',
    deedYear: '2022',
    deedTypeBn: 'সাফ-কবলা দলিল (বিক্রয়)',
    deedTypeEn: 'Saf-Kabala (Sale Deed)',
    subRegistryOfficeBn: 'রমনা সাব-রেজিস্ট্রি অফিস',
    subRegistryOfficeEn: 'Ramna Sub-Registry Office',
    districtId: 'dist-dhaka',
    executantNameBn: 'মোঃ ফজলুর রহমান',
    claimantNameBn: 'আবুল কালাম আজাদ',
    mouzaNameBn: 'সেগুনবাগিচা',
    dagNo: '১২০৪',
    deedValueBdt: 7500000,
    stampDutyBdt: 112500, // 1.5%
    registrationFeeBdt: 75000, // 1%
    registrationDate: '2022-06-14',
    linkedParcelId: 'pcl-ramna-101',
    isLinkedToACLand: true,
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'deed-rec-02',
    deedNo: '১৮৯০/২০২৪',
    deedYear: '2024',
    deedTypeBn: 'দানপত্র দলিল (হেবা বিল এওয়াজ)',
    deedTypeEn: 'Heba Gift Deed',
    subRegistryOfficeBn: 'রমনা সাব-রেজিস্ট্রি অফিস',
    subRegistryOfficeEn: 'Ramna Sub-Registry Office',
    districtId: 'dist-dhaka',
    executantNameBn: 'রোকেয়া খাতুন',
    claimantNameBn: 'তানভীর আহমেদ',
    mouzaNameBn: 'সেগুনবাগিচা',
    dagNo: '১২০৫',
    deedValueBdt: 4200000,
    stampDutyBdt: 42000,
    registrationFeeBdt: 42000,
    registrationDate: '2024-02-18',
    linkedParcelId: 'pcl-ramna-102',
    isLinkedToACLand: true,
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'deed-rec-03',
    deedNo: '৭৮০/২০২৩',
    deedYear: '2023',
    deedTypeBn: 'বণ্টননামা দলিল (Partition Deed)',
    deedTypeEn: 'Partition Deed',
    subRegistryOfficeBn: 'রমনা সাব-রেজিস্ট্রি অফিস',
    subRegistryOfficeEn: 'Ramna Sub-Registry Office',
    districtId: 'dist-dhaka',
    executantNameBn: 'আহমেদ ওয়ারিশান পক্ষগণ',
    claimantNameBn: 'মেসার্স ডেল্টা হোল্ডিংস লিঃ',
    mouzaNameBn: 'কাকরাইল',
    dagNo: '৮৯০',
    deedValueBdt: 12000000,
    stampDutyBdt: 180000,
    registrationFeeBdt: 120000,
    registrationDate: '2023-11-09',
    linkedParcelId: 'pcl-ramna-104',
    isLinkedToACLand: true,
    verificationStatus: 'VERIFIED'
  },
  {
    id: 'deed-rec-04',
    deedNo: '১২০৫/২০২১',
    deedYear: '2021',
    deedTypeBn: 'সাফ-কবলা দলিল',
    deedTypeEn: 'Sale Deed',
    subRegistryOfficeBn: 'পাঁচলাইশ সাব-রেজিস্ট্রি অফিস',
    subRegistryOfficeEn: 'Panchlaish Sub-Registry Office',
    districtId: 'dist-chattogram',
    executantNameBn: 'মৌলভী হাফিজুর রহমান ওয়ারিশ',
    claimantNameBn: 'চট্টগ্রাম ট্রেডিং করপোরেশন',
    mouzaNameBn: 'মুরাদপুর',
    dagNo: '৭৮১',
    deedValueBdt: 9500000,
    stampDutyBdt: 142500,
    registrationFeeBdt: 95000,
    registrationDate: '2021-08-22',
    linkedParcelId: 'pcl-panchlaish-301',
    isLinkedToACLand: true,
    verificationStatus: 'VERIFIED'
  }
];
