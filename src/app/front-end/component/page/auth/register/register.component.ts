import {Component, OnInit} from '@angular/core';
import {SharingService} from "../../../../service/sharing.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppRouter} from "../../../../constant/constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  private sharingService: SharingService
  protected formGroup: FormGroup

  constructor(
    sharingService: SharingService,
    formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.sharingService = sharingService

    this.formGroup = formBuilder.group({
      loginID: ["", [Validators.required]],
      fullName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required, Validators.maxLength(10)]],
      dateOfBirth: ["", [Validators.required]],
      gender: ["male", [Validators.required]],
      password: ["", [Validators.required]],
    })
  }

  async ngOnInit(): Promise<void> {
    await this.sharingService.setShowAuthButton(false)
  }

  async redirectToLoginPage() {
    await this.router.navigate([AppRouter.Auth, AppRouter.Login])
  }

  submitValueRegisterForm() {
    if (!this.formGroup.valid) return

    console.log(this.formGroup.value)
  }
}
