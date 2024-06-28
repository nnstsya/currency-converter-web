export interface CurrencyFormModel {
  amount: number;
  currency: string;
}

export const currencyFormInitialValues: CurrencyFormModel = {
  amount: 0,
  currency: 'AED'
};
