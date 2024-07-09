import { Injectable } from '@angular/core';
import {LoadingComponent} from "../component/shared/loading/loading.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorDialogComponent} from "../component/shared/error-dialog/error-dialog.component";
import {ErrorDialogData} from "../interface/error-dialog-data";
import {SnackbarData} from "../interface/snackbar-data";
import {SnackBarConfig} from "../constant/constants";
import {result} from "lodash";
import {OutLawReportDialogComponent} from "../component/shared/out-law-report-dialog/out-law-report-dialog.component";
import {ErrorReportDialogComponent} from "../component/shared/error-report-dialog/error-report-dialog.component";
import {ErrorReportDialogData} from "../interface/error-report-dialog-data";
import {OutLawReportDialogData} from "../interface/out-law-report-dialog-data";
import {ConfirmDialogComponent} from "../component/shared/confirm-dialog/confirm-dialog.component";
import {ConfirmDialogData} from "../interface/confirm-dialog-data";

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

  public showErrorReportDialog = (
    errorReportDialogData: ErrorReportDialogData
  ) => {
    this.matDialog.open(ErrorReportDialogComponent, {
      data: errorReportDialogData,
      disableClose: true
    })
  }

  public showOutLawReportDialog = (
    outlawReportDialogData: OutLawReportDialogData
  ) => {
    this.matDialog.open(OutLawReportDialogComponent, {
      data: outlawReportDialogData,
      disableClose: true
    })
  }

  public showConfirmDialog = (confirmDialogData: ConfirmDialogData) => {
    this.matDialog.open(ConfirmDialogComponent, {
      data: confirmDialogData,
      disableClose: true
    })
  }
}
