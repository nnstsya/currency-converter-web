import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "@environments/environment";
import {API_KEY} from "@tokens/environment.token";
import { PrimeNGConfig } from 'primeng/api';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: API_KEY, useValue: environment.apiKey },
    PrimeNGConfig,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
