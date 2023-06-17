export enum MERCHANT_COMMENT_TYPE {
  PERSONAL_INFO = 'personalInfoComments',
  ADDITIONAL_COMPANY_INFO = 'additionalCompanyInfoComments',
  PROCESSING_INFO = 'processingInfoComments',
  KYC_INFO = 'kycInfoComments',
  TAX_INFO = 'taxInfoComments',
  BANK_INFO = 'bankInfoComments',
  STARTUP_INFO = 'startUpInfoComments',
  SALES = 'salesComments',
  SOURCEOFSALE = 'sourceOfSalesComments',
  DBA = 'dbaComments',
  COMMUNICATION="communicationComments",
  PRODUCTSALE ="productServiceComments",
}

export const MERCHANT_COMMENT_TYPE_VALUES = Object.values(MERCHANT_COMMENT_TYPE);
