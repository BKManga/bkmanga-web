import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {filter} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {AppRouterAdmin} from "./front-end/constant/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bkmanga-web';

  public translateService: TranslateService

  isAdminSite?: boolean

  constructor(
    translateService: TranslateService,
    private router: Router,

  ) {
    this.translateService = translateService;
    translateService.addLangs(['en', 'vi'])
    translateService.setDefaultLang('vi')

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      (event) => {
        event as NavigationEnd
        if (event instanceof NavigationEnd) {
          this.isAdminSite = event.url.includes(AppRouterAdmin.Admin)
        }
      }
    )
  }

  switchLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
