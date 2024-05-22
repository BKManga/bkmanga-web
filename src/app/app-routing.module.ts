import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./front-end/component/page/auth/login/login.component";
import {MainComponent} from "./front-end/component/page/user/main/main.component";
import {AppRouter, RouteChapter, RouteGenre, RouteManga} from "./front-end/constant/constants";
import {RegisterComponent} from "./front-end/component/page/auth/register/register.component";
import {MangaDetailComponent} from "./front-end/component/page/user/manga-detail/manga-detail.component";
import {ChapterDetailComponent} from "./front-end/component/page/user/chapter-detail/chapter-detail.component";
import {SearchComponent} from "./front-end/component/page/user/search/search.component";
import {FollowComponent} from "./front-end/component/page/user/follow/follow.component";
import {HistoryComponent} from "./front-end/component/page/user/history/history.component";
import {GenreComponent} from "./front-end/component/page/user/genre/genre.component";
import {PrivacyPolicyComponent} from "./front-end/component/page/user/privacy-policy/privacy-policy.component";

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
        path: AppRouter.Search,
        component: SearchComponent,
      },
      {
        path: AppRouter.Follow,
        component: FollowComponent,
      },
      {
        path: AppRouter.History,
        component: HistoryComponent,
      },
      {
        path: `${AppRouter.Genre}/:${RouteGenre.Param}`,
        component: GenreComponent,
      },
      {
        path: `${AppRouter.PrivacyPolicy}`,
        component: PrivacyPolicyComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      scrollPositionRestoration: 'enabled'
    }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
