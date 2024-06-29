import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  GetPrivacyPolicyDetailRequestDTO,
  PrivacyPolicyControllerService,
  UpdatePrivacyPolicyRequestDTO
} from "../../../../../bkmanga-svc";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRouterAdmin, RoutePrivacyPolicy} from "../../../../../constant/constants";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../../../interface/snackbar-data";
import {DialogService} from "../../../../../service/dialog.service";

@Component({
  selector: 'app-privacy-policy-detail',
  templateUrl: './privacy-policy-detail.component.html',
  styleUrls: ['./privacy-policy-detail.component.scss']
})
export class PrivacyPolicyDetailComponent implements OnInit{
  formGroup: FormGroup
  privacyPolicyId?: string

  constructor(
    formBuilder: FormBuilder,
    private privacyPolicyControllerService: PrivacyPolicyControllerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
  ) {
    this.formGroup = formBuilder.group({
      question: ["" , Validators.required],
      answer: ["" , Validators.required],
    })

    this.activatedRoute.params.subscribe(params => {
      this.privacyPolicyId = params[RoutePrivacyPolicy.Param]
    })
  }

  private getPrivacyPolicyData = async (): Promise<void> => {
    if (!this.privacyPolicyId) return

    let getPrivacyPolicyDetailRequestDTO: GetPrivacyPolicyDetailRequestDTO = {
      privacyPolicyId: parseInt(this.privacyPolicyId)
    }

    this.privacyPolicyControllerService.getPrivacyPolicy(getPrivacyPolicyDetailRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.formGroup.setValue({
            question: response.result?.question ?? "",
            answer: response.result?.answer ?? "",
          })
        }
    })
  }

  updatePrivacyPolicy = async (): Promise<void> => {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched()
      return
    }

    if (!this.privacyPolicyId) return

    let updatePrivacyPolicyRequestDTO: UpdatePrivacyPolicyRequestDTO = {
      id: parseInt(this.privacyPolicyId),
      question: this.formGroup.value.question.trim(),
      answer: this.formGroup.value.answer.trim(),
    }

    this.privacyPolicyControllerService.updatePrivacyPolicy(updatePrivacyPolicyRequestDTO).subscribe(
      (response) => {
        if (response.responseCode === StatusCodes.OK) {
          this.router.navigate([AppRouterAdmin.Admin, AppRouterAdmin.PrivacyPolicy]).then()
        } else {
          let snackBarData: SnackbarData = {
            message: response.message ?? ""
          }

          this.dialogService.showSnackBar(snackBarData)
        }
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getPrivacyPolicyData()
  }
}
