import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AppRouter, AppRouterAdmin} from "../../../constant/constants";
import {JwtDecodeService} from "../../../service/jwt-decode.service";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent {

  constructor(
    private router: Router,
    private jwtDecodeService: JwtDecodeService,
  ) {}

  redirectToMangaManagePage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Manga])
  }

  redirectToAuthorManagePage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Author])
  }

  redirectToPrivacyPolicyManagePage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.PrivacyPolicy])
  }

  redirectToErrorReportManagePage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.ErrorReport])
  }

  redirectToOutLawReportPage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.OutLawReport])
  }

  redirectToUserManagePage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.User])
  }

  redirectToGenreManagePage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Genre])
  }

  logout = () => {
    this.jwtDecodeService.deleteAuthToken()
    window.location.reload()
  }
}
