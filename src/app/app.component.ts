import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bkmanga-web';

  public translateService: TranslateService


  constructor(translateService: TranslateService) {
    this.translateService = translateService;
    translateService.addLangs(['en', 'vi'])
    translateService.setDefaultLang('vi')
  }

  switchLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
