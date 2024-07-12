import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OutLawReportDialogData} from "../../../interface/out-law-report-dialog-data";
import {ErrorType, OutLawArea, OutLawType} from "../../../constant/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateOutLawReportRequestDTO, OutLawReportControllerService} from "../../../bkmanga-svc";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../interface/snackbar-data";
import {DialogService} from "../../../service/dialog.service";

@Component({
  selector: 'app-out-law-report-dialog',
  templateUrl: './out-law-report-dialog.component.html',
  styleUrls: ['./out-law-report-dialog.component.scss']
})
export class OutLawReportDialogComponent {

  formGroup: FormGroup
  protected readonly OutLawType = OutLawType

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OutLawReportDialogData,
    private dialogRef: MatDialogRef<OutLawReportDialogComponent>,
    formBuilder: FormBuilder,
    private outLawReportControllerService: OutLawReportControllerService,
    private dialogService: DialogService
  ) {
    this.formGroup = formBuilder.group({
      outLawType: [OutLawType.HATRED.at(0), Validators.required],
      description: ["", Validators.required],
    })
  }

  confirmDialog = () => {
    this.createOutLawReport().then(() => this.dialogRef.close())
  }

  private createOutLawReport = async (): Promise<void> => {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched()
      return
    }

    let createOutLawReportRequestDTO: CreateOutLawReportRequestDTO = {
      usernameReported: this.data.usernameReported,
      commentReportedId: this.data.commentReportedId,
      description: this.formGroup.value.description.trim(),
      outLawTypeId: this.formGroup.value.outLawType,
      outLawAreaId: this.data.outLawArea
    }

    this.outLawReportControllerService.createOutLawReport(createOutLawReportRequestDTO).subscribe(
      (response) => {
        if (response.responseCode !== StatusCodes.OK) {
          let snackBarData: SnackbarData = {
            message: response.message ?? ""
          }

          this.dialogService.showSnackBar(snackBarData)
        }
    })
  }
}
