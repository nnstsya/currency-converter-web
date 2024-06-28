import {inject, Inject, Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_KEY} from "@tokens/environment.token";
import {CurrencyConvertedModel, CurrencyModel} from "@models/currency.model";

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  private baseUrl = 'https://api.currencybeacon.com/v1';
  private apiKey = inject(API_KEY)
  private http = inject(HttpClient)

  getAll(): Observable<CurrencyModel[]> {
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('type', 'fiat')
    return this.http.get<CurrencyModel[]>(this.baseUrl + '/currencies', {params});
  }

  getConverted(fromCurrency: string, toCurrency: string, amount: number): Observable<CurrencyConvertedModel> {
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('from', fromCurrency)
      .set('to', toCurrency)
      .set('amount', amount)
    return this.http.get<CurrencyConvertedModel>(this.baseUrl + '/convert', {params});
  }
}
