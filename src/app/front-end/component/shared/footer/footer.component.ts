import { Component } from '@angular/core';
import {ImageData} from "../../../interface/image-data";
import {AppRouter, LogoLarge, LogoShort} from "../../../constant/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public logoLarge: ImageData

  constructor(
    private router: Router,
  ) {
    this.logoLarge = LogoLarge
  }

  redirectToPrivacyPolicyPage = async () : Promise<void> => {
    await this.router.navigate([AppRouter.Main, AppRouter.PrivacyPolicy])
  }
}
