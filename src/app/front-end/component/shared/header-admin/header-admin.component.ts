import { Component } from '@angular/core';
import {ImageData} from "../../../interface/image-data";
import {AppRouterAdmin, AuthToken, GetImage, LogoLarge, MiddlePrefixHandleImage} from "../../../constant/constants";
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment.development";
import {JwtDecodeService} from "../../../service/jwt-decode.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent {

  logoLarge: ImageData
  urlImageProfile?: string

  constructor(
    private router: Router,
    private jwtDecodeService: JwtDecodeService,
    private cookieService: CookieService,
  ) {
    this.logoLarge = LogoLarge
    this.jwtDecodeService.checkToken().subscribe((value) => {
      if (value) {
        this.urlImageProfile = environment.apiBaseUrl +
          MiddlePrefixHandleImage.Prefix +
          GetImage.USER_PROFILE_LOGO +
          jwtDecodeService.decodeToken(cookieService.get(AuthToken))?.sub ?? ""
      }
    })
  }

  redirectToMainManagePage = async () => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Manga])
  }
  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage;
  protected readonly GetImage = GetImage;
  protected readonly environment = environment;
}
