import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OutLawReportDialogData} from "../../../interface/out-law-report-dialog-data";

@Component({
  selector: 'app-out-law-report-dialog',
  templateUrl: './out-law-report-dialog.component.html',
  styleUrls: ['./out-law-report-dialog.component.scss']
})
export class OutLawReportDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OutLawReportDialogData,
    private dialogRef: MatDialogRef<OutLawReportDialogComponent>
  ) {
  }

  confirmDialog = () => {
    this.dialogRef.close()
  }
}
