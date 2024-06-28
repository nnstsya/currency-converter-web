import { NgModule } from '@angular/core';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {
  HomePageCurrencyInputComponent
} from "./pages/home-page/components/home-page-currency-input/home-page-currency-input.component";
import {AsyncPipe, CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CurrencyService} from "@services/currency.service";
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {DividerModule} from "primeng/divider";

@NgModule({
  declarations: [HomePageComponent, HomePageCurrencyInputComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
      }
    ]),
    AsyncPipe,
    ReactiveFormsModule,
    DropdownModule,
    InputNumberModule,
    DividerModule,
    NgOptimizedImage
  ],
  providers: [CurrencyService]
})
export class HomeModule { }
