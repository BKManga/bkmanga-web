import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './front-end/test/test.component';
import {RouterModule} from "@angular/router";
import { ErrorDialogComponent } from './front-end/component/shared/error-dialog/error-dialog.component';
import { LoadingComponent } from './front-end/component/shared/loading/loading.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ApiModule, Configuration} from "./front-end/bkmanga-svc";
import {ApiBaseUrl} from "./front-end/constant/constants";
import { LoginComponent } from './front-end/component/page/login/login.component';
import { HeaderComponent } from './front-end/component/shared/header/header.component';
import { FooterComponent } from './front-end/component/shared/footer/footer.component';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ResultSearchHeaderComponent } from './front-end/component/shared/result-search-header/result-search-header.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ErrorDialogComponent,
    LoadingComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ResultSearchHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: `${ApiBaseUrl}`
      })
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatIconModule,
    NgOptimizedImage,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
