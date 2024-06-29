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
import { ProfileComponent } from './front-end/component/page/user/profile/profile.component';
import { HeaderAdminComponent } from './front-end/component/shared/header-admin/header-admin.component';
import { DashboardAdminComponent } from './front-end/component/shared/dashboard-admin/dashboard-admin.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTableModule} from "@angular/material/table";
import { NotFoundComponent } from './front-end/component/page/user/not-found/not-found.component';
import { ErrorPageComponent } from './front-end/component/page/user/error-page/error-page.component';
import {GenreDetailComponent} from "./front-end/component/page/admin/genre/genre-detail/genre-detail.component";
import {GenreAddComponent} from "./front-end/component/page/admin/genre/genre-add/genre-add.component";
import {GenreManageComponent} from "./front-end/component/page/admin/genre/genre-manage/genre-manage.component";
import {AuthorManageComponent} from "./front-end/component/page/admin/author/author-manage/author-manage.component";
import { AuthorAddComponent } from './front-end/component/page/admin/author/author-add/author-add.component';
import { AuthorDetailComponent } from './front-end/component/page/admin/author/author-detail/author-detail.component';
import {UserManageComponent} from "./front-end/component/page/admin/user/user-manage/user-manage.component";
import {
  ErrorReportManageComponent
} from "./front-end/component/page/admin/error-report/error-report-manage/error-report-manage.component";
import {MangaManageComponent} from "./front-end/component/page/admin/manga/manga-manage/manga-manage.component";
import {
  PrivacyPolicyManageComponent
} from "./front-end/component/page/admin/privacy-policy/privacy-policy-manage/privacy-policy-manage.component";
import {
  OutLawReportManageComponent
} from "./front-end/component/page/admin/out-law-report/out-law-report-manage/out-law-report-manage.component";
import { PrivacyPolicyAddComponent } from './front-end/component/page/admin/privacy-policy/privacy-policy-add/privacy-policy-add.component';
import { PrivacyPolicyDetailComponent } from './front-end/component/page/admin/privacy-policy/privacy-policy-detail/privacy-policy-detail.component';
import { MangaAddComponent } from './front-end/component/page/admin/manga/manga-add/manga-add.component';
import { MangaDetailManageComponent } from './front-end/component/page/admin/manga/manga-detail-manage/manga-detail-manage.component';
import {MatSelectModule} from "@angular/material/select";

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
    ProfileComponent,
    HeaderAdminComponent,
    MangaManageComponent,
    DashboardAdminComponent,
    AuthorManageComponent,
    GenreManageComponent,
    UserManageComponent,
    ErrorReportManageComponent,
    OutLawReportManageComponent,
    PrivacyPolicyManageComponent,
    NotFoundComponent,
    ErrorPageComponent,
    GenreAddComponent,
    GenreDetailComponent,
    AuthorAddComponent,
    AuthorDetailComponent,
    PrivacyPolicyAddComponent,
    PrivacyPolicyDetailComponent,
    MangaAddComponent,
    MangaDetailManageComponent,
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
    MatSidenavModule,
    MatTableModule,
    MatSelectModule,
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
