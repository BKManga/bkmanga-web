import { Injectable } from '@angular/core';
import {LoadingComponent} from "../component/shared/loading/loading.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorDialogComponent} from "../component/shared/error-dialog/error-dialog.component";
import {ErrorDialogData} from "../interface/error-dialog-data";
import {SnackbarData} from "../interface/snackbar-data";
import {SnackBarConfig} from "../constant/constants";
import {result} from "lodash";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private loadingAnimation: MatDialogRef<LoadingComponent> | undefined

  private matDialog: MatDialog

  private snackbar: MatSnackBar

  private readonly widthDialog: string = "30wh"

  constructor(
    matDialog: MatDialog,
    snackbar: MatSnackBar
  ) {
    this.matDialog = matDialog;
    this.snackbar = snackbar;
  }

  public showErrorDialog = (errorDialog: ErrorDialogData) => {
    this.matDialog.open(ErrorDialogComponent, {
      width: this.widthDialog,
      data: {
        title: `${errorDialog.title}`,
        description: `${errorDialog.description}`,
        buttonText: `${errorDialog.buttonText}`,
        onAccept: errorDialog.onAccept
      },
      disableClose: true
    }).afterClosed().subscribe(result => {
      errorDialog.onAccept
    })
  }

  public showLoadingData = () => {
    this.loadingAnimation = this.matDialog.open(LoadingComponent, {
      panelClass: "reset-class",
      disableClose: true
    })
  }

  public closeLoadingData = () => {
    this.loadingAnimation?.close()
  }

  public showSnackBar = (snackBarData: SnackbarData) => {
    this.snackbar.open(
      snackBarData.message,
      "",
      {
        duration: SnackBarConfig.duration,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: SnackBarConfig.panelClass,
      }
    )
  }
}
