export interface Card {
  id: string;
  fullName: string;
  cardNumber: string;
  expired: number;
  cvv: string;
  cardType?: CardType;
}

export enum CardType {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCAZZ',
  BITCOIN = 'BITCOIN',
  GOOGLE_PAY = 'GOOGLE_PAY',
  APPLE_PAY = 'APPLE_PAY',
  AMERICAN_EXPRESS = 'AMERICAN_EXPRESS',
}
