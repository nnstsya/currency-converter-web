import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {CurrencyModel} from "@models/currency.model";
import {map, tap} from "rxjs";
import {CurrencyService} from "@services/currency.service";
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {currencyFormInitialValues, CurrencyFormModel} from "./models/currency-form.model";

@Component({
  selector: 'app-home-page-currency-input',
  templateUrl: './home-page-currency-input.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HomePageCurrencyInputComponent),
      multi: true
    }
  ]
})
export class HomePageCurrencyInputComponent implements ControlValueAccessor, OnInit {
  @Input() currencies: CurrencyModel[] = [];

  currencyForm = new FormGroup({
    amount: new FormControl<number>(currencyFormInitialValues.amount),
    currency: new FormControl<string>(currencyFormInitialValues.currency),
  });

  onChange!: (value: CurrencyFormModel) => void;
  onTouched!: () => void;

  constructor(private currencyService: CurrencyService) {}

   ngOnInit(): void {
    this.currencyForm.valueChanges
     .pipe(
        map((value: Partial<{ amount: number | null; currency: string | null; }>) => ({
          amount: value.amount?? 0,
          currency: value.currency?? '',
        })),
        tap((value: CurrencyFormModel) => {
          this.onChange(value?? currencyFormInitialValues)
        })
      )
     .subscribe()
  }

  registerOnChange(fn: (value: CurrencyFormModel) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: CurrencyFormModel): void {
    this.currencyForm.setValue(value, { emitEvent: false });
  }
}
