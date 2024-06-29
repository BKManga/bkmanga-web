import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreatePrivacyPolicyRequestDTO, PrivacyPolicyControllerService} from "../../../../../bkmanga-svc";
import {Router} from "@angular/router";
import {DialogService} from "../../../../../service/dialog.service";
import {StatusCodes} from "http-status-codes";
import {AppRouterAdmin} from "../../../../../constant/constants";
import {SnackbarData} from "../../../../../interface/snackbar-data";

@Component({
  selector: 'app-privacy-policy-add',
  templateUrl: './privacy-policy-add.component.html',
  styleUrls: ['./privacy-policy-add.component.scss']
})
export class PrivacyPolicyAddComponent {
  formGroup: FormGroup

  constructor(
    formBuilder: FormBuilder,
    private privacyPolicyControllerService: PrivacyPolicyControllerService,
    private router: Router,
    private dialogService: DialogService,
  ) {
    this.formGroup = formBuilder.group({
      question: ["" , Validators.required],
      answer: ["" , Validators.required],
    })
  }

  createPrivacyPolicy = async (): Promise<void> => {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched()
      return
    }

    let createPrivacyPolicyRequestDTO: CreatePrivacyPolicyRequestDTO = {
      question: this.formGroup.value.question.trim(),
      answer: this.formGroup.value.answer.trim(),
    }

    this.privacyPolicyControllerService.createPrivacyPolicy(createPrivacyPolicyRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.PrivacyPolicy])
        } else {
          let snackBarData: SnackbarData = {
            message: response.message ?? ""
          }

          this.dialogService.showSnackBar(snackBarData)
        }
      })

  }
}
