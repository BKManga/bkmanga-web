import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, finalize, Observable, of, retry} from 'rxjs';
import {Router} from "@angular/router";
import {DialogService} from "../service/dialog.service";
import {CookieService} from "ngx-cookie-service";
import {AppRouter, AuthToken, TokenPrefix} from "../constant/constants";
import {JwtDecodeService} from "../service/jwt-decode.service";

@Injectable()
export class RequestHandleInterceptor implements HttpInterceptor {

  private totalRequest: number

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private dialogService: DialogService,
    private jwtDecodeService: JwtDecodeService
  ) {
    this.totalRequest = 0
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequest++;
    if (this.totalRequest === 1) {
      if (!this.ignoreLoadingAnimation(request.url)) {
        this.dialogService.showLoadingData()
      }
    }

    const dubReq = request.clone({
      setHeaders: {
        Authorization: `${TokenPrefix}${this.cookieService.get(AuthToken)}`
      }
    })

    return next.handle(dubReq).pipe(
      finalize(() => {
        if (this.totalRequest > 0) this.totalRequest--
        console.log(this.totalRequest)
        if(this.totalRequest === 0) {
          this.dialogService.closeLoadingData()
        }
      }),
      retry(0),
      catchError((err: HttpErrorResponse, caught) => {
        console.log(this.totalRequest)
        if (this.totalRequest > 0) this.totalRequest--
        if (this.totalRequest === 0) {
          this.dialogService.closeLoadingData()
        }
        this.handleBaseErrorStatus(err)
        throw err
      })
    )
  }

  private handleBaseErrorStatus(error: HttpErrorResponse): Observable<any> {
    switch (error.status) {
      case 401:
      case 403:
        this.jwtDecodeService.deleteAuthToken()
        this.router.navigate([AppRouter.Auth, AppRouter.Login]).then()
        break
      case 500:
        this.router.navigate([AppRouter.Error]).then()
        break
      default:
        this.router.navigate([AppRouter.NotFound]).then()
        break
    }
    return of()
  }

  private ignoreLoadingAnimation = (urlTarget: string) => {
    let ignoreUrlTargetList: Array<string> = [
      "api/v1/manga/search/by/name",
      "/api/v1/file/manga/image-logo"
    ]

    return ignoreUrlTargetList.some((element) => urlTarget.includes(element))
  }
}
