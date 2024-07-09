import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorReportDialogData} from "../../../interface/error-report-dialog-data";

@Component({
  selector: 'app-error-report-dialog',
  templateUrl: './error-report-dialog.component.html',
  styleUrls: ['./error-report-dialog.component.scss']
})
export class ErrorReportDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ErrorReportDialogData,
    private dialogRef: MatDialogRef<ErrorReportDialogComponent>
  ) {
  }

  confirmDialog = () => {
    this.dialogRef.close()
  }
}
