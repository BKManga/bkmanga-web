import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./front-end/component/page/auth/login/login.component";
import {MainComponent} from "./front-end/component/page/user/main/main.component";
import {
  AppRouter, AppRouterAdmin,
  RouteAuthor,
  RouteChapter, RouteErrorReport,
  RouteGenre,
  RouteManga, RouteOutLawReport, RoutePrivacyPolicy,
  RouteSearch, RouteUser
} from "./front-end/constant/constants";
import {RegisterComponent} from "./front-end/component/page/auth/register/register.component";
import {MangaDetailComponent} from "./front-end/component/page/user/manga-detail/manga-detail.component";
import {ChapterDetailComponent} from "./front-end/component/page/user/chapter-detail/chapter-detail.component";
import {FilterComponent} from "./front-end/component/page/user/filter/filter.component";
import {FollowComponent} from "./front-end/component/page/user/follow/follow.component";
import {HistoryComponent} from "./front-end/component/page/user/history/history.component";
import {GenreComponent} from "./front-end/component/page/user/genre/genre.component";
import {PrivacyPolicyComponent} from "./front-end/component/page/user/privacy-policy/privacy-policy.component";
import {SearchComponent} from "./front-end/component/page/user/search/search.component";
import {AuthorComponent} from "./front-end/component/page/user/author/author.component";
import {authenticationGuard} from "./front-end/guard/auth.guard";
import {ProfileComponent} from "./front-end/component/page/user/profile/profile.component";
import {adminRoleGuard} from "./front-end/guard/admin-role.guard";
import {NotFoundComponent} from "./front-end/component/page/user/not-found/not-found.component";
import {ErrorPageComponent} from "./front-end/component/page/user/error-page/error-page.component";
import {GenreManageComponent} from "./front-end/component/page/admin/genre/genre-manage/genre-manage.component";
import {GenreDetailComponent} from "./front-end/component/page/admin/genre/genre-detail/genre-detail.component";
import {GenreAddComponent} from "./front-end/component/page/admin/genre/genre-add/genre-add.component";
import {AuthorManageComponent} from "./front-end/component/page/admin/author/author-manage/author-manage.component";
import {AuthorDetailComponent} from "./front-end/component/page/admin/author/author-detail/author-detail.component";
import {AuthorAddComponent} from "./front-end/component/page/admin/author/author-add/author-add.component";
import {MangaManageComponent} from "./front-end/component/page/admin/manga/manga-manage/manga-manage.component";
import {UserManageComponent} from "./front-end/component/page/admin/user/user-manage/user-manage.component";
import {
  ErrorReportManageComponent
} from "./front-end/component/page/admin/error-report/error-report-manage/error-report-manage.component";
import {
  OutLawReportManageComponent
} from "./front-end/component/page/admin/out-law-report/out-law-report-manage/out-law-report-manage.component";
import {
  PrivacyPolicyManageComponent
} from "./front-end/component/page/admin/privacy-policy/privacy-policy-manage/privacy-policy-manage.component";
import {
  PrivacyPolicyDetailComponent
} from "./front-end/component/page/admin/privacy-policy/privacy-policy-detail/privacy-policy-detail.component";
import {
  PrivacyPolicyAddComponent
} from "./front-end/component/page/admin/privacy-policy/privacy-policy-add/privacy-policy-add.component";
import {MangaAddComponent} from "./front-end/component/page/admin/manga/manga-add/manga-add.component";
import {
  MangaDetailManageComponent
} from "./front-end/component/page/admin/manga/manga-detail-manage/manga-detail-manage.component";
import {noAuthGuard} from "./front-end/guard/no-auth.guard";
import {UserDetailComponent} from "./front-end/component/page/admin/user/user-detail/user-detail.component";
import {
  ErrorReportDetailComponent
} from "./front-end/component/page/admin/error-report/error-report-detail/error-report-detail.component";
import {
  OutLawReportDetailComponent
} from "./front-end/component/page/admin/out-law-report/out-law-report-detail/out-law-report-detail.component";

