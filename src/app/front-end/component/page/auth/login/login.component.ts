import {Component, OnInit, Output} from '@angular/core';
import {SharingService} from "../../../../service/sharing.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppRouter} from "../../../../constant/constants";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{

  private sharingService: SharingService
  protected formGroup: FormGroup

  constructor(
    sharingService: SharingService,
    formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.sharingService = sharingService;
    this.formGroup = formBuilder.group({
      loginID: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  async ngOnInit(): Promise<void> {
    await this.sharingService.setShowAuthButton(false)
  }

  async redirectToRegisterPage() {
    await this.router.navigate([AppRouter.Auth, AppRouter.Register])
  }

  submitValueLoginForm() {
    if (!this.formGroup.valid) return
    console.log(this.formGroup.value)
  }
}
