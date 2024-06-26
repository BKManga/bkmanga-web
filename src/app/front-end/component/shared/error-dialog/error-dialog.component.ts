import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ErrorDialogData} from "../../../interface/error-dialog-data";

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {
  @Inject(MAT_DIALOG_DATA)
  public data: ErrorDialogData = {
    title: "ERROR",
    description: "DESCRIPTION",
    buttonText: "TEXT",
    onAccept: () => {}
  }
  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}
