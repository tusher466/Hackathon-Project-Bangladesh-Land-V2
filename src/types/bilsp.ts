/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Bangladesh Integrated Land Services Portal (BILSP)
 * Domain Models & Schema Definitions
 */

export type Language = 'bn' | 'en';

export type IntegrationType =
  | 'TYPE_1_EXTERNAL_LINK'          // Verified external link with instructions
  | 'TYPE_2_INFO_INTEGRATION'        // Public info via authorized feed/open dataset
  | 'TYPE_3_TRANSACTIONAL_API'       // Authorized transactional API (status query, submit)
  | 'TYPE_4_DEMO_OR_PLANNED';        // Demonstration or planned integration awaiting access

export type AvailabilityStatus =
  | 'OFFICIAL_URL_VERIFIED'          // Official URL verified by administration
  | 'WEBSITE_REACHABLE'              // Website is live and responding
  | 'SERVICE_PAGE_VERIFIED'          // Specific service endpoint verified
  | 'API_CONNECTED'                  // Authorized API connected
  | 'TEMPORARILY_UNAVAILABLE'        // Temporarily down or under maintenance
  | 'VERIFICATION_REQUIRED'          // Needs manual re-verification
  | 'DEPRECATED_OR_REPLACED';        // Deprecated/replaced by newer system

export type LinkPurpose =
  | 'MAIN_PORTAL'
  | 'APPLICATION'
  | 'TRACKING'
  | 'PAYMENT'
  | 'CITIZEN_CHARTER'
  | 'MANUAL_OR_GUIDE'
  | 'COMPLAINT_OR_APPEAL'
  | 'OFFICE_WEBSITE';

export interface GovernmentInstitution {
  id: string;
  code: string;
  nameBn: string;
  nameEn: string;
  shortNameBn: string;
  shortNameEn: string;
  descriptionBn: string;
  descriptionEn: string;
  websiteUrl: string;
  parentMinistryBn: string;
  parentMinistryEn: string;
  addressBn: string;
  addressEn: string;
  contactEmail: string;
  helplinePhone: string;
  verificationSource: string;
  lastVerifiedDate: string;
  isVerified: boolean;
}

export interface ExternalWebsite {
  id: string;
  institutionId: string;
  domain: string;
  officialUrl: string;
  displayNameBn: string;
  displayNameEn: string;
  websitePurposeBn: string;
  websitePurposeEn: string;
  verificationSource: string;
  lastVerifiedDate: string;
  verificationStatus: AvailabilityStatus;
  isPubliclyAvailable: boolean;
  integrationMode: IntegrationType;
  accessLimitationsBn?: string;
  accessLimitationsEn?: string;
  responseLatencyMs?: number;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  descriptionEn: string;
  iconName: string;
  sortOrder: number;
}

export interface ServiceWebsiteLink {
  id: string;
  serviceId: string;
  titleBn: string;
  titleEn: string;
  url: string;
  purpose: LinkPurpose;
  isPrimary: boolean;
  isVerified: boolean;
  lastChecked: string;
  notesBn?: string;
  notesEn?: string;
}

export interface ServiceInstruction {
  id: string;
  serviceId: string;
  stepNumber: number;
  titleBn: string;
  titleEn: string;
  instructionBn: string;
  instructionEn: string;
}

export interface OfficialFeeItem {
  id: string;
  titleBn: string;
  titleEn: string;
  amountBdt: number;
  notesBn?: string;
  notesEn?: string;
}

export interface LandService {
  id: string;
  slug: string;
  nameBn: string;
  nameEn: string;
  shortDescriptionBn: string;
  shortDescriptionEn: string;
  detailedDescriptionBn: string;
  detailedDescriptionEn: string;
  institutionId: string;
  categoryId: string;
  officialWebsiteUrl: string;
  directServiceUrl: string;
  integrationType: IntegrationType;
  availabilityStatus: AvailabilityStatus;
  lastVerifiedDate: string;
  verificationSource: string;
  isPopular: boolean;
  isPublished: boolean;
  
  // Specific requirements & guides
  eligibilityBn: string[];
  eligibilityEn: string[];
  requiredDocumentsBn: string[];
  requiredDocumentsEn: string[];
  instructions: ServiceInstruction[];
  officialFees: OfficialFeeItem[];
  officialFeesTotalBdt?: number;
  estimatedDeliveryDaysBn?: string;
  estimatedDeliveryDaysEn?: string;

  // External URLs
  links: ServiceWebsiteLink[];

  // Support Contacts
  helplinePhone?: string;
  supportEmail?: string;
  supportHoursBn?: string;
  supportHoursEn?: string;

  // Search keywords & synonyms
  keywords: string[];
  synonymsBn: string[];
  synonymsEn: string[];

  // Limitations & Disclaimers
  accessLimitationsBn?: string;
  accessLimitationsEn?: string;
}

export interface ServiceVerification {
  id: string;
  serviceId: string;
  verifiedBy: string;
  verificationDate: string;
  previousStatus: AvailabilityStatus;
  newStatus: AvailabilityStatus;
  officialSourceDocument: string;
  notes: string;
}

export interface ServiceAvailabilityCheck {
  id: string;
  serviceId: string;
  urlChecked: string;
  httpStatusCode: number | null;
  responseTimeMs: number;
  isReachable: boolean;
  checkedAt: string;
  errorMessage?: string;
}

export interface OfficialSource {
  id: string;
  titleBn: string;
  titleEn: string;
  institutionBn: string;
  institutionEn: string;
  sourceType: 'GAZETTE' | 'CIRCULAR' | 'WEBSITE_DIRECTORY' | 'CITIZEN_CHARTER' | 'ACT_OR_RULE';
  referenceNo: string;
  publishedDate: string;
  officialUrl: string;
  summaryBn: string;
  summaryEn: string;
}

export interface IntegrationConfiguration {
  id: string;
  serviceId: string;
  integrationType: IntegrationType;
  authMethod: 'NONE' | 'OAUTH2' | 'API_KEY' | 'MTLS' | 'PENDING_APPROVAL';
  endpointUrl?: string;
  dataSharingAgreementRef?: string;
  rateLimitPerMinute?: number;
  status: 'ACTIVE' | 'SANDBOX' | 'AWAITING_MEMORANDUM' | 'EXTERNAL_LINK_ONLY';
  lastHealthCheckDate?: string;
}

export interface IntegrationHealthEvent {
  id: string;
  serviceId: string;
  eventType: 'INFO' | 'WARNING' | 'ERROR' | 'STATUS_CHANGE';
  message: string;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'VERIFY' | 'STATUS_CHANGE' | 'DELETE' | 'LINK_ADD';
  targetType: 'SERVICE' | 'WEBSITE' | 'LINK' | 'CATEGORY' | 'INSTITUTION';
  targetId: string;
  targetName: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

export interface CitizenSavedService {
  id: string;
  serviceId: string;
  savedAt: string;
}

export interface CitizenApplicationNote {
  id: string;
  serviceId: string;
  trackingNumber: string;
  submissionDate: string;
  personalNotes: string;
  createdAt: string;
  isUserEnteredOnly: true; // Strict boolean confirming this is not an official synchronized status
}

export interface LandOffice {
  id: string;
  divisionBn: string;
  divisionEn: string;
  districtBn: string;
  districtEn: string;
  upazilaBn: string;
  upazilaEn: string;
  officeType: 'AC_LAND' | 'DC_OFFICE_REVENUE' | 'SUB_REGISTRY' | 'UNION_LAND_OFFICE';
  nameBn: string;
  nameEn: string;
  addressBn: string;
  addressEn: string;
  phone: string;
  email: string;
}
