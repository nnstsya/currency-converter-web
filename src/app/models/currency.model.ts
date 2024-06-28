export interface CurrencyModel {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: symbol;
  thousands_separator: symbol;
}

export interface CurrencyConvertedModel {
  timestamp: number;
  date: string;
  from: string;
  to: string;
  amount: number;
  value: number;
}
