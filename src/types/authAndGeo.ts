/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Types for Citizen & Multi-Admin Authentication, RBAC, and Hierarchical Geospatial Layers
 */

export type UserRole = 'CITIZEN' | 'ADMIN_CATEGORY_1' | 'ADMIN_CATEGORY_2' | 'ADMIN_CATEGORY_3';

export type AdminCategory =
  | 'CATEGORY_1_RECORDS_TAX'        // Ministry of Land: Records, Mutation & Tax
  | 'CATEGORY_2_SURVEY_MAPPING'     // DLRS: Survey, Cadastral Maps, CS/SA/RS
  | 'CATEGORY_3_DEED_REGISTRATION'; // Department of Registration: Deeds & Sub-Registry

export type VerificationStatus = 'UNVERIFIED' | 'PENDING_VERIFICATION' | 'VERIFIED';

export interface CitizenUser {
  id: string;
  name: string;
  nameBn?: string;
  mobile: string;
  mobileVerified: boolean;
  email?: string;
  emailVerified: boolean;
  nid?: string;
  nidStatus: VerificationStatus;
  accountStatus: 'ACTIVE' | 'PENDING_VERIFICATION';
  createdAt: string;
  role: 'CITIZEN';
  savedParcels?: string[];
}

export interface AdminUser {
  id: string;
  employeeId: string;
  name: string;
  nameBn: string;
  email: string;
  designationBn: string;
  designationEn: string;
  authorityBn: string;
  authorityEn: string;
  authorityCode: 'MINLAND' | 'DLRS' | 'DOLR';
  category: AdminCategory;
  role: UserRole;
  permissions: string[];
  twoFactorEnabled: boolean;
  lastLogin: string;
}

export type AuthUser = CitizenUser | AdminUser;

// Geospatial Models
export interface Division {
  id: string;
  code: string;
  nameBn: string;
  nameEn: string;
  centerLat: number;
  centerLng: number;
  svgPath: string; // Vector shape on Bangladesh map projection
  districtsCount: number;
  upazilasCount: number;
  areaKm2: number;
  populationEstimate: string;
  color: string;
  polygonCoordinates?: [number, number][];
}

export interface District {
  id: string;
  divisionId: string;
  code: string;
  nameBn: string;
  nameEn: string;
  centerLat: number;
  centerLng: number;
  upazilasCount: number;
  areaKm2: number;
  polygonCoordinates?: [number, number][];
}

export interface Upazila {
  id: string;
  districtId: string;
  code: string;
  nameBn: string;
  nameEn: string;
  parcelsCount: number;
  centerLat?: number;
  centerLng?: number;
  polygonCoordinates?: [number, number][];
}

export type SurveyType = 'CS' | 'SA' | 'RS';

export interface SurveyRecordDetail {
  surveyType: SurveyType;
  surveyPeriod: string;
  khatianNo: string;
  dagNo: string;
  volumeNo: string;
  recordedOwnerBn: string;
  recordedOwnerEn: string;
  recordedAreaAcre: number;
  verified: boolean;
}

export interface DemoParcel {
  id: string;
  upazilaId: string;
  mouzaNameBn: string;
  mouzaNameEn: string;
  mouzaJlNo: string;
  plotDagNo: string;
  areaDecimals: number;
  areaKatha?: number;
  upazilaNameBn?: string;
  landClassBn: string;
  landClassEn: string;
  coordinates: [number, number][]; // Polygon vertices on local canvas [x, y]
  surveys: {
    cs?: SurveyRecordDetail;
    sa?: SurveyRecordDetail;
    rs?: SurveyRecordDetail;
  };
  deedReference?: {
    deedNo: string;
    deedYear: string;
    deedTypeBn: string;
    subRegistryOfficeBn: string;
  };
  taxStatus: 'CLEARED' | 'ARREARS_DUE';
  mutationStatus: 'MUTATED' | 'PENDING' | 'ORIGINAL';
  isDemoData: true;
}

export interface LandOfficeMarker {
  id: string;
  divisionId: string;
  districtId: string;
  nameBn: string;
  nameEn: string;
  officeType: 'AC_LAND' | 'SUB_REGISTRY' | 'UNION_LAND' | 'RECORD_SURVEY';
  lat: number;
  lng: number;
  upazilaNameBn: string;
  districtNameBn: string;
  phone: string;
  addressBn: string;
  hoursBn: string;
  inChargeBn: string;
  jurisdictionBn: string;
}

