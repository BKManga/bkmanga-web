import {NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './front-end/test/test.component';
import { ErrorDialogComponent } from './front-end/component/shared/error-dialog/error-dialog.component';
import { LoadingComponent } from './front-end/component/shared/loading/loading.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
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
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
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
import { ChapterListComponent } from './front-end/component/page/user/chapter-list/chapter-list.component';
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import { LevelDecorationDirective } from './front-end/directive/level-decoration.directive';
import {MatTooltipModule} from "@angular/material/tooltip";
import { BlockCommentComponent } from './front-end/component/page/user/block-comment/block-comment.component';
import {RequestHandleInterceptor} from "./front-end/interceptor/request-handle.interceptor";
import {CookieService} from "ngx-cookie-service";
import {LazyLoadImageModule} from "ng-lazyload-image";
import { MangaListComponent } from './front-end/component/page/user/manga-list/manga-list.component';
import { FilterComponent } from './front-end/component/page/user/filter/filter.component';
import { LabelPageComponent } from './front-end/component/page/user/label-page/label-page.component';
import { FilterBoxComponent } from './front-end/component/page/user/filter-box/filter-box.component';
import { FilterGenreElementComponent } from './front-end/component/page/user/filter-genre-element/filter-genre-element.component';
import { HistoryComponent } from './front-end/component/page/user/history/history.component';
import { FollowComponent } from './front-end/component/page/user/follow/follow.component';
import { GenreComponent } from './front-end/component/page/user/genre/genre.component';
import { PrivacyPolicyComponent } from './front-end/component/page/user/privacy-policy/privacy-policy.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { AuthorComponent } from './front-end/component/page/user/author/author.component';
import { SearchComponent } from './front-end/component/page/user/search/search.component';
import {NavigationEnd, Router} from "@angular/router";

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
    ChapterListComponent,
    LevelDecorationDirective,
    BlockCommentComponent,
    MangaListComponent,
    FilterComponent,
    LabelPageComponent,
    FilterBoxComponent,
    FilterGenreElementComponent,
    HistoryComponent,
    FollowComponent,
    GenreComponent,
    PrivacyPolicyComponent,
    AuthorComponent,
    SearchComponent,
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
        MatTooltipModule,
        LazyLoadImageModule,
        MatExpansionModule,
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHandleInterceptor,
      multi: true
    },
    CookieService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
