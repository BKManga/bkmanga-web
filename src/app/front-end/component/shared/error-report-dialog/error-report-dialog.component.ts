import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorReportDialogData} from "../../../interface/error-report-dialog-data";
import {ErrorType, Gender} from "../../../constant/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateErrorChapterReportRequestDTO, ErrorChapterReportControllerService} from "../../../bkmanga-svc";
import {DialogService} from "../../../service/dialog.service";
import {StatusCodes} from "http-status-codes";
import {SnackbarData} from "../../../interface/snackbar-data";

@Component({
  selector: 'app-error-report-dialog',
  templateUrl: './error-report-dialog.component.html',
  styleUrls: ['./error-report-dialog.component.scss']
})
export class ErrorReportDialogComponent {

  formGroup: FormGroup

  protected readonly ErrorType = ErrorType

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ErrorReportDialogData,
    private dialogRef: MatDialogRef<ErrorReportDialogComponent>,
    formBuilder: FormBuilder,
    private errorChapterReportControllerService: ErrorChapterReportControllerService,
    private dialogService: DialogService,
  ) {
    this.formGroup = formBuilder.group({
      errorType: [ErrorType.TRANSLATION.at(0), Validators.required],
      description: ["", Validators.required],
    })
  }

  confirmDialog = () => {
    this.createErrorChapterReport().then(() => this.dialogRef.close())
  }

  private createErrorChapterReport = async (): Promise<void> => {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched()
      return
    }

    let createErrorChapterReportRequestDTO: CreateErrorChapterReportRequestDTO = {
      mangaId: this.data.mangaId,
      chapterId: this.data.chapterId,
      description: this.formGroup.value.description.trim(),
      errorTypeId: this.formGroup.value.errorType
    }
    this.errorChapterReportControllerService.createChapterReport(createErrorChapterReportRequestDTO).subscribe(
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
