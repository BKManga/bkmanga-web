import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, finalize, Observable, of, retry} from 'rxjs';
import {Router} from "@angular/router";
import {DialogService} from "../service/dialog.service";
import {CookieService} from "ngx-cookie-service";
import {AuthToken, TokenPrefix} from "../constant/constants";
import {JwtDecodeService} from "../service/jwt-decode.service";

@Injectable()
export class RequestHandleInterceptor implements HttpInterceptor {

  private totalRequest: number
  private cookieService: CookieService
  private router: Router
  private dialogService: DialogService
  private jwtDecodeService: JwtDecodeService

  constructor(
    cookieService: CookieService,
    router: Router,
    dialogService: DialogService,
    jwtDecodeService: JwtDecodeService
  ) {
    this.cookieService = cookieService
    this.router = router
    this.totalRequest = 0
    this.dialogService = dialogService
    this.jwtDecodeService = jwtDecodeService
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequest++;
    if (this.totalRequest === 1) {
      this.dialogService.showLoadingData()
    }

    const dubReq = request.clone({
      setHeaders: {
        Authorization: `${TokenPrefix} ${this.cookieService.get(AuthToken)}`
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
      default:
        break
    }
    return of()
  }
}
