import { Component } from '@angular/core';
import {ImageData} from "../../../interface/image-data";
import {AppRouterAdmin, GetImage, LogoLarge, MiddlePrefixHandleImage} from "../../../constant/constants";
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment.development";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent {
  logoLarge: ImageData


  constructor(
    private router: Router,
  ) {
    this.logoLarge = LogoLarge
  }

  redirectToMainManagePage = async () => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Manga])
  }
  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage;
  protected readonly GetImage = GetImage;
  protected readonly environment = environment;
}