const routes: Routes = [
  {
    path: AppRouter.Auth,
    canActivate: [noAuthGuard],
    children: [
      {
        path: AppRouter.Login,
        component: LoginComponent
      },
      {
        path: AppRouter.Register,
        component: RegisterComponent
      }
    ]
  },
  {
    path: AppRouter.Empty,
    component: MainComponent
  },
  {
    path: AppRouter.Main,
    children: [
      {
        path: AppRouter.Empty,
        component: MainComponent
      },
      {
        path: `${AppRouter.MangaDetail}/:${RouteManga.Param}`,
        children: [
          {
            path: AppRouter.Empty,
            component: MangaDetailComponent
          },
          {
            path: `${AppRouter.ChapterDetail}/:${RouteChapter.Param}`,
            component: ChapterDetailComponent
          }
        ]
      },
      {
        path: `${AppRouter.Search}/:${RouteSearch.Param}`,
        component: SearchComponent,
      },
      {
        path: AppRouter.Follow,
        component: FollowComponent,
        canActivate: [authenticationGuard]
      },
      {
        path: AppRouter.History,
        component: HistoryComponent,
        canActivate: [authenticationGuard]
      },
      {
        path: AppRouter.Filter,
        component: FilterComponent,
      },
      {
        path: `${AppRouter.Author}/:${RouteAuthor.Param}`,
        component: AuthorComponent,
      },
      {
        path: `${AppRouter.Genre}/:${RouteGenre.Param}`,
        component: GenreComponent,
      },
      {
        path: `${AppRouter.PrivacyPolicy}`,
        component: PrivacyPolicyComponent,
      },
      {
        path: `${AppRouter.Profile}`,
        canActivate: [authenticationGuard],
        component: ProfileComponent
      }
    ]
  },
  {
    path: AppRouterAdmin.Admin,
    canActivate: [authenticationGuard, adminRoleGuard],
    children: [
      {
        path: AppRouterAdmin.Empty,
        component: MangaManageComponent
      },
      {
        path: AppRouterAdmin.Manga,
        children: [
          {
            path: AppRouterAdmin.Empty,
            component: MangaManageComponent
          },
          {
            path: AppRouterAdmin.Add,
            component: MangaAddComponent
          },
          {
            path: `${AppRouterAdmin.Detail}/:${RouteManga.Param}`,
            component: MangaDetailManageComponent
          }
        ]
      },
      {
        path: AppRouterAdmin.Author,
        children: [
          {
            path: AppRouterAdmin.Empty,
            component: AuthorManageComponent
          },
          {
            path: `${AppRouterAdmin.Detail}/:${RouteAuthor.Param}`,
            component: AuthorDetailComponent
          },
          {
            path: AppRouterAdmin.Add,
            component: AuthorAddComponent
          }
        ]
      },
      {
        path: AppRouterAdmin.Genre,
        children: [
          {
            path: AppRouterAdmin.Empty,
            component: GenreManageComponent
          },
          {
            path: `${AppRouterAdmin.Detail}/:${RouteGenre.Param}`,
            component: GenreDetailComponent
          },
          {
            path: AppRouterAdmin.Add,
            component: GenreAddComponent
          }
        ]
      },
      {
        path: AppRouterAdmin.User,
        children: [
          {
            path: AppRouterAdmin.Empty,
            component: UserManageComponent
          },
          {
            path: `${AppRouterAdmin.Detail}/:${RouteUser.Param}`,
            component: UserDetailComponent
          },
        ]
      },
      {
        path: AppRouterAdmin.ErrorReport,
        children: [
          {
            path: AppRouterAdmin.Empty,
            component: ErrorReportManageComponent
          },
          {
            path: `${AppRouterAdmin.Detail}/:${RouteErrorReport.Param}`,
            component: ErrorReportDetailComponent
          }
        ]
      },
      {
        path: AppRouterAdmin.OutLawReport,
        children: [
          {
            path: AppRouterAdmin.Empty,
            component: OutLawReportManageComponent
          },
          {
            path: `${AppRouterAdmin.Detail}/:${RouteOutLawReport.Param}`,
            component: OutLawReportDetailComponent
          }
        ]
      },
      {
        path: AppRouterAdmin.PrivacyPolicy,
        children: [
          {
            path: AppRouterAdmin.Empty,
            component: PrivacyPolicyManageComponent,
          },
          {
            path: `${AppRouterAdmin.Detail}/:${RoutePrivacyPolicy.Param}`,
            component: PrivacyPolicyDetailComponent,
          },
          {
            path: AppRouterAdmin.Add,
            component: PrivacyPolicyAddComponent
          }
        ]
      }
    ]
  },
  {
    path: AppRouter.NotFound,
    component: NotFoundComponent
  },
  {
    path: AppRouter.Error,
    component: ErrorPageComponent
  },
  {
    path: '**', redirectTo: AppRouter.NotFound
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