export interface SurveyRecordMarker {
  id: string;
  surveyType: 'CS' | 'SA' | 'RS';
  divisionId: string;
  districtId: string;
  lat: number;
  lng: number;
  khatianNo: string;
  dagNo: string;
  mouzaNameBn: string;
  mouzaNameEn: string;
  mouzaJlNo: string;
  recordedOwnerBn: string;
  recordedOwnerEn: string;
  surveyPeriod: string;
  areaDecimals: number;
  recordedAreaAcre: number;
  landClassBn: string;
  volumeNo: string;
  statusBn: string;
  verified: boolean;
}

export interface CadastralDagRecord {
  id: string;
  divisionId: string;
  districtId: string;
  districtNameBn: string;
  upazilaId: string;
  upazilaNameBn: string;
  mouzaNameBn: string;
  mouzaJlNo: string;
  dagNo: string; // Dag / Plot Number
  previousDagNo?: string;
  landClassBn: string;
  areaDecimals: number;
  areaAcres: number;
  csKhatianNo?: string;
  csRecordedOwnerBn?: string;
  csPeriod?: string;
  csTokNo?: string;
  saKhatianNo?: string;
  saRecordedOwnerBn?: string;
  saPeriod?: string;
  saVolumeNo?: string;
  rsKhatianNo?: string;
  rsRecordedOwnerBn?: string;
  rsPeriod?: string;
  rsVolumeNo?: string;
  mutationStatus: 'MUTATED' | 'PENDING' | 'ORIGINAL';
  taxStatus: 'CLEARED' | 'ARREARS_DUE';
  verified: boolean;
  lat: number;
  lng: number;
}

// Admin Category 1: Mutation & Tax Demo Records
export interface MutationApplication {
  id: string;
  caseNo: string;
  applicantNameBn: string;
  applicantNameEn: string;
  applicantMobile: string;
  applicantNid?: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  mouzaNameBn: string;
  mouzaNameEn?: string;
  khatianNo: string;
  dagNo: string;
  areaDecimals: number;
  applicationDate: string;
  submissionDate?: string;
  status: 'PENDING_INSPECTION' | 'HEARING_SCHEDULED' | 'APPROVED' | 'DCR_ISSUED' | 'REJECTED';
  hearingDate?: string;
  statutoryFeePaidBdt: number;
}

export interface LandTaxRecord {
  id: string;
  holdingNo: string;
  ownerNameBn: string;
  ownerNameEn: string;
  nidLastDigits: string;
  upazilaId: string;
  mouzaNameBn: string;
  landAreaDecimals: number;
  annualTaxBdt: number;
  arrearsBdt: number;
  currentDuesBdt: number;
  lastPaymentDate?: string;
  paymentStatus: 'PAID' | 'DUE' | 'EXEMPTED'; // Exempted if <25 bighas agri
}

// Admin Category 2: Survey & Mapping Demo Records
export interface CadastralSheetRecord {
  id: string;
  sheetNo: string;
  districtId?: string;
  mouzaNameBn: string;
  mouzaNameEn?: string;
  jlNo: string;
  upazilaId: string;
  surveyType: SurveyType;
  surveyYear: string;
  scale: string;
  digitizedDate: string;
  qualityScorePercent: number;
  topologicalIntegrity: 'PASS' | 'WARNING' | 'NEEDS_RECHECK' | 'VERIFIED';
  geoReferenced?: boolean;
  parcelsCount?: number;
}

// Admin Category 3: Deed Registration Demo Records
export interface DeedRecord {
  id: string;
  deedNo: string;
  deedYear?: string;
  deedTypeBn: string;
  deedTypeEn?: string;
  subRegistryOfficeBn: string;
  subRegistryOfficeEn?: string;
  districtId: string;
  upazilaId?: string;
  executantNameBn: string; // Seller/Donor
  claimantNameBn: string;  // Buyer/Donee
  mouzaNameBn: string;
  dagNo: string;
  khatianNo?: string;
  deedValueBdt: number;
  stampDutyBdt: number;
  registrationFeeBdt?: number;
  registrationDate: string;
  linkedParcelId?: string;
  isLinkedToACLand: boolean;
  verificationStatus?: 'VERIFIED' | 'PENDING_AUDIT';
}
