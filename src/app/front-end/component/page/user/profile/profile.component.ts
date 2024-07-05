import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthToken, Gender, GetImage, MiddlePrefixHandleImage, ProfilePage} from "../../../../constant/constants";
import {
  AuthControllerService,
  FileControllerService,
  UpdateAuthPasswordRequestDTO,
  UpdateInfoProfileRequestDTO
} from "../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {environment} from "../../../../../../environments/environment.development";
import {DialogService} from "../../../../service/dialog.service";
import {ErrorDialogData} from "../../../../interface/error-dialog-data";
import {JwtDecodeService} from "../../../../service/jwt-decode.service";
import {CookieService} from "ngx-cookie-service";
import {SnackbarData} from "../../../../interface/snackbar-data";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formGroup: FormGroup
  formGroupChangePassword: FormGroup
  uploadImage?: Blob

  protected readonly Gender = Gender
  protected readonly ProfilePage = ProfilePage
  selectedBox: string

  urlImageProfile?: string | any
  username?: string

  constructor(
    formBuilder: FormBuilder,
    private authControllerService: AuthControllerService,
    private dialogService: DialogService,
    private jwtDecodeService: JwtDecodeService,
    private cookieService: CookieService,
    private fileControllerService: FileControllerService
  ) {
    this.formGroup = formBuilder.group({
      username: [{value: "", disabled: true}, Validators.required],
      email: [{value: "", disabled: true}, Validators.required],
      fullName: ["", Validators.required],
      gender: [Gender.MALE.at(0), Validators.required],
    })

    this.formGroupChangePassword = formBuilder.group({
      oldPassword: ["", [Validators.required, Validators.minLength(10)]],
      newPassword: ["", [Validators.required, Validators.minLength(10)]],
    })

    this.selectedBox = ProfilePage.INFO
  }

  changeSelectedBoxInfo = (selected: string) => {
    this.selectedBox = selected
  }

  private getProfileData = async () : Promise<void> => {
    this.authControllerService.getAuthInfo().subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          let authData = response.result
          if (authData) {
            this.username = authData.username

            this.formGroup.setValue({
              username: this.username,
              email: authData.email,
              fullName: authData.fullName,
              gender: authData.gender?.id,
            })

            this.urlImageProfile = environment.apiBaseUrl +
              MiddlePrefixHandleImage.Prefix +
              GetImage.USER_PROFILE_LOGO +
              this.username
          }
        } else {
          this.showDialog(
            response.errorCode ?? "",
            response.message ?? "",
          )
        }
    })
  }

  updateAuthInfo = async (): Promise<void> => {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched()
      return
    }

    let updateInfoProfileRequestDTO: UpdateInfoProfileRequestDTO = {
      fullName: this.formGroup.value.fullName.trim(),
      genderId: this.formGroup.value.gender
    }

    this.authControllerService.updateAuthInfo(updateInfoProfileRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.showDialog(
            "OK",
            "Sửa thông tin người dùng thành công"
          )
        } else {
          this.showDialog(
            response.errorCode ?? "",
            response.message ?? "",
          )
        }
    })

    if (this.uploadImage && this.username) {
      this.fileControllerService.uploadProfile(
        this.username,
        this.uploadImage,
      ).subscribe(
        (response) => {
          if (response.responseCode !== StatusCodes.OK) {
            console.log(response.message)
            let snackbarData: SnackbarData = {
              message: "Có lỗi khi upload ảnh"
            }

            this.dialogService.showSnackBar(snackbarData)
          }
      })
    }
  }

  updateAuthPassword = async (): Promise<void> => {
    if (!this.formGroupChangePassword.valid) {
      this.formGroupChangePassword.markAllAsTouched()
      return
    }

    let updateAuthPasswordRequestDTO: UpdateAuthPasswordRequestDTO = {
      oldPassword: this.formGroupChangePassword.value.oldPassword.trim(),
      newPassword: this.formGroupChangePassword.value.newPassword.trim()
    }

    this.authControllerService.updateAuthPassword(updateAuthPasswordRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {

          if (response.result?.newToken) {
            this.cookieService.set(AuthToken, response.result.newToken)

            this.showDialog(
              "OK",
              "Cập nhật mật khẩu thành công"
            )

            this.formGroupChangePassword.reset()
          }
        } else {
          this.showDialog(
            response.errorCode ?? "",
            response.message ?? "",
          )
        }
      })
  }

  async ngOnInit(): Promise<void> {
    await this.getProfileData()
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

  logoutUser = () => {
    this.jwtDecodeService.deleteAuthToken()
    window.location.reload()
  }

  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage;
  protected readonly GetImage = GetImage;
  protected readonly environment = environment;

  onChangeImage(event: any) {
    const files = event.target.files
    if (files.length === 0) return

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.showDialog(
        "Error",
        "Chỉ upload định dạng ảnh là png"
      )

      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = (_event) => {
      this.urlImageProfile = reader.result ?? ""
      this.uploadImage = new Blob([files[0]], { type: mimeType })
    }
  }
}
