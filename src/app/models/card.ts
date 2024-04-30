export interface Card {
  id: string;
  fullName: string;
  amount: number;
  cardNumber: string;
  expired: string;
  cvv: string;
  cardType?: CardType;
}

export enum CardType {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  BITCOIN = 'BITCOIN',
  GOOGLE_PAY = 'GOOGLE_PAY',
  APPLE_PAY = 'APPLE_PAY',
  AMERICAN_EXPRESS = 'AMERICAN_EXPRESS',
}
