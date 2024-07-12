import {Component, OnInit} from '@angular/core';
import {
  ApiResponseObject,
  GetUserDetailRequestDTO,
  GetUserManagementResponseDTO,
  UpdateInfoUserRequestDTO, UpdatePasswordUserRequestDTO, UpdateStatusUserRequestDTO,
  UserControllerService
} from "../../../../../bkmanga-svc";
import {DialogService} from "../../../../../service/dialog.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRouterAdmin, Gender, RoutePrivacyPolicy, RouteUser} from "../../../../../constant/constants";
import {StatusCodes} from "http-status-codes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ErrorDialogData} from "../../../../../interface/error-dialog-data";
import {SnackbarData} from "../../../../../interface/snackbar-data";
import * as moment from "moment/moment";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  userDetail?: GetUserManagementResponseDTO
  private userId?: string

  formGroupUser: FormGroup
  formGroupPassword: FormGroup

  constructor(
    private userControllerService: UserControllerService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formGroupUser = formBuilder.group({
      username: [{value: "", disabled: true}],
      fullName: ["" , Validators.required],
      email: [{value: "", disabled: true}],
      role: [{value: "", disabled: true}],
      dateOfBirth: ["", Validators.required],
      phoneNumber: [{value: "", disabled: true}],
      level: [{value: 0, disabled: true}],
      gender: [Gender.MALE.at(0), Validators.required],
    })

    this.formGroupPassword = formBuilder.group({
      password: ["", Validators.required],
    })

    this.activatedRoute.params.subscribe(params => {
      this.userId = params[RouteUser.Param]
    })
  }

  private getUserDetail = async (): Promise<void> => {
    if (!this.userId) return

    let getUserDetailRequestDTO: GetUserDetailRequestDTO = {
      userId: parseInt(this.userId),
    }

    this.userControllerService.getUserDetail(getUserDetailRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.userDetail = response.result
          this.formGroupUser.setValue({
            username: this.userDetail?.username ?? "",
            fullName: this.userDetail?.fullName ?? "",
            email: this.userDetail?.email ?? "",
            role: this.userDetail?.role ?? "",
            dateOfBirth: this.userDetail?.dateOfBirth ?? "",
            phoneNumber: this.userDetail?.phoneNumber ?? "",
            level: this.userDetail?.level?.point ?? 0,
          })
        } else {
          this.showErrorDialog(response, () => this.redirectToUserManagePage().then())
        }
      })

  }

  async ngOnInit(): Promise<void> {
    await this.getUserDetail()
  }

  private redirectToUserManagePage = async (): Promise<void> => {
    await this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.User])
  }

  private updateInfoUser = async (): Promise<void> => {

    if (!this.formGroupUser.valid) {
      this.formGroupUser.markAllAsTouched()
      return
    }

    if (!this.userDetail?.id) return

    let updateInfoUserRequestDTO: UpdateInfoUserRequestDTO = {
      userId: this.userDetail.id,
      fullName: this.formGroupUser.value.fullName.trim(),
      genderId: this.formGroupUser.value.gender,
      dateOfBirth: moment(this.formGroupUser.value.dateOfBirth).format("DD/MM/YYYY")
    }

    this.userControllerService.updateInfoUser(updateInfoUserRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.showSuccessDialog()
        } else {
          this.showErrorDialog(response)
        }
    })
  }

  private updatePasswordUser = async (): Promise<void> => {

    if (!this.formGroupPassword.valid) {
      this.formGroupUser.markAllAsTouched()
      return
    }

    if (!this.userDetail?.id) return

    let updatePasswordUserRequestDTO: UpdatePasswordUserRequestDTO = {
      userId: this.userDetail.id,
      newPassword: this.formGroupUser.value.password.trim()
    }

    this.userControllerService.updatePasswordUser(updatePasswordUserRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.showSuccessDialog()
        } else {
          this.showErrorDialog(response)
        }
    })
  }

  private updateStatusUser = async (userStatus: number): Promise<void> => {

    if (!this.userDetail?.id) return

    let updateStatusUserRequestDTO: UpdateStatusUserRequestDTO = {
      userId: this.userDetail.id,
      userStatusId: userStatus
    }

    this.userControllerService.updateStatusUser(updateStatusUserRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.showSuccessDialog()
        } else {
          this.showErrorSnackBar(response.message)
        }
    })
  }

  private showSuccessDialog = (): void => {
    let errorDialogData: ErrorDialogData = {
      title: "Thành công",
      description: "Cập nhật dữ liệu thành công",
      buttonText: "OK",
      onAccept: () => {}
    }

    this.dialogService.showErrorDialog(errorDialogData)
  }

  private showErrorDialog = (response: ApiResponseObject, callBack: Function = () => {}): void => {
    let errorDialogData: ErrorDialogData = {
      title: response.errorCode ?? "",
      description: response.message ?? "",
      buttonText: "OK",
      onAccept: () => callBack()
    }

    this.dialogService.showErrorDialog(errorDialogData)
  }

  private showErrorSnackBar = (message?: string) => {
    let snackbarData: SnackbarData = {
      message: message ?? ""
    }

    this.dialogService.showSnackBar(snackbarData)
  }
}
