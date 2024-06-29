import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Gender, GetImage, MiddlePrefixHandleImage, ProfilePage} from "../../../../constant/constants";
import {AuthControllerService, FileControllerService} from "../../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {environment} from "../../../../../../environments/environment.development";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  formGroup: FormGroup
  formGroupChangePassword: FormGroup

  protected readonly Gender = Gender
  protected readonly ProfilePage = ProfilePage
  selectedBox: string

  constructor(
    formBuilder: FormBuilder,
    private authControllerService: AuthControllerService,
  ) {
    this.formGroup = formBuilder.group({
      username: ["", Validators.required],
      email: [{value: "", disabled: true}, Validators.required],
      fullName: ["", Validators.required],
      gender: [Gender.MALE.at(0), Validators.required],
    })

    this.formGroupChangePassword = formBuilder.group({
      oldPassword: ["", Validators.required, Validators.minLength(10)],
      newPassword: ["", Validators.required, Validators.minLength(10)],
      confirmPassword: ["", Validators.required, Validators.minLength(10)],
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
            this.formGroup.setValue({
              username: authData.username,
              email: authData.email,
              fullName: authData.fullName,
              gender: authData.gender?.id,
            })
          }
        }
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getProfileData()
  }

  protected readonly MiddlePrefixHandleImage = MiddlePrefixHandleImage;
  protected readonly GetImage = GetImage;
  protected readonly environment = environment;
}
