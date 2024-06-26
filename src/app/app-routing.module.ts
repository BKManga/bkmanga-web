import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./front-end/component/page/auth/login/login.component";
import {MainComponent} from "./front-end/component/page/user/main/main.component";
import {
  AppRouter, AppRouterAdmin,
  RouteAuthor,
  RouteChapter,
  RouteGenre,
  RouteManga,
  RouteSearch
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

const routes: Routes = [
  {
    path: AppRouter.Auth,
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
        component: ProfileComponent
      }
    ]
  },
  // {
  //   path: AppRouterAdmin.Admin,
  //   children: [
  //     {
  //       path: AppRouterAdmin.Empty,
  //
  //     }
  //   ]
  // }
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
