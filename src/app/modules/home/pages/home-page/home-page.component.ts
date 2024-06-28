import {Component, OnInit} from '@angular/core';
import {map, Observable, of, Subject, takeUntil, tap} from "rxjs";
import {CurrencyService} from "@services/currency.service";
import {CurrencyModel} from "@models/currency.model";
import {FormControl, FormGroup} from "@angular/forms";
import {
  currencyFormInitialValues,
  CurrencyFormModel
} from "./components/home-page-currency-input/models/currency-form.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  currencies$: Observable<CurrencyModel[]> = of([]);
  currencyForm: FormGroup = new FormGroup({
    userValue: new FormControl<CurrencyFormModel>(currencyFormInitialValues),
    convertedValue: new FormControl<CurrencyFormModel>(currencyFormInitialValues)
  });

  userValueControl!: FormControl;
  convertedValueControl!: FormControl;
  private unsubscribe$ = new Subject<void>();
  usdToUah$: Observable<number> = of(0);
  eurToUah$: Observable<number> = of(0);

  ngOnInit() {
    this.currencies$ = this.currencyService.getAll().pipe(
      map((res: any) => res.response)
    );

    this.userValueControl = this.currencyForm.get('userValue') as FormControl;
    this.convertedValueControl = this.currencyForm.get('convertedValue') as FormControl;

    this.currencyForm.get('userValue')!.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      tap((originAmount: any) => {
        const fromCurrency = originAmount.currency;
        const toCurrency = this.currencyForm.get('convertedValue')!.value.currency;
        this.convertCurrency(fromCurrency, toCurrency, originAmount.amount).subscribe(
          convertedNumber => {
            this.currencyForm.get('convertedValue')!.patchValue({
              currency: toCurrency,
              amount: convertedNumber.toFixed(2)
            }, { emitEvent: false });
          }
        );
      })
    ).subscribe();

    this.currencyForm.get('convertedValue')!.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      tap((convertedAmount: any) => {
        const fromCurrency = convertedAmount.currency;
        const toCurrency = this.currencyForm.get('userValue')!.value.currency;
        this.convertCurrency(fromCurrency, toCurrency, convertedAmount.amount).subscribe(
          convertedNumber => {
            this.currencyForm.get('userValue')!.patchValue({
              currency: toCurrency,
              amount: convertedNumber.toFixed(2)
            }, { emitEvent: false })
          }
        );
      })
    ).subscribe();

    this.usdToUah$ = this.convertCurrency('USD', 'UAH', 1);
    this.eurToUah$ = this.convertCurrency('EUR', 'UAH', 1);
  }

  constructor(private currencyService: CurrencyService) {
    this.currencyForm = new FormGroup({
    userValue: new FormControl<CurrencyFormModel>(currencyFormInitialValues),
    convertedValue: new FormControl<CurrencyFormModel>(currencyFormInitialValues)
  });
  }

  convertCurrency(fromCurrency: string, toCurrency: string, amount: number): Observable<number> {
    return this.currencyService.getConverted(fromCurrency, toCurrency, amount).pipe(
      map((result) => result.value)
    );
  }

  swapCurrencies() {
    const userValue = this.currencyForm.get('userValue')!.value;
    const convertedValue = this.currencyForm.get('convertedValue')!.value;

    this.currencyForm.get('userValue')!.patchValue({
      currency: convertedValue.currency,
      amount: convertedValue.amount
    }, { emitEvent: false });

    this.currencyForm.get('convertedValue')!.patchValue({
      currency: userValue.currency,
      amount: userValue.amount
    }, { emitEvent: false });
  }

  protected readonly FormControl = FormControl;
}
