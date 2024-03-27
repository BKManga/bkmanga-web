import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './front-end/test/test.component';
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
import { NavigationBarComponent } from './front-end/component/shared/navigation-bar/navigation-bar.component';
import {LoginComponent} from "./front-end/component/page/auth/login/login.component";
import { MainComponent } from './front-end/component/page/user/main/main.component';
import { RegisterComponent } from './front-end/component/page/auth/register/register.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import { MangaCardComponent } from './front-end/component/page/user/manga-card/manga-card.component';
import { SeparateStringPipe } from './front-end/pipe/separate-string.pipe';
import { TopMangaComponent } from './front-end/component/page/user/top-manga/top-manga.component';
import { MangaDetailComponent } from './front-end/component/page/user/manga-detail/manga-detail.component';
import { ChapterDetailComponent } from './front-end/component/page/user/chapter-detail/chapter-detail.component';
import { MangaCommentComponent } from './front-end/component/page/user/manga-comment/manga-comment.component';
import { ChapterCommentComponent } from './front-end/component/page/user/chapter-comment/chapter-comment.component';
import { ChapterListComponent } from './front-end/component/page/user/chapter-list/chapter-list.component';
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";

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
    NavigationBarComponent,
    MainComponent,
    RegisterComponent,
    MangaCardComponent,
    SeparateStringPipe,
    TopMangaComponent,
    MangaDetailComponent,
    ChapterDetailComponent,
    MangaCommentComponent,
    ChapterCommentComponent,
    ChapterListComponent,
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
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatRadioModule,
    MatListModule,
    MatPaginatorModule,
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
