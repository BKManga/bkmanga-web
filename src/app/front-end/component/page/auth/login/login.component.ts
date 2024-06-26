import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {SharingService} from "../../../../service/sharing.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppRouter, AuthToken} from "../../../../constant/constants";
import {AuthControllerService, UserLoginRequestDTO} from "../../../../bkmanga-svc";
import {CookieService} from "ngx-cookie-service";
import {StatusCodes} from "http-status-codes";
import {JwtDecodeService} from "../../../../service/jwt-decode.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy{

  protected formGroup: FormGroup

  constructor(
    private sharingService: SharingService,
    formBuilder: FormBuilder,
    private router: Router,
    private authControllerService: AuthControllerService,
    private cookieService: CookieService,
    private jwtDecodeService: JwtDecodeService,
  ) {
    this.formGroup = formBuilder.group({
      loginID: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  async ngOnInit(): Promise<void> {
    await this.sharingService.setShowAuthButton(false)
    await this.sharingService.setHeaderSearch(false)
  }

  async redirectToRegisterPage() {
    await this.router.navigate([AppRouter.Auth, AppRouter.Register])
  }

  submitValueLoginForm = async (): Promise<void> => {
    if (!this.formGroup.valid) return

    let credential: UserLoginRequestDTO = {
      loginID: this.formGroup.controls['loginID'].value.trim(),
      password: this.formGroup.controls['password'].value.trim(),
    }

    this.authControllerService.login(credential).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          if (response.result?.tokenBearer) {
            this.cookieService.set(AuthToken, response.result?.tokenBearer)
            this.sharingService.setShowAuthButton(false).then()
            this.router.navigate([AppRouter.Main])
          }
        }
    })
  }

  async ngOnDestroy(): Promise<void> {
    if (!this.cookieService.get(AuthToken)) {
      await this.sharingService.setShowAuthButton(true)
    }

    this.sharingService.setHeaderSearch(true).then()
  }
}
