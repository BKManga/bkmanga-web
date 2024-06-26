import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Gender, ProfilePage} from "../../../../constant/constants";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  formGroup: FormGroup
  formGroupChangePassword: FormGroup

  protected readonly Gender = Gender
  protected readonly ProfilePage = ProfilePage
  selectedBox: string

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      username: ["Tin_Juan_Em_Nhe"],
      email: ["nghia.nn260701@gmail.com"],
      fullName: ["Trong Anh Nguoc"],
      gender: [Gender.MALE.at(0)],
    })

    this.formGroupChangePassword = formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    })

    this.selectedBox = ProfilePage.INFO
  }

  changeSelectedBoxInfo = (selected: string) => {
    this.selectedBox = selected
  }
}
