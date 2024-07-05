import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharingService} from "../../../../service/sharing.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppRouter, Gender, Role} from "../../../../constant/constants";
import {AuthControllerService, UserRegisterRequestDTO} from "../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {DialogService} from "../../../../service/dialog.service";
import {ErrorDialogData} from "../../../../interface/error-dialog-data";
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  protected formGroup: FormGroup
  protected readonly Gender = Gender

  constructor(
    private sharingService: SharingService,
    formBuilder: FormBuilder,
    private router: Router,
    private authControllerService: AuthControllerService,
    private dialogService: DialogService,
  ) {
    this.sharingService = sharingService

    this.formGroup = formBuilder.group({
      loginID: ["", [Validators.required, Validators.maxLength(256)]],
      fullName: ["", [Validators.required, Validators.maxLength(256)]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(256)]],
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
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched()
      return
    }

    let role = Role.User

    let registerUserRequest: UserRegisterRequestDTO = {
      username: this.formGroup.controls['loginID'].value.trim(),
      fullName: this.formGroup.controls['fullName'].value.trim(),
      password: this.formGroup.controls['password'].value.trim(),
      email: this.formGroup.controls['email'].value.trim(),
      phoneNumber: this.formGroup.controls['phoneNumber'].value.trim(),
      dateOfBirth: moment(this.formGroup.controls['dateOfBirth'].value).format("DD/MM/YYYY"),
      genderId: this.formGroup.controls['gender'].value,
      role: role
    }

    this.authControllerService.register(registerUserRequest).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.showDialog(
            "Đăng ký thành công",
            "Hãy đăng nhập tài khoản ở màn hình đăng nhập",
            () => this.redirectToLoginPage().then()
          )
        } else {
          this.showDialog(
            response.errorCode ?? "",
            response.message ?? "",
          )
        }
    })
  }

  private showDialog = (
    title: string,
    message: string,
    onAccept: Function = () => {},
  ) => {
    let errorDialogData: ErrorDialogData = {
      title: title,
      description: message,
      buttonText: "Đóng",
      onAccept: onAccept
    }

    this.dialogService.showErrorDialog(errorDialogData)
  }
}
