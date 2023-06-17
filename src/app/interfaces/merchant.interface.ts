export interface IMerchant {
  _id: string;
  email: string;
  companyName: string;
  contactName: string;
  businessId: string;
  applicationId: string;
  applicationIdkey: string;
  phoneNumberCall: number;
  phoneNumberSMS: number;
  einNumber: number;
  offerCode: string;
  status: string;
  role: string;
  paymentProcessor?:string;
}
