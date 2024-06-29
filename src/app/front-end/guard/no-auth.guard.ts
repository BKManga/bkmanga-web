import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {JwtDecodeService} from "../service/jwt-decode.service";
import {AppRouter} from "../constant/constants";

export const noAuthGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtDecodeService)
  const router = inject(Router)

  if (!jwtService.checkToken()) {
    router.navigate([AppRouter.Main]).then()
    return false
  } else {
    router.navigate([AppRouter.Main]).then()
    return false
  }
}
