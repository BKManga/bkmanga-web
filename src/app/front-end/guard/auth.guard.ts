import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AppRouter, AuthToken} from "../constant/constants";
import {JwtDecodeService} from "../service/jwt-decode.service";
import {CookieService} from "ngx-cookie-service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtDecodeService)
  const router = inject(Router)
  const cookieService = inject(CookieService)

  if (jwtService.checkToken()) {
    return true
  } else {
    router.navigate([AppRouter.Auth, AppRouter.Login]).then()
    return false
  }
}
