import { IMerchant } from '@interfaces/merchant.interface';
import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { IDocument } from '@interfaces/document.interface';

export interface MerchantDetailInterface {
  merchant: IMerchant;

  // Personal information
  paymentProcessor?:string;
  firstname?: string;
  lastname?: string;
  country?: string;
  countryCode?: string;
  postalCode?: string;
  businessId?: string;
  applicationId?: string;
  applicationIdkey?: string;
  personalPhone?: string;
  personalInfoComments?: IMerchantComment[];
  dbaComments?: IMerchantComment[];
  sourceOfSalesComments?:IMerchantComment[];
  personalInfoStatus?: string;
  siteInspectionStatus?: string;
  qrCode?:string;
  // Additional Company information
  registeredCompanyName?: string;
  tradingName?: string;
  mainBusinessActivity?: string;
  secondaryBusinessActivity?: string;
  companyRegisteredNumber?: string;
  companyType?: string;
  yearsInBusiness?: string;
  websiteUrl?: string;
  registeredBusinessAddress?: string;
  businessAddressZipcode?: string;
  registeredTradingAddress?: string;
  tradingAddressZipcode?: string;
  companyDocs?: IDocument[];
  additionalCompanyInfoComments?: IMerchantComment[];
  additionalInfoStatus?: string;
  sourceOfSaleStatus?: string;
  fedTaxId?:string;
  MCC?:string;
  dbaInfoStatus?:string;
  // Processing information
  transactionsMonthlyVolume?: number;
  transactionsAvgAmount?: number;
  transactionsHighestValue?: number;
  seasonalMerchant?: boolean;
  processingInfoComments?: IMerchantComment[];
  processingInfoStatus?: string;
  processingStatement?: string;
  processingStatementFiles?: IDocument[];
  processingSales?:number;
  NDF?: number;
  currentProcessor?:number; 
  retailChipSwipe?:number;
  imprintCard?:string; 
  mailPhone?:string; 
  internet?:number;
  B2B?:number;
  B2C?:number;
  B2G?:number;
  monthlyVolume?:number;
  AVT?:number; 
  highTicket?:number; 
  ebtFns?:number; 
  emailAsMerchant?:string; 
  emailAsAdmin?:string;
  communicationStatus?:string;
  

  // KYC/KYB information
  idDocument?: IDocument;
  addressDocument?: IDocument;
  taxDocument?: IDocument;
  kycInfoComments?: IMerchantComment[];
  kycInfoStatus?: string;

  // Tax information
  federalTaxID?: string;
  stateTaxID?: string;
  taxInfoComments?: IMerchantComment[];
  taxInfoStatus?: string;
  abilityToUploadDocuments?: IDocument[];

  // Bank information
  bankName?: string;
  bankAccountName?: string;
  bankCheckingAccount?: string;
  bankRouting?: string;
  bankProcessingStatement?: string;
  bankProcessingStatementFiles?: IDocument[];
  bankInfoComments?: IMerchantComment[];
  bankInfoStatus?: string;

  // Startup information
  financialProjectionFile?: IDocument;
  businessPlanFile?: IDocument;
  startUpInfoComments?: IMerchantComment[];
  startupInfoStatus?: string;

  // Product/Services offered
  mainProducts?: object;
  salesInitiatedByFF?: number;
  salesInitiatedByOL?: number;
  salesInitiatedByEM?: number;
  salesInitiatedByPH?: number;
  salesInitiatedBySC?: number;
  productDeliver?: string;
  productObligations?: string;
  productDescription?: string;
  refundPolicy?: string;
  dropShipping?: string;
  dropShippingPerc?: string;
  salesComments?: IMerchantComment[];
  communicationComments?: IMerchantComment[];
  productServiceComments?: IMerchantComment[];
  productInfoStatus?: string;


//Site Inspection Component
merchantProperty?:string;
area?:string;
zoneType?:string; 
locationOfInventionary?:string; 
inventonaryConsistent?:string; 
locationSurvey?:string;
doesInsideMatchGoodSold?:string;
siteInfoComent?: IMerchantComment[];
}
