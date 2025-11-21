
export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface ShipmentEmailData {
  trackingNumber: string;
  senderName: string;
  senderEmail: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  senderZip: string;
  senderCountry: string;
  recipientName: string;
  recipientEmail: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  recipientCountry: string;
  packageType: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  value: string;
  description: string;
  serviceType: string;
  priority: string;
  shippingDate: string;
  estimatedDeliveryDate: string;
  shippingCost: string;
}
