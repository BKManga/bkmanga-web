import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {JwtDecodeService} from "../service/jwt-decode.service";
import {AppRouter} from "../constant/constants";

export const adminRoleGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtDecodeService)
  const router = inject(Router)

  if (jwtService.checkRole()) {
    return true
  } else {
    router.navigate([AppRouter.Auth, AppRouter.Login]).then()
    return false
  }
}
