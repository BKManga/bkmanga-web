import { Component } from '@angular/core';
import {ImageData} from "../../../interface/image-data";
import {AppRouterAdmin, LogoLarge} from "../../../constant/constants";
import {Router} from "@angular/router";

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
}
