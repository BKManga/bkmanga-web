import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {JwtDecodeService} from "../service/jwt-decode.service";
import {AppRouter, AppRouterAdmin} from "../constant/constants";

export const noAuthGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtDecodeService)
  const router = inject(Router)

  let checkToken: boolean = false

  jwtService.checkToken().subscribe((value) => {
    checkToken = value
  })

  if (checkToken) {
    if (jwtService.checkRole()) {
      return  router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.Main]).then()
    }
    return  router.navigate([AppRouter.Main]).then()

  } else {
    return true
  }
}
