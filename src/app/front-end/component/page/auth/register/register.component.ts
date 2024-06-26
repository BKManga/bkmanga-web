import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharingService} from "../../../../service/sharing.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppRouter, Gender, Role} from "../../../../constant/constants";
import {AuthControllerService, UserRegisterRequestDTO} from "../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  protected formGroup: FormGroup
  protected readonly Gender = Gender

  constructor(
    private sharingService: SharingService,
    formBuilder: FormBuilder,
    private router: Router,
    private authControllerService: AuthControllerService,
  ) {
    this.sharingService = sharingService

    this.formGroup = formBuilder.group({
      loginID: ["", [Validators.required]],
      fullName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required, Validators.maxLength(10)]],
      dateOfBirth: ["", [Validators.required]],
      gender: [Gender.MALE.at(0), [Validators.required]],
      password: ["", [Validators.required]],
    })
  }

  async ngOnInit(): Promise<void> {
    await this.sharingService.setShowAuthButton(false)
    await this.sharingService.setHeaderSearch(false)
  }

  async redirectToLoginPage() {
    await this.router.navigate([AppRouter.Auth, AppRouter.Login])
  }

  submitValueRegisterForm() {
    if (!this.formGroup.valid) return

    let role = Role.User

    let registerUserRequest: UserRegisterRequestDTO = {
      username: this.formGroup.controls['loginID'].value.trim(),
      fullName: this.formGroup.controls['fullName'].value.trim(),
      password: this.formGroup.controls['password'].value.trim(),
      email: this.formGroup.controls['email'].value.trim(),
      phoneNumber: this.formGroup.controls['phoneNumber'].value.trim(),
      dateOfBirth: this.formGroup.controls['dateOfBirth'].value.trim(),
      genderId: this.formGroup.controls['gender'].value,
      role: role
    }

    this.authControllerService.register(registerUserRequest).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {

        }
    })

    console.log(this.formGroup.value)
  }

  async ngOnDestroy(): Promise<void> {
    await this.sharingService.setShowAuthButton(true)

    this.sharingService.setHeaderSearch(true).then()
  }
}
